import React, { useEffect, useState, useRef } from 'react';

// 8-bit Pixel Art Matrix Rabbit Easter Egg
// Seamless 1-timeline synchronization:
// 0s -> 2.15s: 5 full hops ending with exact landing at 50vw center
// 2.15s -> 2.45s: 3/4 turn transition (diagonal)
// 2.45s -> 4.25s: Full front idle with twitching ears
// 4.25s -> 4.45s: Turn back to side
// 4.45s -> 6.5s: 5 hops exiting through the right

type RabbitPose = 'hopping-in' | 'turn-front' | 'front-idle' | 'turn-side' | 'hopping-out' | 'done';

interface MatrixRabbitProps {
  active: boolean;
  onDone?: () => void;
}

export const MatrixRabbit: React.FC<MatrixRabbitProps> = ({ active, onDone }) => {
  const [pose, setPose] = useState<RabbitPose | null>(null);
  const [hopFrame, setHopFrame] = useState<'squash' | 'jump' | 'land'>('jump');
  const [earWiggle, setEarWiggle] = useState(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (active && !isRunningRef.current) {
      isRunningRef.current = true;
      startSequence();
    }
  }, [active]);

  const startSequence = () => {
    setPose('hopping-in');

    // Sync sprite frame precisely with 0.4s hop cycle (133ms per frame)
    const frameInterval = setInterval(() => {
      setHopFrame((prev) => (prev === 'jump' ? 'land' : prev === 'land' ? 'squash' : 'jump'));
    }, 133);

    // 1. Exactly at 2.15s (5th landing at center): turn front transition
    setTimeout(() => {
      clearInterval(frameInterval);
      setPose('turn-front');
    }, 2150);

    // 2. Front Idle starts
    setTimeout(() => {
      setPose('front-idle');
    }, 2450);

    // Ear twitches in center
    setTimeout(() => setEarWiggle(1), 2800);
    setTimeout(() => setEarWiggle(2), 3100);
    setTimeout(() => setEarWiggle(0), 3400);
    setTimeout(() => setEarWiggle(1), 3800);
    setTimeout(() => setEarWiggle(0), 4100);

    // 3. Turn back to side
    setTimeout(() => {
      setPose('turn-side');
    }, 4250);

    // 4. Start hopping out to the right
    setTimeout(() => {
      setPose('hopping-out');
      setInterval(() => {
        setHopFrame((prev) => (prev === 'jump' ? 'land' : prev === 'land' ? 'squash' : 'jump'));
      }, 133);
    }, 4450);

    // 5. Complete
    setTimeout(() => {
      setPose('done');
      isRunningRef.current = false;
      if (onDone) onDone();
    }, 6500);
  };

  if (!active || pose === 'done' || !pose) return null;

  const isHopping = pose === 'hopping-in' || pose === 'hopping-out';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1 unified continuous trajectory */}
      <div className="absolute bottom-2 md:bottom-3 rabbit-hop-sequence">
        {/* Parabolic bounce in Y only during hopping phases */}
        <div className={isHopping ? 'rabbit-parabolic-jump' : ''}>
          {/* Sprite box with smooth transition */}
          <div className="relative w-11 h-11 md:w-13 md:h-13 filter drop-shadow-[0_0_8px_rgba(20,241,180,0.5)] transition-transform duration-150">
            {pose === 'front-idle' ? (
              <FrontRabbitSVG earStage={earWiggle} />
            ) : pose === 'turn-front' ? (
              <ThreeQuarterRabbitSVG />
            ) : pose === 'turn-side' ? (
              <ThreeQuarterRabbitSVG />
            ) : (
              <SideRabbit8Bit frame={hopFrame} />
            )}
          </div>
        </div>

        {/* Floor Shadow */}
        {isHopping && (
          <div className="w-7 h-1 mx-auto bg-black/40 rounded-full blur-[1px] rabbit-shadow-pulse" />
        )}
      </div>
    </div>
  );
};

// 3/4 Diagonal intermediate turn frame (eases the snap from profile to front)
const ThreeQuarterRabbitSVG: React.FC = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
    <rect x="5" y="7" width="7" height="6" fill="#14F1B4" />
    <rect x="4" y="8" width="8" height="5" fill="#14F1B4" />
    <rect x="7" y="4" width="6" height="5" fill="#14F1B4" />
    {/* Ears at 45 deg */}
    <rect x="5" y="1" width="2" height="5" fill="#14F1B4" />
    <rect x="9" y="1" width="2" height="4" fill="#14F1B4" />
    <rect x="6" y="2" width="1" height="3" fill="#0D9488" />
    {/* Eye */}
    <rect x="10" y="6" width="1.5" height="1.5" fill="#000" />
    <rect x="12" y="7" width="1" height="1" fill="#E6FFFA" />
    {/* Paws */}
    <rect x="5" y="13" width="3" height="2" fill="#0D9488" />
    <rect x="9" y="13" width="3" height="2" fill="#14F1B4" />
  </svg>
);

// 3-Frame 8-bit Pixel Art Sprite Cycle (Squash -> Air/Stretch -> Land)
const SideRabbit8Bit: React.FC<{ frame: 'squash' | 'jump' | 'land' }> = ({ frame }) => {
  if (frame === 'squash') {
    return (
      <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
        <rect x="4" y="9" width="8" height="5" fill="#14F1B4" />
        <rect x="5" y="10" width="7" height="4" fill="#0D9488" />
        <rect x="9" y="7" width="5" height="4" fill="#14F1B4" />
        <rect x="4" y="5" width="6" height="2" fill="#14F1B4" />
        <rect x="5" y="6" width="4" height="1" fill="#0D9488" />
        <rect x="12" y="8" width="1" height="1" fill="#000" />
        <rect x="14" y="9" width="1" height="1" fill="#E6FFFA" />
        <rect x="2" y="11" width="2" height="2" fill="#E6FFFA" />
        <rect x="4" y="14" width="9" height="1" fill="#0D9488" />
      </svg>
    );
  }

  if (frame === 'jump') {
    return (
      <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
        <rect x="5" y="6" width="7" height="5" fill="#14F1B4" />
        <rect x="4" y="7" width="8" height="4" fill="#14F1B4" />
        <rect x="10" y="4" width="4" height="4" fill="#14F1B4" />
        <rect x="7" y="0" width="2" height="5" fill="#14F1B4" />
        <rect x="8" y="0" width="2" height="4" fill="#14F1B4" />
        <rect x="8" y="1" width="1" height="3" fill="#0D9488" />
        <rect x="12" y="5" width="1" height="1" fill="#000" />
        <rect x="14" y="6" width="1" height="1" fill="#E6FFFA" />
        <rect x="3" y="8" width="2" height="2" fill="#E6FFFA" />
        <rect x="3" y="11" width="3" height="2" fill="#0D9488" />
        <rect x="11" y="10" width="2" height="3" fill="#14F1B4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
      <rect x="4" y="7" width="8" height="6" fill="#14F1B4" />
      <rect x="5" y="8" width="7" height="4" fill="#14F1B4" />
      <rect x="9" y="5" width="5" height="4" fill="#14F1B4" />
      <rect x="7" y="1" width="2" height="5" fill="#14F1B4" />
      <rect x="8" y="1" width="1" height="4" fill="#0D9488" />
      <rect x="12" y="6" width="1" height="1" fill="#000" />
      <rect x="14" y="7" width="1" height="1" fill="#E6FFFA" />
      <rect x="2" y="9" width="2" height="2" fill="#E6FFFA" />
      <rect x="5" y="13" width="3" height="2" fill="#0D9488" />
      <rect x="10" y="13" width="3" height="2" fill="#14F1B4" />
    </svg>
  );
};

// Front idle sprite with ear movements
const FrontRabbitSVG: React.FC<{ earStage: number }> = ({ earStage }) => (
  <svg viewBox="0 0 16 16" className="w-full h-full" shapeRendering="crispEdges">
    <rect x="5" y="7" width="6" height="7" fill="#14F1B4" />
    <rect x="4" y="8" width="8" height="5" fill="#14F1B4" />
    <rect x="6" y="8" width="4" height="4" fill="#E6FFFA" />
    <rect x="5" y="4" width="6" height="5" fill="#14F1B4" />
    <rect x="4" y="5" width="8" height="3" fill="#14F1B4" />
    <rect x="4" y={earStage === 1 ? 1 : 0} width="2" height="4" fill="#14F1B4" />
    <rect x="4" y={earStage === 1 ? 2 : 1} width="1" height="2" fill="#0D9488" />
    <rect x="10" y={earStage === 2 ? 1 : 0} width="2" height="4" fill="#14F1B4" />
    <rect x="11" y={earStage === 2 ? 2 : 1} width="1" height="2" fill="#0D9488" />
    <rect x="5" y="5" width="1.5" height="1.5" fill="#000" />
    <rect x="9.5" y="5" width="1.5" height="1.5" fill="#000" />
    <rect x="7.5" y="7" width="1" height="1" fill="#E6FFFA" />
    <rect x="7" y="8" width="2" height="0.8" fill="#0D9488" />
    <rect x="4" y="14" width="3" height="1" fill="#0D9488" />
    <rect x="9" y="14" width="3" height="1" fill="#0D9488" />
  </svg>
);

export default MatrixRabbit;
