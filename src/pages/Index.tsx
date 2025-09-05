import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleHeader from '../components/ParticleHeader';
import Navbar from '../components/Navbar';
import { getFeaturedProjects } from '../data/projects';
import { LockKeyhole } from 'lucide-react';

// Add mouse position tracking to the window object
if (typeof window !== 'undefined') {
  window.mouseX = 0;
  window.mouseY = 0;
  window.addEventListener('mousemove', e => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
  });
}
const Index = () => {
  const featuredProjects = getFeaturedProjects();
  const [isLoaded, setIsLoaded] = useState(false);
  const [particleHeaderRef, setParticleHeaderRef] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300); // Small delay to ensure animation is visible

    return () => clearTimeout(timer);
  }, []);

  // Function to get client logo based on client name
  const getClientLogo = project => {
    if (project.details?.client === 'Sony') {
      return '/sony-2-logo.svg';
    }
    if (project.details?.client === 'LaLiga') {
      return '/la-liga-logo-original.svg';
    }
    return null;
  };

  // Function to trigger celebration effect
  const handleTriggerCelebration = e => {
    e.preventDefault();
    if (window.triggerParticleCelebration) {
      console.log("Triggering celebration from About Me button");
      window.triggerParticleCelebration();
    }
  };
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Particle Animation */}
      <section className="relative overflow-hidden">
        <ParticleHeader />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`container-custom text-center max-w-4xl transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block py-1 px-3 mb-6 text-xs font-mono font-bold tracking-wider uppercase text-muted-foreground/60 animate-pulse">
              THIS PORTFOLIO IS A <span className="underline">WORK IN PROGRESS</span>
            </span>
            <h1 className="heading-xl mx-auto mb-8 text-6xl">
              Connecting the dots since 1999
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">I'm a digital product designer with +25 years of experience crafting user-friendly digital products that connect people and technology</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="button-primary" onClick={handleTriggerCelebration}>
                About Me
              </a>
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
              © {new Date().getFullYear()} Ivan Thomas
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