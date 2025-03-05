
import React, { useState, useEffect } from 'react';

interface TextLoopProps {
  words: string[];
  interval?: number;
  className?: string;
}

const TextLoop: React.FC<TextLoopProps> = ({ 
  words, 
  interval = 3000, 
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Find the longest word to set consistent width
  const longestWord = words.reduce(
    (longest, word) => word.length > longest.length ? word : longest, 
    ""
  );

  useEffect(() => {
    if (words.length <= 1) return;

    const fadeOutTimeout = setTimeout(() => {
      setIsVisible(false);
    }, interval - 800); // Start fade out before interval ends

    const changeWordTimeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setIsVisible(true);
    }, interval);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(changeWordTimeout);
    };
  }, [currentIndex, interval, words.length]);

  return (
    <span className="relative inline-block" style={{ marginRight: '-0.2em' }}>
      {/* Invisible text with the longest word to maintain consistent width */}
      <span className="invisible" aria-hidden="true">
        {longestWord}
      </span>
      
      {/* Actual displayed word that fades in/out */}
      <span 
        className={`absolute top-0 left-0 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};

export default TextLoop;
