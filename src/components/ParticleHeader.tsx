
import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

interface ParticleHeaderProps {
  className?: string;
}

const ParticleHeader: React.FC<ParticleHeaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();
  const [imantedCount, setImantedCount] = useState(0);
  const totalParticles = 80; // Total number of dots
  const { toast } = useToast();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const particleCount = totalParticles;
      let mouseX = p.windowWidth / 2;
      let mouseY = p.windowHeight / 2;
      let imantedParticles = new Set<number>();
      let isMouseInside = false;

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        target: p5.Vector;
        radius: number;
        maxSpeed: number;
        maxForce: number;
        color: number;
        id: number;
        imanted: boolean;

        constructor(x: number, y: number, id: number) {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p5.Vector.random2D().mult(p.random(0.5, 1.5));
          this.acc = p.createVector(0, 0);
          this.target = p.createVector(x, y);
          this.radius = p.random(2, 4);
          this.maxSpeed = p.random(1, 3);
          this.maxForce = p.random(0.1, 0.3);
          this.color = p.random(200, 255);
          this.id = id;
          this.imanted = false;
        }

        update() {
          // Create temporary mouse position vector
          const mouse = p.createVector(mouseX, mouseY);
          
          // Calculate mouse influence 
          const mouseInfluence = p5.Vector.sub(mouse, this.pos);
          const mouseDistance = mouseInfluence.mag();
          
          // Check if this particle is close to the mouse to be "imanted"
          if (isMouseInside && mouseDistance < 60 && !this.imanted) {
            this.imanted = true;
            imantedParticles.add(this.id);
            setImantedCount(imantedParticles.size);
            
            // Check if all particles are imanted
            if (imantedParticles.size >= totalParticles) {
              celebrateSuccess();
            }
          }
          
          if (this.imanted) {
            // Follow the mouse closely when imanted
            mouseInfluence.setMag(this.maxSpeed * 2);
            this.vel = mouseInfluence;
            this.pos = p5.Vector.lerp(this.pos, mouse, 0.1);
          } else {
            // Normal behavior for non-imanted particles
            if (mouseDistance < 120) {
              // Repel if mouse is close
              mouseInfluence.setMag(-1 * (120 - mouseDistance) * 0.05);
              this.applyForce(mouseInfluence);
            } else if (mouseDistance < 200) {
              // Attract if mouse is at medium distance
              mouseInfluence.setMag((mouseDistance - 120) * 0.01);
              this.applyForce(mouseInfluence);
            }
            
            // Attraction force to original position
            const desired = p5.Vector.sub(this.target, this.pos);
            const distance = desired.mag();
            let speed = this.maxSpeed;
            
            if (distance < 100) {
              speed = p.map(distance, 0, 100, 0, this.maxSpeed);
            }
            
            desired.setMag(speed);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            
            // Apply forces and update position
            this.applyForce(steer.mult(0.1));
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
          }
        }
        
        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }
        
        display() {
          p.noStroke();
          
          // Imanted particles are highlighted
          if (this.imanted) {
            p.fill(126, 87, 245, 200); // Use a purple color for imanted particles
            p.circle(this.pos.x, this.pos.y, this.radius * 2.5);
          } else {
            // Regular particles with reduced opacity
            const alpha = p.map(p5.Vector.dist(this.pos, this.target), 0, 100, 90, 40);
            p.fill(0, alpha);
            p.circle(this.pos.x, this.pos.y, this.radius * 2);
          }
        }
        
        connect(particles: Particle[]) {
          particles.forEach(particle => {
            const d = p5.Vector.dist(this.pos, particle.pos);
            if (d < 100) {
              // Reduced opacity to 50%
              const alpha = p.map(d, 0, 100, 20, 0);
              p.stroke(0, alpha);
              p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
          });
        }
      }
      
      const celebrateSuccess = () => {
        // Show toast notification
        toast({
          title: "Congratulations!",
          description: "You've collected all dots!",
        });
        
        // Create confetti effect
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = rect.width / 2 / rect.width;
          const y = rect.height / 2 / rect.height;
          
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ['#9b87f5', '#D946EF', '#F97316', '#0EA5E9', '#8B5CF6']
          });
        }
        
        // Reset the game after a short delay
        setTimeout(() => {
          resetGame();
        }, 2000);
      };
      
      const resetGame = () => {
        imantedParticles.clear();
        particles.forEach(p => p.imanted = false);
        setImantedCount(0);
      };
      
      p.setup = () => {
        // Increase the canvas height to reach the Recent Projects section
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.95);
        canvas.parent(containerRef.current!);
        
        // Create particles and position them in a grid
        const cols = 10;
        const rows = 9; // Increased rows to fill the taller canvas
        const cellWidth = p.width / cols;
        const cellHeight = p.height / rows;
        
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (particles.length < particleCount) {
              const x = cellWidth * (i + 0.5);
              const y = cellHeight * (j + 0.5);
              const particle = new Particle(x, y, particles.length);
              particles.push(particle);
            }
          }
        }
      };
      
      p.draw = () => {
        p.clear();
        
        // Draw connections first (layering)
        for (let i = 0; i < particles.length; i++) {
          particles[i].connect(particles.slice(i + 1));
        }
        
        // Then draw and update particles
        particles.forEach(particle => {
          particle.update();
          particle.display();
        });
      };
      
      p.windowResized = () => {
        // Update canvas size when window is resized
        p.resizeCanvas(p.windowWidth, p.windowHeight * 0.95);
        
        // Update particle targets on resize
        const cols = 10;
        const rows = 9; // Keep consistent with setup
        const cellWidth = p.width / cols;
        const cellHeight = p.height / rows;
        
        particles.forEach((particle, index) => {
          const i = index % cols;
          const j = Math.floor(index / cols);
          particle.target.x = cellWidth * (i + 0.5);
          particle.target.y = cellHeight * (j + 0.5);
        });
      };
      
      p.mouseMoved = () => {
        mouseX = p.mouseX;
        mouseY = p.mouseY;
        
        // Handle mouse leaving the canvas
        if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
          if (isMouseInside) {
            isMouseInside = false;
            resetGame();
          }
        } else {
          isMouseInside = true;
        }
      };
      
      p.touchMoved = () => {
        // Fix: Properly access touch coordinates with type checking
        if (p.touches.length > 0 && p.touches[0]) {
          // Access touch coordinates safely with explicit type casting
          const touch = p.touches[0] as unknown as { x: number, y: number };
          mouseX = touch.x || p.windowWidth / 2;
          mouseY = touch.y || p.windowHeight / 2;
          
          // Handle touch leaving the canvas
          if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
            if (isMouseInside) {
              isMouseInside = false;
              resetGame();
            }
          } else {
            isMouseInside = true;
          }
        }
        return false; // Prevent default
      };
    };

    sketchRef.current = new p5(sketch);

    return () => {
      sketchRef.current?.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`w-full h-[95vh] relative ${className || ''}`}
        style={{ touchAction: 'none' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" 
           style={{ zIndex: 10 }} />
      
      {/* Dot Counter that follows mouse */}
      <div 
        className="fixed px-3 py-1 bg-black/70 text-white rounded-full text-sm font-mono z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: typeof window !== 'undefined' ? `${window.mouseX || window.innerWidth / 2}px` : '50%',
          top: typeof window !== 'undefined' ? `${window.mouseY || window.innerHeight / 2}px` : '50%', 
        }}
      >
        {imantedCount}/{totalParticles}
      </div>
    </div>
  );
};

export default ParticleHeader;
