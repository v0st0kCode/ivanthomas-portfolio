
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import { LockKeyhole } from 'lucide-react';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const Work = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mb-20">
            <span className="section-title animate-fade-in">Portfolio</span>
            <h1 className="heading-lg mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Selected Projects
            </h1>
            <p className="paragraph animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A collection of projects showcasing my expertise in digital product design across various industries.
            </p>
          </div>

          {/* Single-column, large-format list — ref: nabauer.com/work, adamhickey.com */}
          <div className="max-w-4xl mx-auto space-y-24">
            {projects.map((project, index) => {
              const title = project.cardTitle ?? project.title;
              const tags = [
                project.cardPlatform ?? project.category,
                ...(project.cardTags ?? project.details?.tools ?? []),
              ].join(', ');
              const content = (
                <>
                  <img
                    src={project.image}
                    alt={title}
                    className={`bleed-image mb-8 transition-transform duration-700 ease-out ${
                      project.caseStudyPending ? '' : 'group-hover:scale-[1.01]'
                    }`}
                    loading="lazy"
                  />

                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <h2
                        className={`heading-md mb-3 transition-opacity ${
                          project.caseStudyPending ? '' : 'group-hover:opacity-70'
                        }`}
                      >
                        {title}
                      </h2>
                      <p className="paragraph mb-5">{project.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {tags}
                        {project.caseStudyPending && ' · Case study coming soon'}
                      </p>
                    </div>
                    {project.protected && (
                      <LockKeyhole size={18} className="text-muted-foreground mt-1 shrink-0" />
                    )}
                  </div>
                </>
              );

              if (project.caseStudyPending) {
                return (
                  <div key={project.id} className="block animate-on-scroll opacity-0" style={{ animationDelay: `${index * 0.05}s` }}>
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={project.id}
                  to={`/case-study/${project.id}`}
                  className="group block animate-on-scroll opacity-0"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
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
