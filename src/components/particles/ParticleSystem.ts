
import p5 from 'p5';
import Particle from './Particle';

class ParticleSystem {
  particles: Particle[];
  particleCount: number;
  mouseX: number;
  mouseY: number;

  constructor(particleCount = 100) {
    this.particles = [];
    this.particleCount = particleCount;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  initialize(p: p5) {
    this.mouseX = p.windowWidth / 2;
    this.mouseY = p.windowHeight / 2;
    
    // Create particles in a grid pattern for better coverage
    const cols = Math.ceil(Math.sqrt(this.particleCount * p.width / p.height));
    const rows = Math.ceil(this.particleCount / cols);
    const cellWidth = p.width / cols;
    const cellHeight = p.height / rows;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (this.particles.length < this.particleCount) {
          // Add some randomness to grid positions
          const x = cellWidth * (i + 0.5) + p.random(-cellWidth / 4, cellWidth / 4);
          const y = cellHeight * (j + 0.5) + p.random(-cellHeight / 4, cellHeight / 4);
          this.particles.push(new Particle(p, x, y));
        }
      }
    }
  }

  updateMousePosition(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  resize(p: p5) {
    // Recalculate grid on resize
    const cols = Math.ceil(Math.sqrt(this.particleCount * p.width / p.height));
    const rows = Math.ceil(this.particleCount / cols);
    const cellWidth = p.width / cols;
    const cellHeight = p.height / rows;
    
    this.particles.forEach((particle, index) => {
      const i = index % cols;
      const j = Math.floor(index / cols);
      
      // Maintain some randomness in target positions
      particle.target.x = cellWidth * (i + 0.5) + p.random(-cellWidth / 4, cellWidth / 4);
      particle.target.y = cellHeight * (j + 0.5) + p.random(-cellHeight / 4, cellHeight / 4);
    });
  }

  update(p: p5) {
    // First draw all connections between particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].connect(p, this.particles.slice(i + 1));
    }
    
    // Then update and display each particle
    this.particles.forEach(particle => {
      particle.update(p, this.mouseX, this.mouseY);
      particle.display(p);
    });
  }
}

export default ParticleSystem;
