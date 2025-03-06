
import { Project } from '../types/Project';

// Example projects data with videoUrl field added
export const projects: Project[] = [
  {
    id: '1',
    title: 'SonyLIV 3D Audio Experience',
    description: 'An immersive 3D audio experience for SonyLIV streaming platform',
    image: '/Sony3D_bg.png',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Sample video URL
    category: 'Web Application',
    year: '2023',
    protected: false,
    featured: true,
    details: {
      client: 'SonyLIV',
      role: 'Lead Designer',
      duration: '4 months',
      tools: ['Figma', 'After Effects', 'WebGL']
    }
  },
  {
    id: '2',
    title: 'Spotify Redesign',
    description: 'A fresh take on the Spotify mobile app with enhanced user experience',
    image: '/spotify_redesign.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Mobile App',
    year: '2022',
    protected: false,
    featured: true,
    details: {
      client: 'Spotify',
      role: 'UX/UI Designer',
      duration: '3 months',
      tools: ['Figma', 'Principle', 'ProtoPie']
    }
  },
  {
    id: '3',
    title: 'Banking Dashboard',
    description: 'Modern banking dashboard with advanced analytics and user-friendly interface',
    image: '/banking_dashboard.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Web Application',
    year: '2022',
    protected: true,
    featured: true,
    details: {
      client: 'Financial Institution',
      role: 'Product Designer',
      duration: '6 months',
      tools: ['Figma', 'Webflow', 'Framer']
    }
  },
  {
    id: '4',
    title: 'Travel Booking Platform',
    description: 'End-to-end travel booking platform with personalized recommendations',
    image: '/travel_booking.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'Web Application',
    year: '2021',
    protected: false,
    featured: true,
    details: {
      client: 'Travel Agency',
      role: 'UX/UI Designer',
      duration: '5 months',
      tools: ['Sketch', 'InVision', 'Zeplin']
    }
  },
  {
    id: '5',
    title: 'Health & Fitness App',
    description: 'Comprehensive health tracking and workout planning mobile application',
    image: '/fitness_app.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Mobile App',
    year: '2021',
    protected: false,
    featured: false,
    details: {
      client: 'Fitness Brand',
      role: 'Mobile Designer',
      duration: '4 months',
      tools: ['Figma', 'After Effects', 'ProtoPie']
    }
  },
  {
    id: '6',
    title: 'E-commerce Redesign',
    description: 'Complete redesign of an e-commerce platform focusing on conversion optimization',
    image: '/ecommerce_redesign.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'Web Application',
    year: '2020',
    protected: false,
    featured: false,
    details: {
      client: 'E-commerce Company',
      role: 'UX Designer',
      duration: '3 months',
      tools: ['Figma', 'Sketch', 'Framer']
    }
  }
];

// The functions below should remain the same, just copying them to maintain functionality
export const getAllProjects = (): Project[] => {
  return projects;
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
