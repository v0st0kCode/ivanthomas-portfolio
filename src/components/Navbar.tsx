
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
    }`}>
      <nav className="container-custom flex justify-between items-center">
        <Link 
          to="/" 
          className="font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          Portfolio.
        </Link>
        
        <div className="flex space-x-8">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'after:w-full' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/work" 
            className={`nav-item ${isActive('/work') ? 'after:w-full' : ''}`}
          >
            Work
          </Link>
          <Link 
            to="/case-study" 
            className={`nav-item ${isActive('/case-study') ? 'after:w-full' : ''}`}
          >
            Case Studies
          </Link>
          <Link 
            to="/about" 
            className={`nav-item ${isActive('/about') ? 'after:w-full' : ''}`}
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
