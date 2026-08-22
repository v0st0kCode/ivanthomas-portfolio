import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import HeroSubtitle from '../components/HeroSubtitle';
import MatrixRabbit from '../components/MatrixRabbit';
import { getFeaturedProjects } from '../data/projects';

/**
 * Paged Fullscreen Presentation Slider for Home
 * Slide 0: Hero (100vh centered)
 * Slide 1..N: Full-bleed Project Cards (centered in viewport)
 * Slide N+1: Footer
 */
const Index = () => {
  const featuredProjects = getFeaturedProjects();
  const [rabbitActive, setRabbitActive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Total slides: Slide 0 (Hero) + Featured Cards + 1 (Footer)
  const totalSlides = 1 + featuredProjects.length + 1;
  const footerIndex = totalSlides - 1;

  const goToSlide = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= totalSlides || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentSlide(nextIndex);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 750);
  }, [totalSlides]);

  // Wheel listener with threshold & cooldown
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Ignore horizontal / micro tracks
      if (Math.abs(e.deltaY) < 25 || isTransitioningRef.current) return;

      if (e.deltaY > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartYRef.current - touchEndY;
      if (Math.abs(diff) > 50 && !isTransitioningRef.current) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, goToSlide]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative select-none">
      <Navbar onLogoClick={() => goToSlide(0)} />
      <MatrixRabbit active={rabbitActive} onDone={() => setRabbitActive(false)} />

      {/* Slide 0: Hero */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === 0
            ? 'opacity-100 filter-none translate-y-0 pointer-events-auto z-20'
            : 'opacity-0 blur-md -translate-y-12 pointer-events-none z-0'
        }`}
      >
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.05] tracking-[-0.03em] mb-8 hero-appear-blur">
              Hey! It's Ivan here! I'm a hands-on multidisciplinary designer who's been
              crafting end-to-end products for two decades.
            </h1>
            <HeroSubtitle
              delay={700}
              speed={18}
              onGlobantHover={() => setRabbitActive(true)}
            />
          </div>
        </div>
      </div>

      {/* Slides 1..N: Full-bleed Project Cards */}
      {featuredProjects.map((project, index) => {
        const slideIndex = index + 1;
        const isCurrent = currentSlide === slideIndex;
        const isPast = currentSlide > slideIndex;

        return (
          <div
            key={project.id}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCurrent
                ? 'opacity-100 filter-none translate-y-0 pointer-events-auto z-20'
                : isPast
                ? 'opacity-0 blur-md -translate-y-16 pointer-events-none z-0'
                : 'opacity-0 blur-md translate-y-16 pointer-events-none z-0'
            }`}
          >
            <div className="w-full">
              <ProjectCard project={project} index={index} />
            </div>
          </div>
        );
      })}

      {/* Slide N+1: Outro / Contact (Gallery / Poster style) */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          currentSlide === footerIndex
            ? 'opacity-100 filter-none translate-y-0 pointer-events-auto z-20'
            : currentSlide < footerIndex
            ? 'opacity-0 blur-md translate-y-16 pointer-events-none z-0'
            : 'opacity-0 pointer-events-none z-0'
        }`}
      >
        {/* Centered Editorial Message */}
        <div className="container-custom text-center max-w-4xl my-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.05] tracking-[-0.03em] mb-8">
            Let's build something together.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            I'm always open to discussing new projects, high-impact design challenges or AI-assisted product workflows.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:hello@ivanthomas.pro"
              className="card-cta-button text-base px-8 py-4 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              hello@ivanthomas.pro →
            </a>
          </div>
        </div>

        {/* Minimal Meta-Bar anchored at bottom of screen (Asta Sans) */}
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 xl:px-0 pb-6 flex flex-col sm:flex-row justify-between items-center text-sm font-sans tracking-tight text-muted-foreground">
          <p className="mb-2 sm:mb-0">
            © {new Date().getFullYear()} Ivan Thomas · All rights reserved
          </p>
          <div className="flex space-x-6">
            <a
              href="https://write.ivanthomas.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Today's Signals ↗
            </a>
            <a
              href="https://www.linkedin.com/in/ivanthomasgarces/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
