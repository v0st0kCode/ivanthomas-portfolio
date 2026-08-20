import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getFeaturedProjects } from '../data/projects';
import { LockKeyhole } from 'lucide-react';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const Index = () => {
  const featuredProjects = getFeaturedProjects();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* Hero — copy + layout per Ivan's Figma redesign, 20 ago 2026 */}
      <section className="pt-40 pb-24 md:pt-52 md:pb-32">
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

      {/* Selected Works — single column, ref: /work, images now rounded + hairline stroke */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12 animate-on-scroll opacity-0">
            <h2 className="heading-lg">Selected Works</h2>
            <Link to="/work" className="link-hover text-sm font-medium">
              View all work →
            </Link>
          </div>

          <div className="max-w-4xl mx-auto space-y-20">
            {featuredProjects.map((project, index) => {
              const tags = [project.category, ...(project.details?.tools ?? [])].join(', ');
              const displayYear = project.year.split('-')[0];

              const content = (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`bleed-image mb-6 transition-transform duration-700 ease-out ${
                      project.caseStudyPending ? '' : 'group-hover:scale-[1.01]'
                    }`}
                    loading="lazy"
                  />
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <h3
                        className={`text-xl font-medium transition-opacity ${
                          project.caseStudyPending ? '' : 'group-hover:opacity-70'
                        }`}
                      >
                        {project.title}
                        {project.protected && (
                          <LockKeyhole size={14} className="inline-block ml-2 mb-1 text-muted-foreground" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tags}
                        {project.caseStudyPending && ' · Case study coming soon'}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono shrink-0">{displayYear}</span>
                  </div>
                </>
              );

              if (project.caseStudyPending) {
                return (
                  <div key={project.id} className="block animate-on-scroll opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={project.id}
                  to={`/case-study/${project.id}`}
                  className="group block animate-on-scroll opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {content}
                </Link>
              );
            })}
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
