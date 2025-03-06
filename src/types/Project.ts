export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  videoUrl?: string; // Optional video URL for hover effect
  category: string;
  year: string;
  protected: boolean;
  featured: boolean;
  details?: {
    client?: string;
    role?: string;
    duration?: string;
    tools?: string[];
  };
  // Other project properties if they exist
}
