
import React, { useState, useEffect, ReactNode } from 'react';

interface ScrollBlurProviderProps {
  children: ReactNode;
}

const ScrollBlurProvider: React.FC<ScrollBlurProviderProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setDocumentHeight(document.body.scrollHeight);
      setViewportHeight(window.innerHeight);
    };

    // Initial setup
    handleResize();
    handleScroll();

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate blur amount based on scroll position
  const calculateBlur = () => {
    // Start adding blur after 10% of viewport height scrolled
    const scrollThreshold = viewportHeight * 0.1;
    // Max blur reached at 50% of viewport height scrolled
    const maxBlurThreshold = viewportHeight * 0.5;
    
    if (scrollY <= scrollThreshold) return 0;
    
    const blurValue = ((scrollY - scrollThreshold) / (maxBlurThreshold - scrollThreshold)) * 10;
    return Math.min(blurValue, 10); // Max blur of 10px
  };

  // Calculate opacity based on scroll position
  const calculateOpacity = () => {
    // Start fading after 5% of viewport height scrolled
    const fadeThreshold = viewportHeight * 0.05;
    // Fully faded at 70% of viewport height scrolled
    const fullFadeThreshold = viewportHeight * 0.7;
    
    if (scrollY <= fadeThreshold) return 1;
    
    const opacity = 1 - ((scrollY - fadeThreshold) / (fullFadeThreshold - fadeThreshold));
    return Math.max(opacity, 0.15); // Min opacity of 0.15
  };

  const blurAmount = calculateBlur();
  const opacityValue = calculateOpacity();

  return (
    <div className="min-h-screen bg-white relative">
      <div 
        className="fixed inset-0 w-full h-full -z-10 transition-all duration-200 ease-out"
        style={{ 
          filter: `blur(${blurAmount}px)`,
          opacity: opacityValue
        }}
      >
        {/* This is where the BackgroundParticles will be rendered */}
      </div>
      {children}
    </div>
  );
};

export default ScrollBlurProvider;
