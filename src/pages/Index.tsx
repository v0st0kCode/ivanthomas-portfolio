
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleHeader from '../components/ParticleHeader';
import Navbar from '../components/Navbar';
import { getFeaturedProjects } from '../data/projects';

const Index = () => {
  const featuredProjects = getFeaturedProjects();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Small delay to ensure animation is visible

    return () => clearTimeout(timer);
  }, []);

  // Card variants for different background colors and styles
  const cardVariants = [
    { bgClass: 'feature-card-light', accent: 'arrow-right' },
    { bgClass: 'feature-card-dark', accent: 'arrow-right' },
    { bgClass: 'feature-card-green', accent: 'arrow-right' },
    { bgClass: 'feature-card-blue', accent: 'arrow-right' },
  ];

  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Particle Animation */}
      <section className="relative overflow-hidden">
        <ParticleHeader />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`container-custom text-center max-w-4xl transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block py-1 px-3 mb-6 text-xs font-mono tracking-wider uppercase text-muted-foreground">
              Digital Product Designer
            </span>
            <h1 className="heading-xl mx-auto mb-8 text-6xl">
              Connecting dots since <span className="font-onest">1986</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              I'm a digital product designer with 20 years of experience crafting user-friendly digital products that connect people and technology
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
      
      {/* Featured Projects Section with New Card Style */}
      <section className="py-16 bg-white relative">
        <div className="container-custom">
          <div className="mb-16 max-w-3xl">
            <h2 className="heading-lg mb-4">Recent Projects</h2>
            <p className="paragraph">
              A collection of projects I've worked on that showcase my approach to problem-solving and design thinking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => {
              // Pick a card variant based on index
              const variant = cardVariants[index % cardVariants.length];
              
              return (
                <Link key={project.id} to={`/case-study/${project.id}`} className="feature-card group">
                  <div className={`feature-card ${variant.bgClass} h-full`}>
                    <div className="feature-card-content">
                      <span className="feature-card-category">{project.category}</span>
                      <h3 className="feature-card-title">{project.title}</h3>
                      <p className="feature-card-description">{project.description}</p>
                      <div className="feature-card-image">
                        <img src={project.image} alt={project.title} loading="lazy" />
                      </div>
                      <div className="feature-card-accent">
                        <svg className="feature-card-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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
