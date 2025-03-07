
import React, { useRef, useState, useEffect } from 'react';
import { useParticleSystem } from './particles/useParticleSystem';
import { useCelebrationEffect } from './particles/useCelebrationEffect';
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    mouseX: number;
    mouseY: number;
    triggerParticleCelebration?: () => void;
  }
}

interface ParticleHeaderProps {
  className?: string;
}

const ParticleHeader: React.FC<ParticleHeaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imantedCount, setImantedCount] = useState(0);
  const [isNewImant, setIsNewImant] = useState(false);
  const [counterPosition, setCounterPosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isHoveringContent, setIsHoveringContent] = useState(false);
  const totalParticles = 80;
  const { toast } = useToast();
  
  // Handle new imant effect timeout
  useEffect(() => {
    if (isNewImant) {
      const timer = setTimeout(() => {
        setIsNewImant(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNewImant]);

  // Handle celebration effect
  const {
    showWinMessage,
    gameActive,
    fadeOutCollected,
    gridOpacityLevel,
    triggerCelebration
  } = useCelebrationEffect({ 
    containerRef,
    onComplete: () => {
      setImantedCount(0);
      setIsNewImant(false);
    }
  });

  // Handle particle system
  useParticleSystem({
    containerRef,
    totalParticles,
    gameActive,
    gridOpacityLevel,
    fadeOutCollected,
    isHoveringContent,
    onImantCountChange: (count, isNew) => {
      setImantedCount(count);
      setIsNewImant(isNew);
    },
    onCounterPositionChange: setCounterPosition,
    onMouseInsideChange: setIsMouseInside,
    triggerCelebration
  });

  // Handle mouse interactions
  const handleMouseEnterContent = () => setIsHoveringContent(true);
  const handleMouseLeaveContent = () => setIsHoveringContent(false);

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`w-full h-[95vh] relative ${className || ''}`}
        style={{ touchAction: 'none' }}
      />
      
      {showWinMessage && (
        <div className="absolute left-1/2 top-[1em] transform -translate-x-1/2 px-6 py-4 bg-black/80 text-white rounded-lg text-xl font-medium z-50 text-center whitespace-nowrap animate-win-message">
          Congratulations! You collected all dots too!
        </div>
      )}
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" 
        style={{ zIndex: 10 }} 
      />
      
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-64 h-32"
        onMouseEnter={handleMouseEnterContent}
        onMouseLeave={handleMouseLeaveContent}
      />
      
      {gameActive && (
        <div 
          className={`fixed px-3 py-1 bg-black/70 text-white rounded-full text-sm font-mono z-20 pointer-events-none transition-opacity duration-1000 ease-out ${fadeOutCollected ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            left: `calc(${typeof window !== 'undefined' ? (counterPosition.x || window.mouseX || window.innerWidth / 2) : '50%'}px + 1em)`,
            top: `calc(${typeof window !== 'undefined' ? (counterPosition.y || window.mouseY || window.innerHeight / 2) : '50%'}px + 1em)`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out, opacity 1s ease-out'
          }}
        >
          {imantedCount}/{totalParticles}
        </div>
      )}
    </div>
  );
};

export default ParticleHeader;
