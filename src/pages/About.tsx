
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import InteractiveTimeline from '../components/InteractiveTimeline';

const About = () => {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* About Hero */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:space-x-16">
            <div className="w-full md:w-2/5 mb-10 md:mb-0">
              <div className="sticky top-32">
                <div className="aspect-[3/4] overflow-hidden rounded-lg animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                    alt="Designer Portrait"
                    className="w-full h-full object-cover animate-image-fade-in"
                  />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-3/5">
              <span className="section-title animate-fade-in">About Me</span>
              <h1 className="heading-lg mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Senior Digital Product Designer with 8+ years of experience
              </h1>
              
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <p className="paragraph">
                  I'm a product designer specializing in creating intuitive digital experiences that solve real problems. My approach combines user-centered design methodologies with a keen eye for aesthetics to deliver products that are both functional and beautiful.
                </p>
                
                <p className="paragraph">
                  With experience across various industries including fintech, healthcare, and e-commerce, I've developed a versatile skill set that allows me to tackle diverse design challenges. I believe in the power of design to transform businesses and improve people's lives.
                </p>
                
                <p className="paragraph">
                  My design philosophy is centered on simplicity, clarity, and purpose. I strive to create interfaces that feel effortless and invisible, allowing users to accomplish their goals without unnecessary friction or complexity.
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <InteractiveTimeline />

      <section className="py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:space-x-16">
              <div className="w-full">
                <div className="pb-6 border-b border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <h2 className="heading-md mb-6">Skills & Tools</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Design</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>User Experience (UX) Design</li>
                        <li>User Interface (UI) Design</li>
                        <li>Interaction Design</li>
                        <li>Design Systems</li>
                        <li>Wireframing & Prototyping</li>
                        <li>Visual Design</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Tools</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Figma</li>
                        <li>Adobe XD</li>
                        <li>Sketch</li>
                        <li>Protopie</li>
                        <li>Principle</li>
                        <li>After Effects</li>
                      </ul>
                    </div>
                  </div>
                </div>
              
                <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <h2 className="heading-md mb-6">Education</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Master's in Interaction Design</h3>
                        <span className="text-sm text-muted-foreground">2014—2015</span>
                      </div>
                      <p className="text-muted-foreground">Design University</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Bachelor's in Graphic Design</h3>
                        <span className="text-sm text-muted-foreground">2010—2014</span>
                      </div>
                      <p className="text-muted-foreground">Arts Institute</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-24 bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-title animate-on-scroll opacity-0">Contact</span>
            <h2 className="heading-lg mb-6 animate-on-scroll opacity-0">Let's Work Together</h2>
            <p className="paragraph mx-auto mb-8 animate-on-scroll opacity-0">
              If you're interested in collaborating or would like to discuss a project, feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-on-scroll opacity-0">
              <a 
                href="mailto:contact@example.com" 
                className="px-8 py-4 bg-black text-white rounded-md hover:bg-black/90 transition-colors w-full sm:w-auto"
              >
                contact@example.com
              </a>
              <a 
                href="tel:+1234567890" 
                className="px-8 py-4 border border-black rounded-md hover:bg-black/5 transition-colors w-full sm:w-auto"
              >
                +1 (234) 567-890
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

export default About;
