
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  featured?: boolean;
  protected?: boolean; // New property for protected projects
  details?: {
    client?: string;
    role?: string;
    duration?: string;
    tools?: string[];
  };
  size?: 'large' | 'medium'; // Adding size property for bento grid
}

export const projects: Project[] = [
  {
    id: "sony-app",
    title: "Sony 3D Live Replayer",
    description: "Replays like you never saw before.",
    image: "/Sony3D_bg.png", // Updated path with leading slash for public directory
    category: "iPad App",
    year: "2025",
    featured: true,
    protected: true, // Making this project protected
    size: "large",
    details: {
      client: "Sony",
      role: "Concept Product Designer",
      duration: "4 days",
      tools: ["Figma", "Spline"]
    }
  },
  {
    id: "livepro-app",
    title: "Mediacoach LivePRO",
    description: "Real-time video-analysis iPad app.",
    image: "https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Ftest1-emgndhaqd0c9h2db.a01.azurefd.net%2Fimages%2Fcfa84ae7-802d-459e-8206-bb95f0147022.png",
    category: "iPad App",
    year: "2022-2025",
    featured: true,
    protected: true, // Making this project protected
    size: "large",
    details: {
      client: "LaLiga",
      role: "Lead Product Designer",
      duration: "4 months",
      tools: ["Figma", "Protopie", "Mockups"]
    }
  },  
  {
    id: "portal-app",
    title: "Mediacoach Portal v9",
    description: "Data-driven dashboard for analysts and coaches.",
    image: "/portal_9.jpg",
    category: "Web App",
    year: "2023",
    featured: true,
    protected: true, // Making this project protected
    size: "large",
    details: {
      client: "LaLiga",
      role: "Lead Product Designer",
      duration: "2 months",
      tools: ["Figma", "Protopie", "Mockups"]
    }
  },
  {
    id: "desktop-app",
    title: "Mediacoach Desktop",
    description: "The evolution of the Mediacoach video-analysis tool.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "App Design",
    year: "2022",
    featured: true,
    size: "medium",
    details: {
      client: "LaLiga",
      role: "Senior Product Designer",
      duration: "3 months",
      tools: ["Sketch", "Protopie"]
    }
  },
  {
    id: "digital-workspace",
    title: "Digital Workspace Platform",
    description: "A collaborative workspace platform that helps remote teams stay connected and productive.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Web Application",
    year: "2023",
    featured: true,
    protected: true, // Making this project protected
    size: "medium",
    details: {
      client: "Enterprise SaaS",
      role: "UX Designer & Researcher",
      duration: "5 months",
      tools: ["Figma", "Miro", "UserTesting"]
    }
  }
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
