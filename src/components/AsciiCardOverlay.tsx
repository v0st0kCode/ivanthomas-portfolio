import React, { useRef, useState, useEffect, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Mesh, CanvasTexture, MathUtils, SRGBColorSpace } from 'three';
import { AsciiEffect } from './ascii-effect';

// ASCII video background for project cards (Ivan, 21 ago 2026 — RFEF test).
// The VIDEO is the texture — no static image, no crossfade.
// - At rest: video paused (frozen frame wherever the loop stopped) in ASCII
// - On hover: video plays (muted, looped) — the ASCII animates
// - Tilt 3D toward the cursor, eased, shared via mouseRef from ProjectCard.
// Opt-in per project via `cardAscii` + `cardAsciiVideo` in projects.ts.
//
// TEXTURE STRATEGY: VideoTexture was diagnosed broken in Chrome + three 0.185
// (video element plays fine, texture uploads no frames). Instead, a 2D canvas
// bridges: drawImage(video) every frame → CanvasTexture. Production-safe and
// version-proof.
//
// The <video> element lives in the DOM (Chrome only decodes attached
// elements), hidden at 2px — decoding works there (verified), only the
// VideoTexture path was broken.

interface MouseRef {
  x: number; // -0.5..0.5, normalized within the card
  y: number;
}

interface AsciiVideoMeshProps {
  videoEl: HTMLVideoElement;
  mouseRef: MutableRefObject<MouseRef>;
  hoveredRef: MutableRefObject<boolean>;
}

function AsciiVideoMesh({ videoEl, mouseRef, hoveredRef }: AsciiVideoMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const { viewport, size } = useThree();
  const [texture, setTexture] = useState<CanvasTexture | null>(null);
  const eased = useRef({ x: 0, y: 0 });

  // Build the bridge canvas + CanvasTexture once the video reports dimensions
  useEffect(() => {
    let disposed = false;
    let tex: CanvasTexture | null = null;

    const onReady = () => {
      if (disposed || !videoEl.videoWidth) return; // ignore 0x0 ready events
      const c = document.createElement('canvas');
      c.width = videoEl.videoWidth;
      c.height = videoEl.videoHeight;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(videoEl, 0, 0); // first frame
      // Paused videos often sit on a black first frame — nudge to ~1s in so
      // the frozen frame actually has content
      videoEl.currentTime = Math.min(1, videoEl.duration || 1);
      tex = new CanvasTexture(c);
      tex.colorSpace = SRGBColorSpace;
      setTexture(tex);
    };

    if (videoEl.readyState >= 2) {
      onReady();
    } else {
      videoEl.addEventListener('loadeddata', onReady, { once: true });
      videoEl.addEventListener('canplay', onReady, { once: true });
      videoEl.load();
    }

    return () => {
      disposed = true;
      videoEl.removeEventListener('loadeddata', onReady);
      videoEl.removeEventListener('canplay', onReady);
      tex?.dispose();
    };
  }, [videoEl]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !texture) return;

    // Play/pause with hover — ref-driven, no React re-render
    if (hoveredRef.current && videoEl.paused) {
      videoEl.play().catch(() => {});
    } else if (!hoveredRef.current && !videoEl.paused) {
      videoEl.pause();
    }

    // Pump the current video frame into the bridge canvas
    const c = texture.image as HTMLCanvasElement;
    const ctx = c.getContext('2d')!;
    ctx.drawImage(videoEl, 0, 0);
    texture.needsUpdate = true;

    // Cover-fit: scale the plane so the video fills the viewport
    const imgAspect = c.width / c.height;
    const viewAspect = size.width / size.height;
    let w = viewport.width;
    let h = viewport.height;
    if (viewAspect > imgAspect) {
      h = w / imgAspect;
    } else {
      w = h * imgAspect;
    }
    mesh.scale.set(w, h, 1);

    // 3D parallax: tilt toward the cursor, frame-rate independent damping
    const target = { y: mouseRef.current.x * 0.35, x: -mouseRef.current.y * 0.25 };
    const t = 1 - Math.exp(-6 * delta);
    eased.current.x = MathUtils.lerp(eased.current.x, target.x, t);
    eased.current.y = MathUtils.lerp(eased.current.y, target.y, t);
    mesh.rotation.x = eased.current.x;
    mesh.rotation.y = eased.current.y;
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[1.15, 1.15, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

interface AsciiCardOverlayProps {
  video: string;
  mouseRef: MutableRefObject<MouseRef>;
  // Shared hover flag (ref, not state — no React re-render on hover changes)
  hoveredRef: MutableRefObject<boolean>;
}

const AsciiCardOverlay: React.FC<AsciiCardOverlayProps> = ({ video, mouseRef, hoveredRef }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [el, setEl] = useState<HTMLVideoElement | null>(null);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
      {/* Source <video> — must be attached to the DOM for Chrome to decode it.
          2px, ~invisible, but NOT display:none (that also blocks decoding). */}
      <video
        ref={(node) => {
          videoRef.current = node;
          setEl(node);
        }}
        src={video}
        muted
        loop
        playsInline
        preload="auto"
        style={{ position: 'absolute', width: '2px', height: '2px', opacity: 0.01, top: 0, left: 0 }}
      />
      {el && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: 'low-power' }}
          style={{ background: '#000' }}
        >
          <AsciiVideoMesh videoEl={el} mouseRef={mouseRef} hoveredRef={hoveredRef} />
          <EffectComposer>
            <AsciiEffect
              style="standard"
              cellSize={12}
              invert={false}
              color={true}
              postfx={{
                // defaults from the Efecto export — untouched
                scanlineIntensity: 0,
                scanlineCount: 200,
                targetFPS: 0,
                jitterIntensity: 0,
                jitterSpeed: 1,
                mouseGlowEnabled: false,
                mouseGlowRadius: 200,
                mouseGlowIntensity: 1.5,
                vignetteIntensity: 0,
                vignetteRadius: 0.8,
                colorPalette: 0,
                curvature: 0,
                aberrationStrength: 0,
                noiseIntensity: 0,
                noiseScale: 1,
                noiseSpeed: 1,
                waveAmplitude: 0,
                waveFrequency: 10,
                waveSpeed: 1,
                glitchIntensity: 0,
                glitchFrequency: 0,
                brightnessAdjust: 0,
                contrastAdjust: 1,
              }}
            />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
};

export default AsciiCardOverlay;
