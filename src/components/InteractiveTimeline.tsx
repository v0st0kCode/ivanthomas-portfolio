import React, { useState, useEffect, useRef } from 'react';

interface TimelineEvent {
  year: string;
  items: string[];
  position: { x: number; y: number };
}

const timelineData: TimelineEvent[] = [
  {
    year: '1999',
    items: [],
    position: { x: 20, y: 0 }
  },
  {
    year: '2001',
    items: ['Banc Sabadell', 'Caixabank', 'Generalitat de Catalunya', 'Applus'],
    position: { x: 80, y: 150 }
  },
  {
    year: '2010',
    items: ['Arai', 'MotoGP', 'FC Barcelona', 'Jorge Lorenzo', 'Yamaha'],
    position: { x: 30, y: 280 }
  },
  {
    year: '2013',
    items: ['CHH', 'Singapore', 'Thailand', 'Taschen', 'Philippines', 'CocaCola', 'Gillette'],
    position: { x: 75, y: 420 }
  },
  {
    year: '2016',
    items: ['JET8', 'Crypto', 'Kraken'],
    position: { x: 15, y: 580 }
  },
  {
    year: '2018',
    items: ['Mediapro', 'LaLiga'],
    position: { x: 70, y: 720 }
  },
  {
    year: '2025',
    items: ['Globant', 'UEFA', 'Sony', 'OurDNA'],
    position: { x: 40, y: 860 }
  }
];

// Orbital positions for labels around each year
const getOrbitalPositions = (itemCount: number, radius: number = 120) => {
  const positions = [];
  const angleStep = (2 * Math.PI) / Math.max(itemCount, 1);
  
  for (let i = 0; i < itemCount; i++) {
    const angle = i * angleStep;
    // Add some randomness to make it more organic
    const radiusVariation = radius + (Math.random() - 0.5) * 40;
    const angleVariation = angle + (Math.random() - 0.5) * 0.8;
    
    positions.push({
      x: Math.cos(angleVariation) * radiusVariation,
      y: Math.sin(angleVariation) * radiusVariation
    });
  }
  return positions;
};

const InteractiveTimeline = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [clickedYear, setClickedYear] = useState<string | null>(null);
  const [clickedLabel, setClickedLabel] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Generate orbital positions for each year's items
  const orbitalPositions = timelineData.map(event => 
    getOrbitalPositions(event.items.length, 100 + Math.random() * 50)
  );

  useEffect(() => {
    // Trigger loading animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleClick = (e: MouseEvent) => {
      // Close panels when clicking outside
      const target = e.target as HTMLElement;
      if (!target.closest('.year-badge') && !target.closest('.orbit-label')) {
        setClickedYear(null);
        setClickedLabel(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleItemHover = (item: string) => {
    setHoveredItem(item);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  const handleYearClick = (year: string) => {
    setClickedYear(clickedYear === year ? null : year);
    setClickedLabel(null);
  };

  const handleLabelClick = (label: string) => {
    setClickedLabel(clickedLabel === label ? null : label);
    setClickedYear(null);
  };

  const getYearDescription = (year: string) => {
    const descriptions: Record<string, string> = {
      '1999': 'The beginning of the .COM bubble era. Everything was changing rapidly in the digital world.',
      '2001': 'Founded Ekilater - Digital Agency. Working with major clients on cutting-edge web technologies.',
      '2010': 'Expanded into sports and entertainment industry, working with world-class brands.',
      '2013': 'International expansion across Asia-Pacific markets, diversifying client portfolio.',
      '2016': 'Entered the cryptocurrency and fintech space during the blockchain revolution.',
      '2018': 'Partnership with major sports media companies, focusing on digital transformation.',
      '2025': 'Current focus on global technology consulting and innovative digital solutions.'
    };
    return descriptions[year] || '';
  };

  return (
    <section className="py-24 bg-background overflow-hidden" ref={timelineRef}>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className={`section-title transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Journey
            </span>
            <h2 className={`heading-lg mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              My Professional Timeline
            </h2>
          </div>

          <div className="relative h-[1000px]">
            {/* Dotted connecting line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {timelineData.map((event, index) => {
                if (index === timelineData.length - 1) return null;
                const current = event.position;
                const next = timelineData[index + 1].position;
                return (
                  <line
                    key={`line-${index}`}
                    x1={`${current.x}%`}
                    y1={`${(current.y / 860) * 100}%`}
                    x2={`${next.x}%`}
                    y2={`${(next.y / 860) * 100}%`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeDasharray="8,8"
                    opacity="0.4"
                    className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
                  />
                );
              })}
            </svg>

            {/* Timeline Events - Floating Years */}
            {timelineData.map((event, eventIndex) => (
              <div
                key={event.year}
                className={`absolute transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                style={{
                  left: `${event.position.x}%`,
                  top: `${(event.position.y / 860) * 100}%`,
                  transitionDelay: `${600 + eventIndex * 150}ms`
                }}
              >
                {/* Year Badge */}
                <div 
                  className="year-badge relative z-20 bg-primary text-primary-foreground px-8 py-4 rounded-full font-mono font-bold text-2xl shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-3xl"
                  onClick={() => handleYearClick(event.year)}
                  onMouseEnter={() => handleItemHover(event.year)}
                  onMouseLeave={handleItemLeave}
                >
                  {event.year}
                </div>

                {/* Orbital Labels */}
                {event.items.length > 0 && event.items.map((item, itemIndex) => {
                  const position = orbitalPositions[eventIndex][itemIndex];
                  return (
                    <div
                      key={itemIndex}
                      className={`orbit-label absolute transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                      style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transitionDelay: `${800 + eventIndex * 100 + itemIndex * 50}ms`
                      }}
                    >
                      <span
                        className="inline-block px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-primary/20 hover:text-primary hover:shadow-lg font-medium"
                        onClick={() => handleLabelClick(item)}
                        onMouseEnter={() => handleItemHover(item)}
                        onMouseLeave={handleItemLeave}
                      >
                        {item}
                      </span>
                      
                      {/* Connecting line to year */}
                      <div 
                        className="absolute w-px bg-primary/20"
                        style={{
                          left: '50%',
                          top: '50%',
                          width: '1px',
                          height: `${Math.sqrt(position.x * position.x + position.y * position.y)}px`,
                          transformOrigin: '0 0',
                          transform: `rotate(${Math.atan2(-position.y, -position.x) * 180 / Math.PI}deg)`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Hover Image Preview */}
        {hoveredItem && (
          <div
            className="fixed pointer-events-none z-40 transition-all duration-200 ease-out"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 50,
            }}
          >
            <div className={`w-24 h-24 rounded-lg shadow-xl overflow-hidden border border-white/20 transition-opacity duration-200 ${hoveredItem ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={`https://images.unsplash.com/photo-1557821552-17105176677c?w=150&h=150&fit=crop&crop=center`}
                alt={`Preview for ${hoveredItem}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Year Text Panel */}
        {clickedYear && (
          <div
            className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
            style={{
              left: mousePosition.x + 30,
              top: mousePosition.y - 60,
            }}
          >
            <div className="bg-background border border-border rounded-lg shadow-2xl p-4 max-w-xs">
              <h4 className="font-bold text-lg mb-2">{clickedYear}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getYearDescription(clickedYear)}
              </p>
            </div>
          </div>
        )}

        {/* Clicked Label Large Image */}
        {clickedLabel && (
          <div
            className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
            style={{
              left: mousePosition.x - 100,
              top: mousePosition.y - 100,
            }}
          >
            <div className="w-48 h-48 rounded-xl shadow-2xl overflow-hidden border-2 border-white/20">
              <img
                src={`https://images.unsplash.com/photo-1557821552-17105176677c?w=300&h=300&fit=crop&crop=center`}
                alt={`Large preview for ${clickedLabel}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <span className="text-white text-sm font-medium p-4 truncate w-full">
                  {clickedLabel}
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