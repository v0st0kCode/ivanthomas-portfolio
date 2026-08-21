
import React from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const Work = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="section-title animate-fade-in">Portfolio</span>
            <h1 className="heading-lg mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Selected Projects
            </h1>
            <p className="paragraph animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A collection of projects showcasing my expertise in digital product design across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Full-bleed two-panel cards, same component as home's Selected Works */}
      <section className="pb-16 md:pb-24 space-y-1">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>

      <section className="py-24 bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-title animate-on-scroll opacity-0">Get in Touch</span>
            <h2 className="heading-lg mb-6 animate-on-scroll opacity-0">Have a Project in Mind?</h2>
            <p className="paragraph mx-auto mb-8 animate-on-scroll opacity-0">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <a
              href="mailto:hello@ivanthomas.pro"
              className="inline-block px-8 py-4 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors animate-on-scroll opacity-0"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Ivan Thomas
            </p>
            <a
              href="https://www.linkedin.com/in/ivanthomasgarces/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Work;
