
import React from 'react';
import Navbar from '../components/Navbar';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const About = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* About Hero */}
      <section className="pt-40 pb-24">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-in">
            <span className="section-title">About Me</span>
            <h1 className="heading-xl mb-10" style={{ animationDelay: '0.1s' }}>
              Senior Product Designer, ~20 years in, still shipping code.
            </h1>

            <div className="space-y-6" style={{ animationDelay: '0.2s' }}>
              <p className="paragraph">
                I'm Ivan Thomas — born in Barcelona, based in Valencia, working remote. I started
                as a designer who could code, and two decades later that's still the shape of my
                work: I design end-to-end, not just the screens.
              </p>

              <p className="paragraph">
                Today I'm at Globant, on Sportian Performance, where I scale the design system
                across a 5-product sports analytics suite used in LaLiga — and build agentic AI
                workflows (Jira, Confluence, Figma, Claude Code) that changed how a 30-person
                design team works day to day. Before that: Mediapro, BMW, FC Barcelona,
                CaixaBank, Taschen, Banc Sabadell, Generalitat de Catalunya. I also teach at
                KSchool.
              </p>

              <p className="paragraph">
                My philosophy is simple: design that doesn't hold up in production isn't design,
                it's a mockup. I'd rather ship something real and iterate than perfect a screen
                nobody built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-title animate-on-scroll opacity-0">Contact</span>
            <h2 className="heading-lg mb-6 animate-on-scroll opacity-0">Let's Work Together</h2>
            <p className="paragraph mx-auto mb-8 animate-on-scroll opacity-0">
              If you're interested in collaborating or would like to discuss a role, feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-on-scroll opacity-0">
              <a
                href="mailto:hello@ivanthomas.pro"
                className="px-8 py-4 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors w-full sm:w-auto"
              >
                hello@ivanthomas.pro
              </a>
              <a
                href="https://www.linkedin.com/in/ivanthomasgarces/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-foreground rounded-md hover:bg-foreground/5 transition-colors w-full sm:w-auto"
              >
                LinkedIn
              </a>
            </div>
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

export default About;
