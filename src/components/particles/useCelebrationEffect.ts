
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface UseCelebrationEffectProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onComplete: () => void;
}

export const useCelebrationEffect = ({ containerRef, onComplete }: UseCelebrationEffectProps) => {
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [fadeOutCollected, setFadeOutCollected] = useState(false);
  const [gridOpacityLevel, setGridOpacityLevel] = useState(1);

  const triggerCelebration = () => {
    console.log("Triggering celebration");
    setShowWinMessage(true);
    setGameActive(true);
    setFadeOutCollected(true);
    setGridOpacityLevel(0.05); // Reduce grid opacity during celebration but keep visible
    
    fireworksEffect();
    setTimeout(() => fireworksEffect(), 800);
    setTimeout(() => fireworksEffect(), 1600);
    setTimeout(() => fireworksEffect(), 2400);
    
    setTimeout(() => {
      setGridOpacityLevel(1); // Restore full opacity after effect
    }, 2000);
    
    setTimeout(() => {
      setGameActive(false);
      setTimeout(() => {
        setShowWinMessage(false);
        setFadeOutCollected(false);
        onComplete(); // Call the completion callback
      }, 1000);
    }, 4000);
  };

  const fireworksEffect = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = rect.width / 2 / rect.width;
      const y = rect.height / 2 / rect.height;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#9b87f5', '#D946EF', '#F97316', '#0EA5E9', '#8B5CF6']
      });
    }
  };

  // Register global celebration trigger
  useEffect(() => {
    window.triggerParticleCelebration = triggerCelebration;
    return () => {
      delete window.triggerParticleCelebration;
    };
  }, []);

  return {
    showWinMessage,
    gameActive,
    fadeOutCollected,
    gridOpacityLevel,
    triggerCelebration
  };
};
