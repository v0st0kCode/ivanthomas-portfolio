
import React, { useState, useEffect, useRef } from 'react';

interface NumberScramblerProps {
  finalValue: string;
  duration?: number;
  className?: string;
}

const NumberScrambler: React.FC<NumberScramblerProps> = ({ 
  finalValue, 
  duration = 2000, 
  className = ""
}) => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Generate a random digit
  const getRandomDigit = () => Math.floor(Math.random() * 10).toString();

  // Generate random numbers for each position
  const getRandomValue = (final: string) => {
    return Array.from(final).map(char => {
      return isNaN(parseInt(char)) ? char : getRandomDigit();
    }).join('');
  };

  // Animation function with smoother transitions
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // Create a smoother, flowing animation pattern
    // More frequent changes at the beginning, gradually slowing down
    const changeFrequency = Math.cos(progress * Math.PI) * 0.5 + 0.5; // Creates a smooth curve from 1 to 0
    const shouldUpdate = Math.random() < changeFrequency;
    
    if (shouldUpdate || displayValue.length !== finalValue.length) {
      // Generate a flowing random pattern
      let newValue = "";
      
      // Create a flowing effect where digits stabilize from left to right
      for (let i = 0; i < finalValue.length; i++) {
        const char = finalValue[i];
        const stabilizeThreshold = Math.min(1, progress * 1.5); // Adjust multiplier for speed of stabilization
        const positionProgress = i / finalValue.length; // Position weight (0 to 1)
        
        // Earlier positions stabilize faster than later positions
        const shouldStabilize = Math.random() < (stabilizeThreshold - positionProgress * 0.5);
        
        if (shouldStabilize || !isNaN(parseInt(char))) {
          newValue += char;
        } else {
          newValue += isNaN(parseInt(char)) ? char : getRandomDigit();
        }
      }
      
      setDisplayValue(newValue);
    }

    // Final state
    if (progress >= 1) {
      setDisplayValue(finalValue);
      return;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Reset the animation when finalValue changes
    startTimeRef.current = 0;
    
    // Start animation after a small delay
    timerRef.current = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [finalValue, duration]);

  return (
    <span className={`number-scrambler font-display ${className}`}>
      {displayValue || getRandomValue(finalValue)}
    </span>
  );
};

export default NumberScrambler;
