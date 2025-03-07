
import { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { Particle } from './Particle';
import confetti from 'canvas-confetti';

interface UseParticleSystemProps {
  containerRef: React.RefObject<HTMLDivElement>;
  totalParticles: number;
  gameActive: boolean;
  gridOpacityLevel: number;
  fadeOutCollected: boolean;
  isHoveringContent: boolean;
  onImantCountChange: (count: number, isNewImant: boolean) => void;
  onCounterPositionChange: (position: { x: number, y: number }) => void;
  onMouseInsideChange: (isInside: boolean) => void;
  triggerCelebration: () => void;
}

export const useParticleSystem = ({
  containerRef,
  totalParticles,
  gameActive,
  gridOpacityLevel,
  fadeOutCollected,
  isHoveringContent,
  onImantCountChange,
  onCounterPositionChange,
  onMouseInsideChange,
  triggerCelebration
}: UseParticleSystemProps) => {
  const sketchRef = useRef<p5>();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      let mouseX = p.windowWidth / 2;
      let mouseY = p.windowHeight / 2;
      let imantedParticles = new Set<number>();
      let isMouseInsideCanvas = false;
      let dotSizeMultiplier = 1;
      let fadeOutOpacity = 1;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.95);
        canvas.parent(containerRef.current!);
        
        initializeParticles();
      };

      const initializeParticles = () => {
        const cols = 10;
        const rows = 8;
        const gridWidth = p.width * 0.95;
        const gridHeight = p.height * 0.95;
        
        const cellWidth = gridWidth / cols;
        const cellHeight = gridHeight / rows;
        
        const startX = (p.width - gridWidth) / 2;
        const startY = (p.height - gridHeight) / 2;
        
        particles.length = 0; // Clear any existing particles
        
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (particles.length < totalParticles) {
              const x = startX + cellWidth * (i + 0.5);
              const y = startY + cellHeight * (j + 0.5);
              const particle = new Particle(p, x, y, particles.length);
              particles.push(particle);
            }
          }
        }
      };
      
      p.draw = () => {
        p.clear();
        
        const currentOpacity = gridOpacityLevel;
        
        if (fadeOutCollected) {
          fadeOutOpacity = p.max(fadeOutOpacity - 0.02, 0);
        } else {
          fadeOutOpacity = p.min(fadeOutOpacity + 0.02, 1);
        }
        
        if (currentOpacity >= 0.05) {
          for (let i = 0; i < particles.length; i++) {
            particles[i].connect(p, particles.slice(i + 1), gridOpacityLevel);
          }
          
          let newImantFound = false;
          const mouse = p.createVector(mouseX, mouseY);
          
          particles.forEach((particle, index) => {
            const wasNewlyImanted = particle.update(p, mouse, isMouseInsideCanvas, isHoveringContent, gameActive);
            
            if (wasNewlyImanted) {
              imantedParticles.add(particle.id);
              newImantFound = true;
              dotSizeMultiplier = 1 + (imantedParticles.size * 0.01);
              
              if (imantedParticles.size >= totalParticles) {
                triggerCelebration();
              }
            }
            
            particle.display(p, currentOpacity, fadeOutOpacity, dotSizeMultiplier, isHoveringContent, gameActive);
            
            if (particle.imanted && index === Array.from(imantedParticles)[0]) {
              onCounterPositionChange({ x: particle.pos.x, y: particle.pos.y });
            }
          });
          
          if (newImantFound) {
            onImantCountChange(imantedParticles.size, true);
          }
        }
      };
      
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight * 0.95);
        
        const cols = 10;
        const rows = 8;
        const gridWidth = p.width * 0.95;
        const gridHeight = p.height * 0.95;
        
        const cellWidth = gridWidth / cols;
        const cellHeight = gridHeight / rows;
        
        const startX = (p.width - gridWidth) / 2;
        const startY = (p.height - gridHeight) / 2;
        
        particles.forEach((particle, index) => {
          const i = index % cols;
          const j = Math.floor(index / cols);
          particle.target.x = startX + cellWidth * (i + 0.5);
          particle.target.y = startY + cellHeight * (j + 0.5);
        });
      };
      
      p.mouseMoved = () => {
        mouseX = p.mouseX;
        mouseY = p.mouseY;
        
        if (typeof window !== 'undefined') {
          window.mouseX = p.mouseX;
          window.mouseY = p.mouseY;
        }
        
        checkMousePosition();
      };
      
      p.touchMoved = () => {
        if (p.touches.length > 0 && p.touches[0]) {
          const touch = p.touches[0] as unknown as { x: number, y: number };
          mouseX = touch.x || p.windowWidth / 2;
          mouseY = touch.y || p.windowHeight / 2;
          
          if (typeof window !== 'undefined') {
            window.mouseX = mouseX;
            window.mouseY = mouseY;
          }
          
          checkMousePosition();
        }
        return false;
      };
      
      const checkMousePosition = () => {
        if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
          if (isMouseInsideCanvas) {
            isMouseInsideCanvas = false;
            onMouseInsideChange(false);
          }
        } else {
          isMouseInsideCanvas = true;
          onMouseInsideChange(true);
        }
      };

      // Public method to reset the game
      p.resetGame = () => {
        imantedParticles.clear();
        particles.forEach(p => p.imanted = false);
        dotSizeMultiplier = 1;
        fadeOutOpacity = 1;
      };
    };

    sketchRef.current = new p5(sketch);

    return () => {
      sketchRef.current?.remove();
    };
  }, [
    containerRef, 
    totalParticles, 
    gameActive, 
    gridOpacityLevel, 
    fadeOutCollected, 
    isHoveringContent, 
    onImantCountChange, 
    onCounterPositionChange, 
    onMouseInsideChange, 
    triggerCelebration
  ]);

  return sketchRef;
};
