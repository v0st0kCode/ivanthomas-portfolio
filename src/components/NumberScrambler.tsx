
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

  // Animation function
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // More frequent changes at the beginning, slowing down towards the end
    const shouldUpdate = Math.random() < (1 - progress) * 0.8;
    
    if (shouldUpdate || displayValue.length !== finalValue.length) {
      // Generate a new random value
      let newValue = getRandomValue(finalValue);
      
      // As we get closer to the end, gradually reveal the correct digits
      if (progress > 0.5) {
        newValue = Array.from(finalValue).map((char, index) => {
          const revealThreshold = (progress - 0.5) * 2; // Scale from 0 to 1
          const shouldReveal = Math.random() < revealThreshold;
          return shouldReveal ? char : (isNaN(parseInt(char)) ? char : getRandomDigit());
        }).join('');
      }
      
      // When we're very close to the end, ensure some digits are correct
      if (progress > 0.8) {
        newValue = Array.from(finalValue).map((char, index) => {
          return index < Math.floor(finalValue.length * (progress - 0.7) * 5) ? char : 
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
