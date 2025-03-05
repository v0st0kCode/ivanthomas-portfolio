
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
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
  const animate = () => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // Generate a flowing random pattern
    let newValue = "";
    
    // Create a flowing effect where digits stabilize from left to right
    for (let i = 0; i < finalValue.length; i++) {
      const char = finalValue[i];
      const stabilizeThreshold = Math.min(1, progress * 1.5); // Adjust for stabilization speed
      const positionProgress = i / finalValue.length; // Position weight (0 to 1)
      
      // Earlier positions stabilize faster than later positions
      const shouldStabilize = progress > 0.8 || 
                             (Math.random() < (stabilizeThreshold - positionProgress * 0.5));
      
      if (shouldStabilize && progress > 0.5) {
        newValue += char;
      } else {
        newValue += isNaN(parseInt(char)) ? char : getRandomDigit();
      }
    }
    
    setDisplayValue(newValue);

    // Final state - ensure we show the final value
    if (progress >= 1) {
      setDisplayValue(finalValue);
      clearInterval(intervalRef.current!);
      return;
    }
  };

  useEffect(() => {
    // Initialize with random value
    setDisplayValue(getRandomValue(finalValue));
    
    // Reset the animation when finalValue changes
    if (startTimeRef.current) {
      startTimeRef.current = null;
    }
    
    // Clear any existing timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start animation after a small delay
    timerRef.current = setTimeout(() => {
      // Run the animation at 30fps (approximately)
      intervalRef.current = setInterval(animate, 33);
    }, 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
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
