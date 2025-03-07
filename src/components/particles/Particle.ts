
import p5 from 'p5';

export class Particle {
  pos: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  target: p5.Vector;
  radius: number;
  maxSpeed: number;
  maxForce: number;
  id: number;
  imanted: boolean;

  constructor(p: p5, x: number, y: number, id: number) {
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
    this.id = id;
    this.imanted = false;
  }

  applyForce(force: p5.Vector) {
    this.acc.add(force);
  }

  update(p: p5, mouse: p5.Vector, isMouseInsideCanvas: boolean, isHoveringContent: boolean, gameActive: boolean) {
    const mouseInfluence = p5.Vector.sub(mouse, this.pos);
    const mouseDistance = mouseInfluence.mag();
    
    if (gameActive && isMouseInsideCanvas && mouseDistance < 60 && !this.imanted && !isHoveringContent) {
      this.imanted = true;
      return true; // Particle was newly imanted
    }
    
    if (this.imanted && gameActive) {
      if (!isHoveringContent) {
        mouseInfluence.setMag(this.maxSpeed * 2);
        this.vel = mouseInfluence;
        this.pos = p5.Vector.lerp(this.pos, mouse, 0.1);
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
    
    return false; // No new imant
  }
  
  display(p: p5, currentOpacity: number, fadeOutOpacity: number, dotSizeMultiplier: number, isHoveringContent: boolean, gameActive: boolean) {
    p.noStroke();
    
    if (currentOpacity === 0) {
      return;
    }
    
    if (this.imanted && gameActive && !isHoveringContent) {
      p.fill(0, 200 * fadeOutOpacity * currentOpacity);
      p.circle(this.pos.x, this.pos.y, this.radius * 2.5 * dotSizeMultiplier);
    } else if (this.imanted && gameActive && isHoveringContent) {
      p.fill(0, 50 * fadeOutOpacity * currentOpacity);
      p.circle(this.pos.x, this.pos.y, this.radius * 2.5 * dotSizeMultiplier);
    } else {
      const alpha = p.map(p5.Vector.dist(this.pos, this.target), 0, 100, 90, 40);
      p.fill(0, alpha * currentOpacity);
      p.circle(this.pos.x, this.pos.y, this.radius * 2);
    }
  }
  
  connect(p: p5, particles: Particle[], gridOpacityLevel: number) {
    if (gridOpacityLevel < 0.05) return;
    
    particles.forEach(particle => {
      const d = p5.Vector.dist(this.pos, particle.pos);
      if (d < 100) {
        const alpha = p.map(d, 0, 100, 20, 0);
        p.stroke(0, alpha * gridOpacityLevel);
        p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
