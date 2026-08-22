import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number; // ms to wait before typing starts
  speed?: number; // ms per character
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 800,
  speed = 22,
  className = '',
  onComplete,
}) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedLength < text.length) {
      const charDelay = speed + (Math.random() * 12 - 6); // Subtle typing humanization
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, Math.max(8, charDelay));
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [started, displayedLength, text.length, speed, onComplete]);

  const visibleText = text.slice(0, displayedLength);

  return (
    <span className={className}>
      {visibleText}
      <span
        aria-hidden="true"
        className="inline-block w-[0.55em] h-[1.1em] ml-1 bg-signal align-middle terminal-cursor"
      />
    </span>
  );
};

export default TypewriterText;
