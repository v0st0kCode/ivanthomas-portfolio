import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import AsciiCardOverlay from './AsciiCardOverlay';

interface ProjectCardProps {
  project: Project;
  index?: number; // even/odd alternates which side holds the content vs the visual
}

// Hides the floating browser/iPad mockup on every card (both the mobile in-flow
// version and the desktop floating one). Checked against the code: currently
// EVERY project rendered through ProjectCard shows a device mockup — there's no
// per-project condition — so this is the one flag that covers all of them.
// Reversible: flip back to true to bring the mockup back everywhere at once.
// Wireframes/prototypes will show on the case study page instead.
const SHOW_DEVICE_MOCKUP = false;

// Glassmorphism header — semi-transparent + backdrop-blur, per Ivan's reference
// (the solid #F2F2F2 bar was a placeholder). Needs its parent to be transparent
// for the blur to actually pick up whatever sits behind the floating card.
// Uses .mockup-glass (index.css) so the iPad frame below can share the exact
// same material, byte-for-byte, with no room for the two to drift apart.
const BrowserChrome: React.FC = () => (
  <div className="mockup-glass flex items-center gap-1.5 px-3 py-2.5">
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
// Camera: on the SHORT edge (right), like a real iPad rotated into landscape —
// not centered on the top edge.
// Material: .mockup-glass — same class as BrowserChrome, guaranteed identical.
const IPadFrame: React.FC<{ image: string; alt: string }> = ({ image, alt }) => (
  <div className="mockup-glass relative w-full h-full rounded-[32px] ring-1 ring-black/10 p-3 lg:p-4">
    <span className="absolute right-1.5 lg:right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/60 ring-1 ring-white/20" />
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
  // ASCII (RFEF test, `cardAscii`): the ASCII-rendered image IS the card's
  // background now (rights-friendly — the original photo never ships).
  // Always mounted for ascii cards. mouseRef shares cursor position (-0.5..0.5)
  // with the overlay's 3D plane WITHOUT re-rendering React per mousemove.
  // hoveredRef drives the hover crossfade to the video plane (also ref-only).
  const asciiMouseRef = useRef({ x: 0, y: 0 });
  const asciiHoveredRef = useRef(false);
  const reversed = index % 2 === 1;
  const isIPad = project.cardPlatform === 'iPadOS';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = mockupRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    asciiMouseRef.current = { x, y };
    asciiHoveredRef.current = true;
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const el = mockupRef.current;
    if (!el) return;
    asciiMouseRef.current = { x: 0, y: 0 };
    asciiHoveredRef.current = false;
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
          which side it's on rather than always hugging the left edge.
          ALIGNMENT: the TEXT aligns with the page's shared grid (same rule as
          container-custom: max-w-[1280px] centered → offset =
          max(50vw - 640px, px-4/md:px-6)), while the color panel itself keeps
          bleeding to the viewport edge. Same trick the full-bleed card uses for
          its own centering (mx-[calc(50%-50vw)]), inverted: pull the content
          in from the edge by the container's distance to the viewport center.
          Vertical padding stays as-is (p-8/md:p-16 top+bottom only). */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center gap-8 pt-8 pb-8 md:pt-16 md:pb-16 ${
          reversed ? 'md:items-end md:pr-[max(16px,calc(50vw-640px))]' : 'md:pl-[max(16px,calc(50vw-640px))]'
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
        {/* Layer 1: background image — for ascii cards it only shows as a brief
            fallback while the three.js texture loads (and in browsers without
            WebGL); the ASCII render (Layer 1.5) covers it permanently. */}
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layer 1.5: ASCII video background (RFEF test) — the video is the
            texture; paused (frozen frame) at rest, plays on hover. The bg
            image shows through while the video loads / without WebGL.
            Under the marquee (Layer 2, z-[2]) and the device mockup (z-10). */}
        {project.cardAscii && project.cardAsciiVideo && (
          <AsciiCardOverlay
            video={project.cardAsciiVideo}
            mouseRef={asciiMouseRef}
            hoveredRef={asciiHoveredRef}
          />
        )}

        {/* Layer 2: giant client name, marquee on hover — bleeds off the card's
            bottom edge (cropped by the panel's own overflow-hidden), 2.5x the
            original size per Ivan's reference. */}
        <div className="marquee-mask absolute inset-x-0 -bottom-[6%] z-[2] overflow-hidden pointer-events-none">
          <div className="marquee-track text-[40vw] md:text-[15vw] font-display font-bold text-white/15 leading-none whitespace-nowrap">
            <span className="mr-12">{org}</span>
            <span className="mr-12">{org}</span>
            <span className="mr-12">{org}</span>
          </div>
        </div>

        {/* Mobile: device mockup, in-flow (no float/tilt — not meaningful on touch) */}
        {SHOW_DEVICE_MOCKUP && (
          <div className="md:hidden absolute inset-0 flex items-center justify-center p-8">
            <div className={`w-full shadow-2xl ${isIPad ? 'aspect-[4/3]' : 'aspect-video'}`}>{deviceFrame}</div>
          </div>
        )}
      </div>

      {/* Device mockup — fixed pixel size per breakpoint (not fluid/vw-scaled),
          floats over the visual panel, invading whichever side it's on. Width
          matches the browser mockup exactly (500px md-only, 750px from lg) —
          height differs by device: browser stays 16:9 (281/422px), iPad uses its
          real landscape ratio (1366×1024 ≈ 4:3 → 375/562px), taller than the
          browser rather than forcing both to match height. On hover it grows
          another 5% (scale 1.05, combined with the tilt below, eased in slowly —
          see handleMouseMove/Leave) and gets a heavier elevation shadow that grows
          from the same shadow family rather than popping in.
          Positioning: anchored a FIXED px distance from the panel boundary (50%),
          not a % of the full card width — a %-based offset grows with viewport
          width and, at large sizes, pushed the mockup so far into the color panel
          that it covered the title. A fixed px overlap keeps it mostly on the
          visual side regardless of screen width.
          BUG FIX (causing page-wide horizontal scroll on 768–~1400px viewports):
          `calc(50% - 60px)` alone doesn't account for the mockup's own width, so
          its far edge could land past the card's own edge — off-screen — at
          in-between viewport widths where the mockup (500/750px) is wide relative
          to the available half-card space. Wrapped in min() per breakpoint so the
          offset never pushes the mockup beyond the card bounds, while still using
          the intended 60px overlap whenever there's room for it. */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none ${
          reversed
            ? 'right-[min(calc(50%-60px),calc(100%-500px))] lg:right-[min(calc(50%-60px),calc(100%-750px))]'
            : 'left-[min(calc(50%-60px),calc(100%-500px))] lg:left-[min(calc(50%-60px),calc(100%-750px))]'
        }`}
      >
        {/* Kept mounted even when hidden — mockupRef also gates the ASCII
            overlay's mouse tracking (see handleMouseMove's early `if (!el)
            return`), so unmounting this would silently break that hover
            interaction too. Just strip its visible frame/shadow instead. */}
        <div
          ref={mockupRef}
          className={`w-[500px] lg:w-[750px] ${isIPad ? 'h-[375px] lg:h-[562px]' : 'h-[281px] lg:h-[422px]'} ${
            SHOW_DEVICE_MOCKUP
              ? `shadow-[0_20px_35px_-20px_rgba(0,0,0,0.15)]
                 transition-[box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                 group-hover:duration-[400ms] group-hover:shadow-[0_80px_140px_-30px_rgba(0,0,0,0.35)]`
              : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {SHOW_DEVICE_MOCKUP && deviceFrame}
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
