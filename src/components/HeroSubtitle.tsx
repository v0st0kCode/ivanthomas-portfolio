import React, { useState, useEffect } from 'react';

interface HeroSubtitleProps {
  delay?: number;
  speed?: number;
  onGlobantHover?: () => void;
}

export const HeroSubtitle: React.FC<HeroSubtitleProps> = ({
  delay = 700,
  speed = 18,
  onGlobantHover,
}) => {
  // Two unified paragraphs typed continuously
  const p1_part1 = "Currently at ";
  const p1_part2 = "Globant";
  const p1_part3 = "▸";
  const p1_part4 = ", designing, building and shipping digital solutions through AI-assisted workflows for professional sports tech.";
  
  const paragraph1 = p1_part1 + p1_part2 + p1_part3 + p1_part4;
  const paragraph2 = "Scroll down to check featured case studies ↓";
  
  // Total characters count
  const totalLength = paragraph1.length + paragraph2.length;
  
  const [displayedLength, setDisplayedLength] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (displayedLength < totalLength) {
      // If we just finished paragraph 1, add a natural breath pause (~600ms) before typing paragraph 2
      const isPausePoint = displayedLength === paragraph1.length;
      const baseDelay = isPausePoint ? 600 : speed;
      const charDelay = baseDelay + (Math.random() * 10 - 5);

      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, Math.max(6, charDelay));
      return () => clearTimeout(timer);
    }
  }, [started, displayedLength, totalLength, paragraph1.length, speed]);

  // Breakdown render for paragraph 1
  const renderParagraph1 = () => {
    let len = Math.min(displayedLength, paragraph1.length);

    const s1 = p1_part1.slice(0, len);
    len -= p1_part1.length;

    const s2 = len > 0 ? p1_part2.slice(0, len) : "";
    len -= p1_part2.length;

    const s3 = len > 0 ? p1_part3.slice(0, len) : "";
    len -= p1_part3.length;

    const s4 = len > 0 ? p1_part4.slice(0, len) : "";

    const cursorOnP1 = displayedLength <= paragraph1.length;

    return (
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
        <span>{s1}</span>
        {s2 && (
          <span
            onMouseEnter={onGlobantHover}
            className="inline-block transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            <strong className="font-semibold text-foreground">{s2}</strong>
            {s3 && <span className="text-signal">{s3}</span>}
          </span>
        )}
        {s4 && <span>{s4}</span>}
        {cursorOnP1 && (
          <span
            aria-hidden="true"
            className="inline-block w-[0.52em] h-[1.15em] ml-1 bg-signal align-middle terminal-cursor rounded-[1px]"
          />
        )}
      </p>
    );
  };

  // Breakdown render for paragraph 2
  const renderParagraph2 = () => {
    if (displayedLength <= paragraph1.length) return null;

    const len2 = displayedLength - paragraph1.length;
    const s2 = paragraph2.slice(0, len2);
    const cursorOnP2 = displayedLength > paragraph1.length;

    return (
      <p className="text-xl md:text-2xl text-foreground font-medium max-w-3xl leading-relaxed mt-6">
        <span>{s2}</span>
        {cursorOnP2 && (
          <span
            aria-hidden="true"
            className="inline-block w-[0.52em] h-[1.15em] ml-1 bg-signal align-middle terminal-cursor rounded-[1px]"
          />
        )}
      </p>
    );
  };

  return (
    <div className="min-h-[9rem]">
      {renderParagraph1()}
      {renderParagraph2()}
    </div>
  );
};

export default HeroSubtitle;
