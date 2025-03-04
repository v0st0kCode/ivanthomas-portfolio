import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projects, Project } from '../data/projects';

const Work = () => {
  const [filter, setFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  // Filter projects when category filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category.toLowerCase() === filter));
    }
  }, [filter]);

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-slide-in');
          element.classList.remove('opacity-0');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => project.category.toLowerCase()))];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Work Hero */}
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
          
          {/* Filter */}
          <div className="flex justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    filter === category 
                      ? 'bg-black text-white' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link 
                key={project.id}
                to={`/case-study/${project.id}`} 
                className="project-card animate-on-scroll opacity-0 h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="project-overlay">
                  <span className="text-xs uppercase tracking-wider opacity-75 mb-2">{project.category}</span>
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-sm opacity-75 mb-4">{project.description}</p>
                  <span className="text-sm px-4 py-1 border border-white/30 rounded-full">View Case Study</span>
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground">{project.category} • {project.year}</span>
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
                className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-24 bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-title animate-on-scroll opacity-0">Get in Touch</span>
            <h2 className="heading-lg mb-6 animate-on-scroll opacity-0">Have a Project in Mind?</h2>
            <p className="paragraph mx-auto mb-8 animate-on-scroll opacity-0">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <a 
              href="mailto:contact@example.com" 
              className="inline-block px-8 py-4 bg-black text-white rounded-md hover:bg-black/90 transition-colors animate-on-scroll opacity-0"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-black transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-black transition-colors">
                Dribbble
              </a>
              <a href="#" className="text-muted-foreground hover:text-black transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-black transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Work;
