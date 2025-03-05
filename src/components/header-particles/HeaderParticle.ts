
import p5 from 'p5';

class HeaderParticle {
  pos: p5.Vector;
  vel: p5.Vector;
  acc: p5.Vector;
  target: p5.Vector;
  radius: number;
  maxSpeed: number;
  maxForce: number;
  color: number;

  constructor(p: p5, x: number, y: number) {
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p5.Vector.random2D().mult(p.random(0.5, 1.5));
    this.acc = p.createVector(0, 0);
    this.target = p.createVector(x, y);
    this.radius = p.random(2, 4);
    this.maxSpeed = p.random(1, 3);
    this.maxForce = p.random(0.1, 0.3);
    this.color = p.random(200, 255);
  }

  update(p: p5, mouseX: number, mouseY: number) {
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
  
  display(p: p5) {
    p.noStroke();
    // Reduced opacity to 50%
    const alpha = p.map(p5.Vector.dist(this.pos, this.target), 0, 100, 90, 40);
    p.fill(0, alpha);
    p.circle(this.pos.x, this.pos.y, this.radius * 2);
  }
  
  connect(p: p5, particles: HeaderParticle[]) {
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

export default HeaderParticle;
