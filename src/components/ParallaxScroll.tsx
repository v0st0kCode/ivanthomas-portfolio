
import React, { useEffect } from 'react';

const ParallaxScroll: React.FC = () => {
  useEffect(() => {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      parallaxElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top + scrollPosition;
        const offset = (scrollPosition - elementPosition) * 0.1;
        const translateY = Math.min(Math.max(-5, offset), 5); // Limit movement to -5% to 5%
        
        (element as HTMLElement).style.transform = `translateY(${translateY}%)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize positions
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return null;
};

export default ParallaxScroll;
