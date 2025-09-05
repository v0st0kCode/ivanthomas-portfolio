import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleHeader from '../components/ParticleHeader';
import Navbar from '../components/Navbar';
import { getFeaturedProjects } from '../data/projects';
import { LockKeyhole, Linkedin, Send } from 'lucide-react';

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
  return <div className="min-h-screen bg-white relative">
      <Navbar />
      
      {/* Hero Section with Particle Animation */}
      <section className="relative overflow-hidden h-screen">
        <ParticleHeader />
        <div className="absolute inset-0 flex items-center justify-center pb-16">
          <div className={`container-custom text-center max-w-4xl transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block py-1 px-3 mb-6 text-xs font-mono font-bold tracking-wider uppercase text-muted-foreground/60 animate-pulse">
              THIS PORTFOLIO IS A <span className="underline">WORK IN PROGRESS</span>
            </span>
            <h1 className="heading-xl mx-auto mb-8 text-6xl">
              Connecting the dots since 1999
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">I'm a digital product designer with over 25 years of experience crafting user-friendly digital products that connect people and technology.<br />I'm currently updating my portfolio. In the meantime, you can view my profile on LinkedIn or send me a message.</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="https://www.linkedin.com/in/ivanthomasgarces/" target="_blank" rel="noopener noreferrer" className="button-primary">
                <Linkedin size={20} />
                LinkedIn Profile
              </a>
              <a href="mailto:hello@ivanthomas.pro" className="button-secondary">
                <Send size={20} />
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
      
      
      
      
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 z-50">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-4">
              © {new Date().getFullYear()} Ivan Thomas
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;