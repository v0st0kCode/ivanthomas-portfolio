import { useEffect } from 'react';

/**
 * Reveals elements with the `.animate-on-scroll` class as they enter the
 * viewport, using IntersectionObserver instead of a `scroll` listener
 * (cheaper — no reflow on every frame).
 */
export function useScrollReveal(deps: React.DependencyList = []) {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -150px 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
