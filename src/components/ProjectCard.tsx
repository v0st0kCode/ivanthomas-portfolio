import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number; // even/odd alternates which side holds the content vs the visual
}

// Glassmorphism header — semi-transparent + backdrop-blur, per Ivan's reference
// (the solid #F2F2F2 bar was a placeholder). Needs its parent to be transparent
// for the blur to actually pick up whatever sits behind the floating card.
const BrowserChrome: React.FC = () => (
  <div className="flex items-center gap-1.5 px-3 py-2.5 bg-white/40 backdrop-blur-md">
    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
  </div>
);

// WebApp mockup — empty browser window (no screenshot inside, per Ivan's reference).
const BrowserFrame: React.FC = () => (
  <div className="w-full h-full rounded-lg overflow-hidden ring-1 ring-black/10 flex flex-col">
    <BrowserChrome />
    <div className="bg-white flex-1" />
  </div>
);

// iPadOS mockup — minimal iPad Pro frame (thin bezel, rounded corners, a single
// dot for the front camera — nothing more skeuomorphic than that), landscape,
// framing the actual project screenshot inside (unlike the empty browser).
// Bezel: same width on all 4 sides (a real iPad Pro's margins are symmetric) —
// the camera dot is absolutely positioned inside that margin instead of adding
// its own row, which would've made the top margin taller than the others.
// Material: same glass treatment as the browser's chrome bar (bg-white/40 +
// backdrop-blur), not a solid dark color, per Ivan's reference.
const IPadFrame: React.FC<{ image: string; alt: string }> = ({ image, alt }) => (
  <div className="relative w-full h-full rounded-[32px] bg-white/40 backdrop-blur-md ring-1 ring-black/10 p-3 lg:p-4">
    <span className="absolute top-1.5 lg:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/60 ring-1 ring-white/20" />
    <div className="w-full h-full rounded-[16px] overflow-hidden bg-black">
      <img src={image} alt={alt} className="w-full h-full object-cover" />
    </div>
  </div>
);

/**
 * Full-bleed, two-panel project card — solid color panel + layered visual
 * panel (background image, giant client-name marquee). A device mockup floats
 * over the boundary between the two panels and tilts toward the cursor on
 * hover — a browser window for WebApp projects, an iPad Pro frame for iPadOS
 * ones (same size/position/hover/shadow rules either way, only the frame
 * itself changes).
 *
 * Ref: Ivan's Figma redesign (21 ago 2026), interaction concept borrowed
 * loosely from https://experiments.thisiswhitespace.com/dot-sphere-card
 * (idea only — "hover activates depth", not the 3D complexity).
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const reversed = index % 2 === 1;
  const isIPad = project.cardPlatform === 'iPadOS';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = mockupRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const el = mockupRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  const title = project.cardTitle ?? project.title;
  const description = project.cardDescription ?? project.description;
  const tags = (project.cardTags ?? project.details?.tools ?? []).join(', ');
  const color = project.cardColor ?? '#EAEAE5';
  const org = project.cardOrg ?? project.title;
  const isLight = project.cardTextColor !== 'white';
  const textColor = isLight ? 'text-black' : 'text-white';
  const mutedTextColor = isLight ? 'text-black/70' : 'text-white/70';
  const tagColor = isLight ? 'text-black/60' : 'text-white/60';
  const buttonBorder = isLight ? 'border-black/70 hover:bg-black hover:text-white' : 'border-white/70 hover:bg-white hover:text-black';
  // Background image — placeholder blur of the case-study mockup until Ivan provides
  // dedicated background photography/video for every project. Swap `<img>` for
  // `<video autoPlay muted loop playsInline>` once a real asset exists.
  const bgImage = project.cardBgImage ?? project.image;

  const deviceFrame = isIPad ? <IPadFrame image={project.image} alt={title} /> : <BrowserFrame />;

  const cardContent = (
    <div
      className={`group relative mx-[calc(50%-50vw)] w-screen flex flex-col ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } md:aspect-[2.35/1] animate-on-scroll opacity-0`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Solid color panel — content. When the visual panel is on the left
          (reversed), align content to the right so it reads consistently with
          which side it's on rather than always hugging the left edge. */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 py-16 ${
          reversed ? 'md:items-end' : ''
        }`}
        style={{ backgroundColor: color }}
      >
        <span className={`text-xs uppercase tracking-wider font-mono ${tagColor} ${reversed ? 'md:text-right' : ''}`}>
          {tags}
        </span>
        <div className={reversed ? 'md:text-right' : ''}>
          <h3 className={`heading-lg mb-4 max-w-lg ${textColor} ${reversed ? 'md:ml-auto' : ''}`}>{title}</h3>
          <p className={`leading-relaxed max-w-md mb-8 ${mutedTextColor} ${reversed ? 'md:ml-auto' : ''}`}>{description}</p>
          <span className={`card-cta-button ${buttonBorder}`}>
            {project.caseStudyPending ? 'Case Study Coming Soon' : 'View Case Study'} →
          </span>
        </div>
      </div>

      {/* Layered visual panel */}
      <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-[#0A0D12]">
        {/* Layer 1: background image */}
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layer 2: giant client name, marquee on hover — bleeds off the card's
            bottom edge (cropped by the panel's own overflow-hidden), 2.5x the
            original size per Ivan's reference. */}
        <div className="marquee-mask absolute inset-x-0 -bottom-[6%] overflow-hidden pointer-events-none">
          <div className="marquee-track text-[40vw] md:text-[15vw] font-display font-bold text-white/15 leading-none whitespace-nowrap">
            <span className="mr-12">{org}</span>
            <span className="mr-12">{org}</span>
            <span className="mr-12">{org}</span>
          </div>
        </div>

        {/* Mobile: device mockup, in-flow (no float/tilt — not meaningful on touch) */}
        <div className="md:hidden absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full aspect-video shadow-2xl">{deviceFrame}</div>
        </div>
      </div>

      {/* Device mockup — fixed pixel size per breakpoint (not fluid/vw-scaled),
          floats over the visual panel, invading whichever side it's on. Base size
          500x281 on md-only (768–1023px), 750x422 from lg (1024px) up — same 16:9,
          scaled down 25% from the original 1000x562 double: at full double size the
          fixed-px offset alone wasn't enough to keep the mockup clear of the title
          on every viewport, so per Ivan/team-lead's priority ("se vea bien
          proporcionado antes que mantener el tamaño doblado a toda costa") the size
          is reduced instead of pushing the offset to an extreme. On hover it grows
          another 5% (scale 1.05, combined with the tilt below, eased in slowly —
          see handleMouseMove/Leave) and gets a heavier elevation shadow that grows
          from the same shadow family rather than popping in.
          Positioning: anchored a FIXED px distance from the panel boundary (50%),
          not a % of the full card width — a %-based offset grows with viewport
          width and, at large sizes, pushed the mockup so far into the color panel
          that it covered the title. A fixed px overlap keeps it mostly on the
          visual side regardless of screen width. */}
      <div
        className="hidden md:block absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ [reversed ? 'right' : 'left']: 'calc(50% - 60px)' }}
      >
        <div
          ref={mockupRef}
          className="w-[500px] h-[281px] lg:w-[750px] lg:h-[422px]
                     shadow-[0_20px_35px_-20px_rgba(0,0,0,0.15)]
                     transition-[box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover:duration-[400ms] group-hover:shadow-[0_80px_140px_-30px_rgba(0,0,0,0.35)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {deviceFrame}
        </div>
      </div>
    </div>
  );

  if (project.caseStudyPending) {
    return <div>{cardContent}</div>;
  }

  return (
    <Link to={`/case-study/${project.id}`} className="block">
      {cardContent}
    </Link>
  );
};

export default ProjectCard;
