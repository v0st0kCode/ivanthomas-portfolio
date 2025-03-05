
import React, { useState, useEffect, useRef } from 'react';

interface NumberScramblerProps {
  finalValue: string;
  duration?: number; // Duration in milliseconds
  className?: string;
}

const NumberScrambler: React.FC<NumberScramblerProps> = ({ 
  finalValue, 
  duration = 3500, // Increased from 2000 to 3500 for a slower animation
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

  // Animation function
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // More frequent changes at the beginning, slowing down towards the end
    // Reduced frequency rate for a more gradual animation
    const shouldUpdate = Math.random() < (1 - progress) * 0.6; // Reduced from 0.8 to 0.6
    
    if (shouldUpdate || displayValue.length !== finalValue.length) {
      // Generate a new random value
      let newValue = getRandomValue(finalValue);
      
      // As we get closer to the end, gradually reveal the correct digits
      // Start revealing digits earlier in the animation
      if (progress > 0.4) { // Changed from 0.5 to 0.4 to start stabilizing earlier
        newValue = Array.from(finalValue).map((char, index) => {
          const revealThreshold = (progress - 0.4) * 1.7; // Adjusted for smoother transition
          const shouldReveal = Math.random() < revealThreshold;
          return shouldReveal ? char : (isNaN(parseInt(char)) ? char : getRandomDigit());
        }).join('');
      }
      
      // Added a more gradual stabilization from left to right
      if (progress > 0.6) { // Start left-to-right stabilization earlier
        newValue = Array.from(finalValue).map((char, index) => {
          // Stabilize digits from left to right
          const positionStabilizeThreshold = progress - 0.6 + (index * 0.15);
          return positionStabilizeThreshold > 0.2 ? char : 
                 (isNaN(parseInt(char)) ? char : getRandomDigit());
        }).join('');
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
    <span className={`number-scrambler ${className}`}>
      {displayValue || getRandomValue(finalValue)}
    </span>
  );
};

export default NumberScrambler;
