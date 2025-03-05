
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
    title: "Financial App Redesign",
    description: "Complete UX/UI overhaul of a financial management application, focusing on simplicity and clear data visualization.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Mobile App",
    year: "2023",
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
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
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
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
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
