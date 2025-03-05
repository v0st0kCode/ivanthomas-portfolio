
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  featured?: boolean;
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
    id: "financial-app",
    title: "Mediacoach LivePRO",
    description: "Mediacoach LivePRO is the world's first app to deliver real-time pitch data on an iPad.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "iPad App",
    year: "2022",
    featured: true,
    size: "large",
    details: {
      client: "FinTech Startup",
      role: "Lead Product Designer",
      duration: "4 months",
      tools: ["Figma", "Protopie", "After Effects"]
    }
  },
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "Design of a minimalist e-commerce platform with a focus on product photography and intuitive navigation.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Web Design",
    year: "2023",
    featured: true,
    size: "medium",
    details: {
      client: "Retail Brand",
      role: "Senior UX Designer",
      duration: "3 months",
      tools: ["Figma", "Adobe XD", "Principle"]
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
