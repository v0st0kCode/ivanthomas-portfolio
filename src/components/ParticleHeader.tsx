
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

interface ParticleHeaderProps {
  className?: string;
}

const ParticleHeader: React.FC<ParticleHeaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const particleCount = 80;
      let mouseX = p.windowWidth / 2;
      let mouseY = p.windowHeight / 2;

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        target: p5.Vector;
        radius: number;
        maxSpeed: number;
        maxForce: number;
        color: number;

        constructor(x: number, y: number) {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p5.Vector.random2D().mult(p.random(0.5, 1.5));
          this.acc = p.createVector(0, 0);
          this.target = p.createVector(x, y);
          this.radius = p.random(2, 4);
          this.maxSpeed = p.random(1, 3);
          this.maxForce = p.random(0.1, 0.3);
          this.color = p.random(200, 255);
        }

        update() {
          // Create temporary mouse position vector
          const mouse = p.createVector(mouseX, mouseY);
          
          // Calculate mouse influence (attract if far, repel if close)
          const mouseInfluence = p5.Vector.sub(mouse, this.pos);
          const mouseDistance = mouseInfluence.mag();
          
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
        
        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }
        
        display() {
          p.noStroke();
          // Reduced opacity to 50%
          const alpha = p.map(p5.Vector.dist(this.pos, this.target), 0, 100, 90, 40);
          p.fill(0, alpha);
          p.circle(this.pos.x, this.pos.y, this.radius * 2);
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
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.7);
        canvas.parent(containerRef.current!);
        
        // Create particles and position them in a grid
        const cols = 10;
        const rows = 8;
        const cellWidth = p.width / cols;
        const cellHeight = p.height / rows;
        
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (particles.length < particleCount) {
              const x = cellWidth * (i + 0.5);
              const y = cellHeight * (j + 0.5);
              const particle = new Particle(x, y);
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
        p.resizeCanvas(p.windowWidth, p.windowHeight * 0.7);
        
        // Update particle targets on resize
        const cols = 10;
        const rows = 8;
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
      };
      
      p.touchMoved = () => {
        // Fix: Properly access touch coordinates with type checking
        if (p.touches.length > 0 && p.touches[0]) {
          // Access touch coordinates safely with explicit type casting
          const touch = p.touches[0] as unknown as { x: number, y: number };
          mouseX = touch.x || p.windowWidth / 2;
          mouseY = touch.y || p.windowHeight / 2;
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
    <div 
      ref={containerRef} 
      className={`w-full h-[70vh] relative ${className || ''}`}
      style={{ touchAction: 'none' }}
    />
  );
};

export default ParticleHeader;
