import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getFeaturedProjects } from '../data/projects';
import { Linkedin, Send, LockKeyhole } from 'lucide-react';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const Index = () => {
  const featuredProjects = getFeaturedProjects();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-52 md:pb-32">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-in">
            <span className="eyebrow-signal mb-6">Senior Product Designer · AI-native</span>
            <h1 className="heading-xl mb-8">
              Designing end-to-end products for two decades — now scaling design
              systems with AI-native workflows.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              I'm Ivan Thomas. I started in code and never really left it. Today I scale the
              design system across a 5-product sports analytics suite used in professional
              football, and build agentic AI workflows — Figma, Jira, Confluence, Claude Code —
              that changed how a 30-person design team works.
            </p>
            <div className="flex items-center space-x-4">
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

      {/* Selected work */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12 animate-on-scroll opacity-0">
            <div>
              <span className="section-title">Selected Work</span>
              <h2 className="heading-lg">Case studies</h2>
            </div>
            <Link to="/work" className="link-hover text-sm font-medium hidden md:inline-block">
              View all work →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/case-study/${project.id}`}
                className="group animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="bleed-image mb-5 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-medium mt-1 group-hover:opacity-70 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">{project.description}</p>
                  </div>
                  {project.protected && (
                    <LockKeyhole size={16} className="text-muted-foreground mt-1 shrink-0" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          <Link to="/work" className="link-hover text-sm font-medium mt-12 inline-block md:hidden">
            View all work →
          </Link>
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
