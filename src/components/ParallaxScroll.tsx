
import React, { useEffect } from 'react';

const ParallaxScroll: React.FC = () => {
  useEffect(() => {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      parallaxElements.forEach((element) => {
        // Get element's parent container position instead of the element itself
        const parentElement = element.closest('.feature-card-image-bg');
        if (!parentElement) return;
        
        const elementPosition = parentElement.getBoundingClientRect().top + scrollPosition;
        const windowHeight = window.innerHeight;
        
        // Start parallax effect when element is still below viewport
        // This creates a more continuous effect as user scrolls
        const distanceToElement = elementPosition - scrollPosition;
        const visibilityRatio = 1 - Math.min(Math.max(0, distanceToElement / (windowHeight * 1.5)), 1);
        
        // Apply parallax effect based on scroll position and visibility
        const offset = scrollPosition * 0.05 * visibilityRatio;
        const translateY = Math.min(Math.max(-10, offset), 10); // Increased range for more noticeable effect
        
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
