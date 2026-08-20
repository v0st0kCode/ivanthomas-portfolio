
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
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16">
            <div className="w-full md:w-1/4 mb-10 md:mb-0 animate-fade-in">
              <img
                src="/ivan-thomas.jpg"
                alt="Ivan Thomas"
                className="bleed-image aspect-square object-cover max-w-[240px]"
              />
            </div>

            <div className="w-full md:w-3/4 animate-fade-in">
              <span className="section-title">About Me</span>
              <h1 className="heading-xl mb-10" style={{ animationDelay: '0.1s' }}>
                Senior Product Designer, about two decades in, still shipping code.
              </h1>

              <div className="space-y-6 max-w-2xl" style={{ animationDelay: '0.2s' }}>
                <p className="paragraph">
                  I'm Ivan Thomas, a product designer with about two decades in the industry, and
                  I still write code most weeks. I started as someone who could build what he
                  designed, and that never really changed.
                </p>

                <p className="paragraph">
                  In 2001, in the middle of the first dot-com wave, I founded my own studio,
                  Ekilater. Back then there was no other way to build something: you learned the
                  tools yourself, because half of them didn't have documentation yet. I lived
                  through the shift from Flash to CSS and web standards, and it left me with a
                  bias toward craft and durable fundamentals over whatever tool is trending that
                  year.
                </p>

                <p className="paragraph">
                  Today I'm at Globant, on Sportian Performance, scaling the design system across
                  a 5-product sports analytics suite used in professional football. LivePRO, one
                  of those products, went pitch-side with the USA national team under Mauricio
                  Pochettino during the 2026 World Cup. Alongside that, I build the agentic AI
                  workflows (Jira, Confluence, Figma, Claude Code) that LaLiga and Globant are
                  rolling out at scale, and I train the 30-person design team I work with to use
                  them.
                </p>

                <p className="paragraph">
                  My approach hasn't changed much since 2001. If a design doesn't hold up in
                  production, it isn't finished. I'd rather ship something real and iterate than
                  polish a screen nobody built.
                </p>
              </div>
            </div>
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
