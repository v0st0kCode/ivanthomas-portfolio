
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
  size?: 'large' | 'medium';
  clientName?: string; // Adding clientName for display on cards
}

export const projects: Project[] = [
  {
    id: "boxed-water",
    title: "Boxed Water is Better",
    description: "Brand identity and packaging design for an eco-friendly water company.",
    image: "/lovable-uploads/bf06704c-28d1-4696-a123-cb87c18ca555.png",
    category: "Brand Design",
    year: "2023",
    featured: true,
    size: "large",
    clientName: "Atica",
    details: {
      client: "Boxed Water Inc.",
      role: "Lead Brand Designer",
      duration: "3 months",
      tools: ["Photoshop", "Illustrator", "InDesign"]
    }
  },
  {
    id: "next-step",
    title: "Next Step",
    description: "Strategic brand positioning and visual identity for a premium footwear line.",
    image: "/lovable-uploads/bf06704c-28d1-4696-a123-cb87c18ca555.png",
    category: "Brand Strategy",
    year: "2023",
    featured: true,
    size: "medium",
    clientName: "FlyTops",
    details: {
      client: "FlyTops Footwear",
      role: "Brand Strategist",
      duration: "4 months",
      tools: ["Figma", "Photoshop", "After Effects"]
    }
  },
  {
    id: "simplicity-design",
    title: "Simplicity in Design",
    description: "Minimalist design approach for a tech company's web presence and campaign materials.",
    image: "/lovable-uploads/bf06704c-28d1-4696-a123-cb87c18ca555.png",
    category: "Web & Campaign",
    year: "2022",
    featured: true,
    size: "medium",
    clientName: "mnnml",
    details: {
      client: "Apple Inc.",
      role: "UX Designer & Art Director",
      duration: "6 months",
      tools: ["Sketch", "Principle", "HTML/CSS"]
    }
  },
  {
    id: "future-bright",
    title: "The Future is Bright",
    description: "Abstract brand design for a forward-thinking tech startup in the AR/VR space.",
    image: "/lovable-uploads/bf06704c-28d1-4696-a123-cb87c18ca555.png",
    category: "Brand Design",
    year: "2023",
    featured: true,
    size: "medium",
    clientName: "Creation Co.",
    details: {
      client: "NextReality Labs",
      role: "Creative Director",
      duration: "5 months",
      tools: ["Cinema 4D", "Blender", "Adobe Suite"]
    }
  }
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
