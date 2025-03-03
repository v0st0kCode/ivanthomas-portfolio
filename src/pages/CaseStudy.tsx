
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProjectById, projects } from '../data/projects';

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  
  // Redirect to Work page if project not found
  useEffect(() => {
    if (!project && id) {
      navigate('/work');
    }
  }, [project, id, navigate]);
  
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
  
  // Find current project index
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];
  
  if (!project) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Case Study Hero */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <Link 
            to="/work" 
            className="inline-flex items-center space-x-2 mb-12 text-muted-foreground hover:text-black transition-colors animate-fade-in"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Work</span>
          </Link>
          
          <div className="mb-12">
            <span className="section-title animate-fade-in">{project.category}</span>
            <h1 className="heading-lg mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {project.title}
            </h1>
            <p className="paragraph max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {project.description}
            </p>
          </div>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {project.details?.client && (
              <div>
                <h3 className="text-sm font-medium uppercase mb-2">Client</h3>
                <p className="text-muted-foreground">{project.details.client}</p>
              </div>
            )}
            
            {project.details?.role && (
              <div>
                <h3 className="text-sm font-medium uppercase mb-2">Role</h3>
                <p className="text-muted-foreground">{project.details.role}</p>
              </div>
            )}
            
            {project.details?.duration && (
              <div>
                <h3 className="text-sm font-medium uppercase mb-2">Duration</h3>
                <p className="text-muted-foreground">{project.details.duration}</p>
              </div>
            )}
            
            {project.details?.tools && (
              <div>
                <h3 className="text-sm font-medium uppercase mb-2">Tools</h3>
                <p className="text-muted-foreground">{project.details.tools.join(', ')}</p>
              </div>
            )}
          </div>
          
          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden mb-24 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-auto animate-image-fade-in"
            />
          </div>
          
          {/* Case Study Content */}
          <div className="max-w-4xl mx-auto">
            <div className="animate-on-scroll opacity-0">
              <h2 className="heading-md mb-6">Overview</h2>
              <p className="paragraph mb-12">
                This project aimed to redesign a {project.category.toLowerCase()} to improve user experience and drive engagement. The client wanted a clean, modern aesthetic that would appeal to their target audience while making the interface more intuitive and efficient.
              </p>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h2 className="heading-md mb-6">Challenge</h2>
              <p className="paragraph mb-12">
                The main challenge was to balance aesthetic considerations with functionality, ensuring that the design not only looked good but also served the users' needs effectively. We needed to simplify complex workflows while maintaining all necessary features and capabilities.
              </p>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h2 className="heading-md mb-6">Process</h2>
              <div className="space-y-6 mb-12">
                <p className="paragraph">
                  The design process began with extensive user research to understand pain points and opportunities. I conducted interviews with key stakeholders and analyzed user feedback to identify critical issues that needed to be addressed.
                </p>
                <p className="paragraph">
                  Next, I created wireframes and low-fidelity prototypes to explore different approaches to the interface design. After several iterations and feedback sessions, I developed high-fidelity mockups that reflected the agreed-upon direction.
                </p>
                <p className="paragraph">
                  Throughout the process, I worked closely with developers to ensure that the design was technically feasible and could be implemented efficiently. Regular usability testing helped refine the design and address any issues before final implementation.
                </p>
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h2 className="heading-md mb-6">Solution</h2>
              <p className="paragraph mb-12">
                The final design featured a clean, minimalist interface with intuitive navigation and clear visual hierarchy. Key information was made more accessible, and common actions were streamlined to reduce friction. The new design maintained brand consistency while introducing modern design elements that enhanced the overall aesthetic.
              </p>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h2 className="heading-md mb-6">Results</h2>
              <p className="paragraph mb-12">
                The redesigned {project.category.toLowerCase()} was well-received by users and stakeholders alike. Analytics showed a significant improvement in user engagement and task completion rates. The client reported positive feedback from their customers, and the new design helped establish a stronger brand identity in the market.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Next Project Section */}
      <section className="py-24 bg-secondary">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link 
              to={`/case-study/${prevProject.id}`} 
              className="flex items-center space-x-4 mb-8 md:mb-0 hover:opacity-80 transition-opacity animate-on-scroll opacity-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <span className="block text-xs text-muted-foreground mb-1">Previous Project</span>
                <span className="font-medium">{prevProject.title}</span>
              </div>
            </Link>
            
            <Link 
              to={`/case-study/${nextProject.id}`} 
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity animate-on-scroll opacity-0"
            >
              <div className="text-right">
                <span className="block text-xs text-muted-foreground mb-1">Next Project</span>
                <span className="font-medium">{nextProject.title}</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
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

export default CaseStudy;
