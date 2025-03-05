
import p5 from 'p5';
import HeaderParticle from './HeaderParticle';

class HeaderParticleSystem {
  particles: HeaderParticle[];
  particleCount: number;
  mouseX: number;
  mouseY: number;

  constructor(particleCount = 80) {
    this.particles = [];
    this.particleCount = particleCount;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  initialize(p: p5) {
    this.mouseX = p.windowWidth / 2;
    this.mouseY = p.windowHeight / 2;
    
    // Create particles and position them in a grid
    const cols = 10;
    const rows = 9; // Increased rows to fill the taller canvas
    const cellWidth = p.width / cols;
    const cellHeight = p.height / rows;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (this.particles.length < this.particleCount) {
          const x = cellWidth * (i + 0.5);
          const y = cellHeight * (j + 0.5);
          const particle = new HeaderParticle(p, x, y);
          this.particles.push(particle);
        }
      }
    }
  }

  updateMousePosition(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  resize(p: p5) {
    // Update particle targets on resize
    const cols = 10;
    const rows = 9; // Keep consistent with setup
    const cellWidth = p.width / cols;
    const cellHeight = p.height / rows;
    
    this.particles.forEach((particle, index) => {
      const i = index % cols;
      const j = Math.floor(index / cols);
      particle.target.x = cellWidth * (i + 0.5);
      particle.target.y = cellHeight * (j + 0.5);
    });
  }

  update(p: p5) {
    // Update and draw all particles
    p.clear();
    
    // Draw connections first (layering)
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].connect(p, this.particles.slice(i + 1));
    }
    
    // Then update and display particles
    this.particles.forEach(particle => {
      particle.update(p, this.mouseX, this.mouseY);
      particle.display(p);
    });
  }
}

export default HeaderParticleSystem;
