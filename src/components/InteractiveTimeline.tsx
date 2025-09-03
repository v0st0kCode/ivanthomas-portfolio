import React, { useState, useEffect, useRef } from 'react';

interface TimelineEvent {
  year: string;
  items: string[];
  position: { x: number; y: number };
}

const timelineData: TimelineEvent[] = [
  {
    year: '1999',
    items: ['Solohijos.com'],
    position: { x: 30, y: 0 }
  },
  {
    year: '2001',
    items: ['Caixabank', 'Banc Sabadell', 'Generalitat de Catalunya'],
    position: { x: 70, y: 150 }
  },
  {
    year: '2005',
    items: ['AGBAR', 'Applus'],
    position: { x: 25, y: 280 }
  },
  {
    year: '2010',
    items: ['FC Barcelona', 'Yamaha', 'Jorge Lorenzo'],
    position: { x: 15, y: 420 }
  },
  {
    year: '2013',
    items: ['CHH', 'Taschen', 'Gillette', 'Coca-Cola'],
    position: { x: 75, y: 560 }
  },
  {
    year: '2016',
    items: ['JET8', 'Crypto'],
    position: { x: 35, y: 700 }
  },
  {
    year: '2018',
    items: ['Mediapro', 'LaLiga'],
    position: { x: 20, y: 840 }
  },
  {
    year: '2025',
    items: ['Globant', 'OurDNA', 'UEFA', 'Sony', 'Sportian'],
    position: { x: 65, y: 980 }
  }
];

// Fixed floating positions for labels around each year (like the reference image)
const getFloatingPositions = (yearIndex: number) => {
  // Pre-defined organic positions for each year's labels
  const yearPositions = [
    // 1999 - Solohijos.com
    [{ x: -120, y: -30 }],
    
    // 2001 - Caixabank, Banc Sabadell, Generalitat de Catalunya  
    [
      { x: 140, y: -20 },
      { x: -100, y: 30 },
      { x: 120, y: 60 }
    ],
    
    // 2005 - AGBAR, Applus
    [
      { x: -80, y: -40 },
      { x: 100, y: 30 }
    ],
    
    // 2010 - FC Barcelona, Yamaha, Jorge Lorenzo
    [
      { x: -120, y: 50 },
      { x: 90, y: -30 },
      { x: -90, y: -60 }
    ],
    
    // 2013 - CHH, Taschen, Gillette, Coca-Cola
    [
      { x: -90, y: -40 },
      { x: 130, y: -20 },
      { x: -60, y: 50 },
      { x: 110, y: 50 }
    ],
    
    // 2016 - JET8, Crypto
    [
      { x: -80, y: -30 },
      { x: 100, y: 40 }
    ],
    
    // 2018 - Mediapro, LaLiga
    [
      { x: -100, y: 60 },
      { x: 90, y: -30 }
    ],
    
    // 2025 - Globant, OurDNA, UEFA, Sony, Sportian
    [
      { x: -110, y: 60 },
      { x: 120, y: -20 },
      { x: 140, y: 40 },
      { x: -80, y: -40 },
      { x: 80, y: 80 }
    ]
  ];
  
  return yearPositions[yearIndex] || [];
};

const InteractiveTimeline = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [clickedYear, setClickedYear] = useState<string | null>(null);
  const [clickedLabel, setClickedLabel] = useState<string | null>(null);
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
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleClick = (e: MouseEvent) => {
      // Close panels when clicking outside
      const target = e.target as HTMLElement;
      if (!target.closest('.year-badge') && !target.closest('.floating-label')) {
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
      '2005': 'Working with major financial institutions and government entities in Catalonia.',
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

          <div className="relative h-[1200px]">
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
                    y1={`${(current.y / 980) * 100}%`}
                    x2={`${next.x}%`}
                    y2={`${(next.y / 980) * 100}%`}
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
            {timelineData.map((event, eventIndex) => {
              const labelPositions = getFloatingPositions(eventIndex);
              
              return (
                <div
                  key={event.year}
                  className={`absolute transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  style={{
                    left: `${event.position.x}%`,
                    top: `${(event.position.y / 980) * 100}%`,
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

                  {/* Floating Labels */}
                  {event.items.map((item, itemIndex) => {
                    const position = labelPositions[itemIndex];
                    if (!position) return null;
                    
                    return (
                      <div
                        key={itemIndex}
                        className={`floating-label absolute transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
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
                      </div>
                    );
                  })}
                </div>
              );
            })}
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