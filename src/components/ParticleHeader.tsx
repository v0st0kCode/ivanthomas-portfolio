
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
      // Reduce particle count for better performance
      const particleCount = 60; // Reduced from 80
      let mouseX = p.windowWidth / 2;
      let mouseY = p.windowHeight / 2;
      // Add frame rate tracking
      let frameRateValue = 0;
      let lastFrameRateCheck = 0;
      let isReducedMode = false;

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        target: p5.Vector;
        radius: number;
        maxSpeed: number;
        maxForce: number;
        color: number;
        lastUpdateTime: number;

        constructor(x: number, y: number) {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p5.Vector.random2D().mult(p.random(0.2, 0.8)); // Reduced velocity
          this.acc = p.createVector(0, 0);
          this.target = p.createVector(x, y);
          this.radius = p.random(1.5, 3); // Slightly reduced radius
          this.maxSpeed = p.random(0.7, 2); // Reduced max speed
          this.maxForce = p.random(0.05, 0.2); // Reduced force
          this.color = p.random(200, 255);
          this.lastUpdateTime = p.millis();
        }

        update() {
          // Throttle calculations based on frame rate
          const currentTime = p.millis();
          
          // Create temporary mouse position vector
          const mouse = p.createVector(mouseX, mouseY);
          
          // Calculate mouse influence (attract if far, repel if close)
          const mouseInfluence = p5.Vector.sub(mouse, this.pos);
          const mouseDistance = mouseInfluence.mag();
          
          // Optimize by reducing the influence calculation radius
          if (mouseDistance < 100) { // Reduced from 120
            // Repel if mouse is close
            mouseInfluence.setMag(-1 * (100 - mouseDistance) * 0.05);
            this.applyForce(mouseInfluence);
          } else if (!isReducedMode && mouseDistance < 150) { // Reduced from 200
            // Attract if mouse is at medium distance
            mouseInfluence.setMag((mouseDistance - 100) * 0.01);
            this.applyForce(mouseInfluence);
          }
          
          // Attraction force to original position
          const desired = p5.Vector.sub(this.target, this.pos);
          const distance = desired.mag();
          let speed = this.maxSpeed;
          
          if (distance < 80) { // Reduced from 100
            speed = p.map(distance, 0, 80, 0, this.maxSpeed);
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
          // Reduced opacity to 40%
          const alpha = p.map(p5.Vector.dist(this.pos, this.target), 0, 80, 80, 30);
          p.fill(0, alpha);
          p.circle(this.pos.x, this.pos.y, this.radius * 2);
        }
        
        connect(particles: Particle[]) {
          // Only connect to nearby particles to reduce calculations
          if (isReducedMode) return; // Skip connections in reduced mode
          
          let connectCount = 0;
          
          for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            const d = p5.Vector.dist(this.pos, particle.pos);
            // Connect fewer particles
            if (d < 80 && connectCount < 3) { // Reduced from 100 and limiting connections
              connectCount++;
              // Reduced opacity
              const alpha = p.map(d, 0, 80, 15, 0);
              p.stroke(0, alpha);
              p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
          }
        }
      }
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.7);
        canvas.parent(containerRef.current!);
        p.frameRate(30); // Limit frame rate
        
        // Create particles and position them in a grid
        const cols = 10;
        const rows = 6; // Reduced rows
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
        
        // Check frame rate every second
        if (p.millis() - lastFrameRateCheck > 1000) {
          frameRateValue = p.frameRate();
          lastFrameRateCheck = p.millis();
          
          // If frame rate drops below threshold, enter reduced mode
          if (frameRateValue < 20 && !isReducedMode) {
            isReducedMode = true;
          } else if (frameRateValue > 24 && isReducedMode) {
            // Return to normal mode if performance improves
            isReducedMode = false;
          }
        }
        
        // Only draw connections in normal mode
        if (!isReducedMode) {
          // Draw connections first (layering)
          // Limit connection calculations by only drawing from half the particles
          const connectionLimit = isReducedMode ? particles.length / 3 : particles.length / 2;
          for (let i = 0; i < connectionLimit; i++) {
            particles[i].connect(particles.slice(i + 1));
          }
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
        const rows = 6; // Reduced rows
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
        // Properly access touch coordinates with type checking
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
