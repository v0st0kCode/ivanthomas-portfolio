
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onLogoClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrandClick = (e: React.MouseEvent) => {
    if (location.pathname === '/' && onLogoClick) {
      e.preventDefault();
      onLogoClick();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm'
          : 'py-5 bg-background/60 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <nav className="container-custom flex justify-between items-center">
        <Link 
          to="/" 
          onClick={handleBrandClick}
          className="font-sans font-medium text-lg tracking-tight hover:opacity-80 transition-opacity drop-shadow-sm text-foreground cursor-pointer"
        >
          Ivan Thomas
        </Link>
        
        <div className="flex space-x-8">
          <Link
            to="/work"
            className={`nav-link font-sans text-sm drop-shadow-sm ${isActive('/work') ? 'after:w-full font-medium' : 'after:w-0'}`}
          >
            Work
          </Link>
          <Link
            to="/about"
            className={`nav-link font-sans text-sm drop-shadow-sm ${isActive('/about') ? 'after:w-full font-medium' : 'after:w-0'}`}
          >
            About
          </Link>
          <a 
            href="mailto:hello@ivanthomas.pro" 
            className="nav-link font-sans text-sm after:w-0 hover:after:w-full drop-shadow-sm"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
