import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { getFeaturedProjects } from '../data/projects';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const Index = () => {
  const featuredProjects = getFeaturedProjects();
  useScrollReveal([featuredProjects.length]);

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* Hero — copy + layout per Ivan's Figma redesign, 20 ago 2026.
          Bottom spacing before Selected Works: 3x pb-12/16, then 2x that again (pb-36/48 → pb-72/96). */}
      <section className="pt-40 pb-72 md:pt-52 md:pb-96">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="heading-xl mb-8">
              Hey! It's Ivan here! I'm a hands-on multidisciplinary designer who's been
              crafting end-to-end products for two decades.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Currently at <strong className="font-semibold text-foreground">Globant</strong>
              <span className="text-signal">▸</span>, designing, building and shipping digital
              solutions through AI-assisted workflows for professional sports tech.
            </p>
          </div>
        </div>
      </section>

      {/* Selected Works — full-bleed two-panel cards, ref: Ivan's Figma redesign 21 ago */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom mb-10">
          <div className="flex items-end justify-between animate-on-scroll opacity-0">
            <h2 className="heading-lg">Selected Works</h2>
            <Link to="/work" className="link-hover text-sm font-medium">
              View all work →
            </Link>
          </div>
        </div>

        <div className="space-y-1">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
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

export default Index;
