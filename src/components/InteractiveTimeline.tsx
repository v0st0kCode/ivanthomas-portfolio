import React, { useState, useEffect, useRef } from 'react';

interface TimelineEvent {
  year: string;
  title?: string;
  subtitle?: string;
  items: string[];
}

const timelineData: TimelineEvent[] = [
  {
    year: '1999',
    title: '.COM bubble!',
    subtitle: 'It all starts... .com',
    items: []
  },
  {
    year: '2001',
    title: 'Ekilater - Digital Agency',
    subtitle: 'Dozens of digital projects... Flash, HTML, CSS, PhP, Python',
    items: ['Banc Sabadell', 'Caixabank', 'Generalitat de Catalunya', 'Applus', 'Applus']
  },
  {
    year: '2010',
    items: ['Arai', 'MotoGP', 'FC Barcelona', 'Jorge Lorenzo', 'Yamaha']
  },
  {
    year: '2013',
    items: ['CHH', 'Singapore', 'Thailand', 'Taschen', 'Philippines', 'CocaCola', 'Gillette']
  },
  {
    year: '2016',
    items: ['JET8', 'Crypto', 'Kraken']
  },
  {
    year: '2018',
    items: ['Mediapro', 'LaLiga']
  },
  {
    year: '2025',
    items: ['Globant', 'UEFA', 'Sony', 'OurDNA']
  }
];

const InteractiveTimeline = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger loading animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    if (hoveredItem && timelineRef.current) {
      timelineRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [hoveredItem]);

  const handleItemHover = (item: string) => {
    setHoveredItem(item);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  return (
    <section className="py-24 bg-background" ref={timelineRef}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-title transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Journey
            </span>
            <h2 className={`heading-lg mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              My Professional Timeline
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20 transition-all duration-1000 delay-300 ${isLoaded ? 'h-full opacity-100' : 'h-0 opacity-0'}`} />

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineData.map((event, index) => (
                <div
                  key={event.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  {/* Year Badge */}
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="relative z-10 bg-primary text-primary-foreground px-6 py-3 rounded-full font-mono font-bold text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                         onMouseEnter={() => handleItemHover(event.year)}
                         onMouseLeave={handleItemLeave}>
                      {event.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:flex-1 md:ml-8 pl-12 md:pl-0">
                    {event.title && (
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                          onMouseEnter={() => handleItemHover(event.title!)}
                          onMouseLeave={handleItemLeave}>
                        {event.title}
                      </h3>
                    )}
                    
                    {event.subtitle && (
                      <p className="text-muted-foreground mb-4 italic">
                        {event.subtitle}
                      </p>
                    )}

                    {event.items.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {event.items.map((item, itemIndex) => (
                          <span
                            key={itemIndex}
                            className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer transform hover:scale-105 font-medium"
                            onMouseEnter={() => handleItemHover(item)}
                            onMouseLeave={handleItemLeave}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Image */}
        {hoveredItem && (
          <div
            className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 50,
              transform: hoveredItem ? 'translate(0, 0) scale(1)' : 'translate(-20px, 10px) scale(0.9)'
            }}
          >
            <div className={`w-32 h-32 rounded-lg shadow-2xl overflow-hidden border-2 border-white transition-opacity duration-300 ${hoveredItem ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={`https://images.unsplash.com/photo-1557821552-17105176677c?w=200&h=200&fit=crop&crop=center`}
                alt={`Preview for ${hoveredItem}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <span className="text-white text-xs font-medium p-2 truncate w-full">
                  {hoveredItem}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveTimeline;