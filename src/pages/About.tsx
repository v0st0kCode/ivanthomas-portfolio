
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

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
      <footer className="py-6">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Ivan Thomas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
