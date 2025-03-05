
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import HeaderParticleSystem from './header-particles/HeaderParticleSystem';

interface ParticleHeaderProps {
  className?: string;
}

const ParticleHeader: React.FC<ParticleHeaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();

  useEffect(() => {
    if (!containerRef.current) return;

    const particleSystem = new HeaderParticleSystem(80);

    const sketch = (p: p5) => {
      p.setup = () => {
        // Increase the canvas height to reach the Recent Projects section
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.95);
        canvas.parent(containerRef.current!);
        particleSystem.initialize(p);
      };
      
      p.draw = () => {
        particleSystem.update(p);
      };
      
      p.windowResized = () => {
        // Update canvas size when window is resized
        p.resizeCanvas(p.windowWidth, p.windowHeight * 0.95);
        particleSystem.resize(p);
      };
      
      p.mouseMoved = () => {
        particleSystem.updateMousePosition(p.mouseX, p.mouseY);
      };
      
      p.touchMoved = () => {
        // Fix: Properly access touch coordinates with type checking
        if (p.touches.length > 0 && p.touches[0]) {
          // Access touch coordinates safely with explicit type casting
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
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`w-full h-[95vh] relative ${className || ''}`}
        style={{ touchAction: 'none' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" 
           style={{ zIndex: 10 }} />
    </div>
  );
};

export default ParticleHeader;
