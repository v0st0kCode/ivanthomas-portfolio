
import React from 'react';
import Navbar from '../components/Navbar';
import { useScrollReveal } from '../hooks/use-scroll-reveal';

const About = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* About Hero — single column, ref: arpeg.work/bio-2026 (simplicity), educabellos.com/en/about-me (structure) */}
      <section className="pt-40 pb-24">
        <div className="container-custom max-w-3xl">
          <span className="section-title animate-fade-in">About Me</span>
          <h1 className="heading-xl mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Senior Product Designer, about two decades in, still shipping code.
          </h1>

          <img
            src="/ivan-thomas.jpg"
            alt="Ivan Thomas"
            className="bleed-image aspect-square object-cover w-40 mb-10 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          />

          <div
            className="aspect-video bg-secondary flex items-center justify-center mb-10 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <p className="text-xs text-muted-foreground">Process photography — pending</p>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <p className="paragraph">
              Every project starts on paper for me, not on screen. I sketch flows and rough
              layouts by hand before I open Figma. It forces me to solve the structure of a
              problem before I fall in love with how a screen looks.
            </p>

            <p className="paragraph">
              I'm user-first by default, not by process. If a decision helps the roadmap but
              hurts the person actually clicking the button, the roadmap loses. I'd rather ship
              something a little rougher that works the way people expect than something polished
              that fights them.
            </p>

            <p className="paragraph">
              That instinct goes back to when I ran my own studio, Ekilater, in the early 2000s.
              Nobody documented anything back then, so you learned by building things and watching
              people struggle with what you built. It left me with a bias toward craft over
              whatever tool is fashionable that year, and toward watching how something gets used
              over how it looks in a deck.
            </p>

            <p className="paragraph">
              That's still how I work today, on bigger and more regulated products: sketch first,
              test with the people who'll actually use it, then let it become a polished
              interface.
            </p>
          </div>
        </div>
      </section>

      {/* Experience — ref: educabellos.com/en/about-me (headline + table), billysweeney.com */}
      <section className="pb-24">
        <div className="container-custom">
          <h2 className="heading-lg mb-12 max-w-3xl animate-on-scroll opacity-0">
            20+ years building products, teams, and systems.
          </h2>

          <div className="max-w-4xl animate-on-scroll opacity-0">
            {[
              { years: '2025—Present', company: 'Globant (Sportian Performance)', role: 'Senior Product Designer' },
              { years: '2019—2025', company: 'Grupo Mediapro', role: 'Senior Digital Product Designer (UX/UI)' },
              { years: '2013—2018', company: 'JET8', role: 'Head of Product' },
              { years: '2013—2015', company: 'CHH — Creative HotHouse', role: 'UI/UX Lead' },
              { years: '2001—2013', company: 'Ekilater', role: 'Owner, Product & Digital Business Strategy' },
              { years: '2009—2010', company: 'Jorge Lorenzo', role: 'CPO and Lead Designer' },
              { years: '1999—2000', company: 'Solohijos.com', role: 'Webdesigner and Front-end Developer' },
            ].map((entry) => (
              <div
                key={entry.years}
                className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-5 border-b border-border text-sm md:text-base"
              >
                <span className="text-muted-foreground font-mono">{entry.years}</span>
                <span>{entry.company}</span>
                <span className="text-muted-foreground sm:text-foreground">{entry.role}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-10 animate-on-scroll opacity-0">
            <a href="mailto:hello@ivanthomas.pro" className="pill hover:bg-secondary transition-colors">
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/ivanthomasgarces/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill hover:bg-secondary transition-colors"
            >
              LinkedIn
            </a>
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
