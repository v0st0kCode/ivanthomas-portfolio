
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container-custom pt-40 pb-20 flex flex-col items-center justify-center text-center">
        <span className="inline-block py-1 px-3 mb-6 text-xs font-medium tracking-wider uppercase bg-black text-white rounded-full animate-fade-in">
          404 Error
        </span>
        <h1 className="heading-xl mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-black/90 transition-colors animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
