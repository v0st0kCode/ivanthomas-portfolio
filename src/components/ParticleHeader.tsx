
import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

declare global {
  interface Window {
    mouseX: number;
    mouseY: number;
    triggerParticleCelebration?: () => void;
  }
}

interface ParticleHeaderProps {
  className?: string;
}

let globalCompletionCount = 0;

const ParticleHeader: React.FC<ParticleHeaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();
  const [imantedCount, setImantedCount] = useState(0);
  const [isNewImant, setIsNewImant] = useState(false);
  const [counterPosition, setCounterPosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isHoveringContent, setIsHoveringContent] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [completionCount, setCompletionCount] = useState(globalCompletionCount);
  const totalParticles = 80;
  const { toast } = useToast();

  useEffect(() => {
    if (isNewImant) {
      const timer = setTimeout(() => {
        setIsNewImant(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNewImant]);

  useEffect(() => {
    window.triggerParticleCelebration = triggerCelebration;
    
    return () => {
      delete window.triggerParticleCelebration;
    };
  }, []);

  const triggerCelebration = () => {
    console.log("Triggering celebration");
    setShowWinMessage(true);
    setGameActive(true);
    fireworksEffect();
    
    setTimeout(() => fireworksEffect(), 800);
    setTimeout(() => fireworksEffect(), 1600);
    setTimeout(() => fireworksEffect(), 2400);
    
    setTimeout(() => {
      setGameActive(false);
      setImantedCount(0);
      setIsNewImant(false);
      setTimeout(() => {
        setShowWinMessage(false);
      }, 5000);
    }, 4000);
  };

  const fireworksEffect = () => {
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
  };

  const recordCompletion = () => {
    globalCompletionCount++;
    setCompletionCount(globalCompletionCount);
    
    console.log(`Challenge completed! Total completions: ${globalCompletionCount}`);
    
    try {
      const storedCount = localStorage.getItem('dotChallengeCompletions');
      const newCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
      localStorage.setItem('dotChallengeCompletions', newCount.toString());
    } catch (e) {
    }

    toast({
      title: "Challenge Completed!",
      description: `You're the ${globalCompletionCount}${getOrdinalSuffix(globalCompletionCount)} person to collect all dots!`,
    });
  };

  const getOrdinalSuffix = (n: number): string => {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const particleCount = totalParticles;
      let mouseX = p.windowWidth / 2;
      let mouseY = p.windowHeight / 2;
      let imantedParticles = new Set<number>();
      let isMouseInsideCanvas = false;
      let celebrationCount = 0;
      let hasShownToast = false;
      let dotSizeMultiplier = 1;

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
          this.pos = p.createVector(
            x + p.random(-p.width * 0.05, p.width * 0.05), 
            y + p.random(-p.height * 0.05, p.height * 0.05)
          );
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
          const mouse = p.createVector(mouseX, mouseY);
          
          const mouseInfluence = p5.Vector.sub(mouse, this.pos);
          const mouseDistance = mouseInfluence.mag();
          
          if (gameActive && isMouseInsideCanvas && mouseDistance < 60 && !this.imanted && !isHoveringContent) {
            this.imanted = true;
            imantedParticles.add(this.id);
            
            const newCount = imantedParticles.size;
            setImantedCount(newCount);
            setIsNewImant(true);
            
            dotSizeMultiplier = 1 + (newCount * 0.01);
            
            if (newCount >= totalParticles) {
              celebrateSuccess();
            }
          }
          
          if (this.imanted && gameActive) {
            if (!isHoveringContent) {
              mouseInfluence.setMag(this.maxSpeed * 2);
              this.vel = mouseInfluence;
              this.pos = p5.Vector.lerp(this.pos, mouse, 0.1);
            }
            
            if (this.id === Array.from(imantedParticles)[0]) {
              setCounterPosition({ x: this.pos.x, y: this.pos.y });
            }
          } else {
            if (mouseDistance < 120) {
              mouseInfluence.setMag(-1 * (120 - mouseDistance) * 0.05);
              this.applyForce(mouseInfluence);
            } else if (mouseDistance < 200) {
              mouseInfluence.setMag((mouseDistance - 120) * 0.01);
              this.applyForce(mouseInfluence);
            }
            
            const desired = p5.Vector.sub(this.target, this.pos);
            const distance = desired.mag();
            let speed = this.maxSpeed;
            
            if (distance < 100) {
              speed = p.map(distance, 0, 100, 0, this.maxSpeed);
            }
            
            desired.setMag(speed);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            
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
          
          if (this.imanted && gameActive && !isHoveringContent) {
            p.fill(0, 200);
            p.circle(this.pos.x, this.pos.y, this.radius * 2.5 * dotSizeMultiplier);
          } else if (this.imanted && gameActive && isHoveringContent) {
            p.fill(0, 50);
            p.circle(this.pos.x, this.pos.y, this.radius * 2.5 * dotSizeMultiplier);
          } else {
            const alpha = p.map(p5.Vector.dist(this.pos, this.target), 0, 100, 90, 40);
            p.fill(0, alpha);
            p.circle(this.pos.x, this.pos.y, this.radius * 2);
          }
        }
        
        connect(particles: Particle[]) {
          particles.forEach(particle => {
            const d = p5.Vector.dist(this.pos, particle.pos);
            if (d < 100) {
              const alpha = p.map(d, 0, 100, 20, 0);
              p.stroke(0, alpha);
              p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
          });
        }
      }
      
      const celebrateSuccess = () => {
        recordCompletion();
        triggerCelebration();
      };
      
      const resetGame = () => {
        imantedParticles.clear();
        particles.forEach(p => p.imanted = false);
        setImantedCount(0);
        setIsNewImant(false);
        celebrationCount = 0;
        hasShownToast = false;
        dotSizeMultiplier = 1;
      };
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.95);
        canvas.parent(containerRef.current!);
        
        const cols = 10;
        const rows = 8;
        const gridWidth = p.width * 0.95;
        const gridHeight = p.height * 0.95;
        
        const cellWidth = gridWidth / cols;
        const cellHeight = gridHeight / rows;
        
        const startX = (p.width - gridWidth) / 2;
        const startY = (p.height - gridHeight) / 2;
        
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (particles.length < particleCount) {
              const x = startX + cellWidth * (i + 0.5);
              const y = startY + cellHeight * (j + 0.5);
              const particle = new Particle(x, y, particles.length);
              particles.push(particle);
            }
          }
        }
      };
      
      p.draw = () => {
        p.clear();
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].connect(particles.slice(i + 1));
        }
        
        particles.forEach(particle => {
          particle.update();
          particle.display();
        });
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
        
        if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
          if (isMouseInsideCanvas) {
            isMouseInsideCanvas = false;
            setIsMouseInside(false);
          }
        } else {
          isMouseInsideCanvas = true;
          setIsMouseInside(true);
        }
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
          
          if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
            if (isMouseInsideCanvas) {
              isMouseInsideCanvas = false;
              setIsMouseInside(false);
            }
          } else {
            isMouseInsideCanvas = true;
            setIsMouseInside(true);
          }
        }
        return false;
      };
    };

    sketchRef.current = new p5(sketch);

    return () => {
      sketchRef.current?.remove();
    };
  }, [gameActive]);

  const handleMouseEnterContent = () => {
    setIsHoveringContent(true);
  };

  const handleMouseLeaveContent = () => {
    setIsHoveringContent(false);
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`w-full h-[95vh] relative ${className || ''}`}
        style={{ touchAction: 'none' }}
      />
      
      {showWinMessage && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 px-6 py-4 bg-black/80 text-white rounded-lg text-xl font-medium z-50 text-center whitespace-nowrap animate-win-message">
          Congratulations! You collected all dots too!
        </div>
      )}
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" 
        style={{ zIndex: 10 }} 
      />
      
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-64 h-32"
        onMouseEnter={handleMouseEnterContent}
        onMouseLeave={handleMouseLeaveContent}
      />
      
      <div 
        className={`fixed px-3 py-1 bg-black/70 text-white rounded-full text-sm font-mono z-20 pointer-events-none ${
          isNewImant 
            ? 'opacity-100 transition-opacity duration-500 ease-in-out' 
            : isMouseInside && !isHoveringContent && gameActive 
              ? 'opacity-10 transition-opacity duration-700 ease-in-out delay-2000' 
              : 'opacity-0 transition-opacity duration-700 ease-in-out'
        }`}
        style={{ 
          left: `calc(${typeof window !== 'undefined' ? (counterPosition.x || window.mouseX || window.innerWidth / 2) : '50%'}px + 1em)`,
          top: `calc(${typeof window !== 'undefined' ? (counterPosition.y || window.mouseY || window.innerHeight / 2) : '50%'}px + 1em)`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      >
        {imantedCount}/{totalParticles}
      </div>
      
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 right-4 px-3 py-1 bg-black/50 text-white rounded-md text-xs font-mono z-20">
          Total completions: {completionCount}
        </div>
      )}
    </div>
  );
};

export default ParticleHeader;
