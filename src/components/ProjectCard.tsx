import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

/**
 * Full-bleed, two-panel project card — solid color panel (left) + layered
 * visual panel (right: background image, giant client-name marquee, browser
 * window mockup). The mockup tilts toward the cursor on hover.
 *
 * Ref: Ivan's Figma redesign (21 ago 2026), interaction concept borrowed
 * loosely from https://experiments.thisiswhitespace.com/dot-sphere-card
 * (idea only — "hover activates depth", not the 3D complexity).
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const mockupRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = mockupRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'transform 0.1s ease-out';
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const el = mockupRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  const title = project.cardTitle ?? project.title;
  const description = project.cardDescription ?? project.description;
  const tags = (project.cardTags ?? project.details?.tools ?? []).join(', ');
  const color = project.cardColor ?? '#EAEAE5';
  const org = project.cardOrg ?? project.title;

  const cardContent = (
    <div
      className="group relative mx-[calc(50%-50vw)] w-screen flex flex-col md:flex-row md:aspect-[2.35/1] animate-on-scroll opacity-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left — solid color panel */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 py-16"
        style={{ backgroundColor: color }}
      >
        <span className="text-xs uppercase tracking-wider text-black/60 font-mono">{tags}</span>
        <div>
          <h3 className="heading-lg text-black mb-4 max-w-lg">{title}</h3>
          <p className="text-black/70 leading-relaxed max-w-md mb-8">{description}</p>
          <span className="card-cta-button">
            {project.caseStudyPending ? 'Case Study Coming Soon' : 'View Case Study'}
            <span className="card-cta-arrow">→</span>
          </span>
        </div>
      </div>

      {/* Right — layered visual panel */}
      <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-[#0A0D12]">
        {/* Layer 1: background image — placeholder (blurred reuse of the mockup asset
            until Ivan provides real background photography/video). Swap this <img>
            for a <video autoPlay muted loop playsInline> once that asset exists. */}
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-40"
        />

        {/* Layer 2: giant client name, marquee on hover */}
        <div className="marquee-mask absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none">
          <div className="marquee-track text-[16vw] md:text-[6vw] font-display font-bold text-white/15 leading-none whitespace-nowrap py-2">
            <span className="mr-12">{org}</span>
            <span className="mr-12">{org}</span>
            <span className="mr-12">{org}</span>
          </div>
        </div>

        {/* Layer 3: browser-window mockup — tilts toward the cursor */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
          <div
            ref={mockupRef}
            className="w-full rounded-lg overflow-hidden shadow-2xl bg-[#12161D] ring-1 ring-white/10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <img src={project.image} alt={title} className="w-full h-auto block" />
          </div>
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
