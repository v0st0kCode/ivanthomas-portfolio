import React from 'react';
import { Link } from 'react-router-dom';
import ParticleHeader from '../components/ParticleHeader';
import Navbar from '../components/Navbar';
import { getFeaturedProjects } from '../data/projects';
const Index = () => {
  const featuredProjects = getFeaturedProjects();
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Particle Animation */}
      <section className="relative overflow-hidden">
        <ParticleHeader />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center max-w-4xl">
            <span className="inline-block py-1 px-3 mb-6 text-xs font-mono tracking-wider uppercase text-muted-foreground">
              Digital Product Designer
            </span>
            <h1 className="heading-xl mx-auto mb-8 text-7xl">Connecting dots since 1986</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              I design and build user-centered interfaces that connect people and technology
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link to="/work" className="button-primary">
                View Work
              </Link>
              <Link to="/about" className="button-secondary">
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="mb-16 max-w-3xl">
            <span className="section-title">Selected Work</span>
            <h2 className="heading-lg mb-4">Recent Projects</h2>
            <p className="paragraph">
              A collection of projects I've worked on that showcase my approach to problem-solving and design thinking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.slice(0, 4).map((project, index) => <Link key={project.id} to={`/case-study/${project.id}`} className="project-card">
                <div className="aspect-[16/10] overflow-hidden relative group">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="project-overlay absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 group-hover:opacity-100">
                    <span className="text-xs font-mono uppercase tracking-wider opacity-75 mb-2">{project.category}</span>
                    <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                    <p className="text-sm opacity-75 mb-4">{project.description}</p>
                    <span className="text-xs font-mono px-4 py-1 border border-white/30 rounded-sm transition-all duration-300 hover:bg-white/70 hover:text-black hover:border-white hover:scale-105">View Case Study</span>
                  </div>
                </div>
                <div className="pt-4">
                  <span className="text-xs font-mono text-muted-foreground">{project.category}</span>
                  <h3 className="text-lg font-medium mt-1">{project.title}</h3>
                </div>
              </Link>)}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link to="/work" className="button-primary flex items-center space-x-2">
              <span>View All Projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 8H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-24 bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <span className="section-title">Design Approach</span>
            <h2 className="heading-lg mb-6">How I Work</h2>
            <p className="paragraph">
              My process is built around understanding your business goals and user needs to create designs that deliver results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-0">
              <div className="w-12 h-12 flex items-center justify-center border border-black text-black rounded-full mb-6 font-mono">
                <span>01</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Discovery</h3>
              <p className="text-muted-foreground">Understanding user needs, business objectives, and technical constraints to lay a solid foundation.</p>
            </div>
            
            <div className="p-0">
              <div className="w-12 h-12 flex items-center justify-center border border-black text-black rounded-full mb-6 font-mono">
                <span>02</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Design</h3>
              <p className="text-muted-foreground">Crafting intuitive user flows, wireframes, and high-fidelity designs with a focus on simplicity.</p>
            </div>
            
            <div className="p-0">
              <div className="w-12 h-12 flex items-center justify-center border border-black text-black rounded-full mb-6 font-mono">
                <span>03</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Delivery</h3>
              <p className="text-muted-foreground">Testing, iterating, and delivering design solutions that meet and exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="section-title">Get in Touch</span>
            <h2 className="heading-lg mb-6">Let's Work Together</h2>
            <p className="paragraph mb-8">
              Have a project in mind? I'd love to discuss how we can collaborate to create something exceptional.
            </p>
            <a href="mailto:hello@example.com" className="button-primary inline-block">
              hello@example.com
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Design Portfolio
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-black transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-black transition-colors text-sm">
                Dribbble
              </a>
              <a href="#" className="text-muted-foreground hover:text-black transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-black transition-colors text-sm">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;