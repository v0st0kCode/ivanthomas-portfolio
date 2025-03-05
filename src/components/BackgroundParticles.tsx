
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import ParticleSystem from './particles/ParticleSystem';

const BackgroundParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Increased number of particles for better visibility
    const particleSystem = new ParticleSystem(150);

    const sketch = (p: p5) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        particleSystem.initialize(p);
      };
      
      p.draw = () => {
        p.clear();  // Clear the canvas each frame to avoid overdraw
        particleSystem.update(p);
      };
      
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        particleSystem.resize(p);
      };
      
      p.mouseMoved = () => {
        particleSystem.updateMousePosition(p.mouseX, p.mouseY);
      };
      
      p.touchMoved = () => {
        if (p.touches.length > 0 && p.touches[0]) {
          const touch = p.touches[0] as unknown as { x: number, y: number };
          particleSystem.updateMousePosition(touch.x || p.windowWidth / 2, touch.y || p.windowHeight / 2);
        }
        return false; // Prevent default
      };
    };

    sketchRef.current = new p5(sketch);

    return () => {
      sketchRef.current?.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full -z-10"
      style={{ touchAction: 'none' }}
    />
  );
};

export default BackgroundParticles;
