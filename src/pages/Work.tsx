
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projects, Project } from '../data/projects';
import { LockKeyhole } from 'lucide-react';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const Work = () => {
  const [filter, setFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category.toLowerCase() === filter));
    }
  }, [filter]);

  useScrollReveal([filteredProjects]);

  const categories = ['all', ...new Set(projects.map(project => project.category.toLowerCase()))];

  // Function to get client logo based on client name
  const getClientLogo = (project: Project) => {
    if (project.details?.client === 'Sony') {
      return '/sony-2-logo.svg';
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="section-title animate-fade-in">Portfolio</span>
            <h1 className="heading-lg mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Selected Projects
            </h1>
            <p className="paragraph mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A collection of projects showcasing my expertise in digital product design across various industries.
            </p>
          </div>
          
          <div className="flex justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    filter === category
                      ? 'bg-foreground text-background'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/case-study/${project.id}`}
                className="project-card animate-on-scroll relative h-full group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {getClientLogo(project) && (
                  <div className="absolute top-4 right-4 z-10 w-16 h-16 flex items-center justify-center">
                    <img
                      src={getClientLogo(project)}
                      alt={`${project.details?.client} logo`}
                      className={`w-full h-full object-contain ${project.details?.client === 'LaLiga' ? 'invert' : ''}`}
                    />
                  </div>
                )}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="bleed-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                    {project.protected && (
                      <LockKeyhole size={16} className="text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium mt-1">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No projects found in this category.</p>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 px-6 py-2 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-24 bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-title animate-on-scroll">Get in Touch</span>
            <h2 className="heading-lg mb-6 animate-on-scroll">Have a Project in Mind?</h2>
            <p className="paragraph mx-auto mb-8 animate-on-scroll">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <a
              href="mailto:hello@ivanthomas.pro"
              className="inline-block px-8 py-4 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors animate-on-scroll"
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
