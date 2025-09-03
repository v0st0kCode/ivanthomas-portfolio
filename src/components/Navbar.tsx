
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
      isScrolled 
        ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm' 
        : 'py-5 bg-gradient-to-b from-white/90 to-white/0'
    }`}>
      <nav className="container-custom flex justify-between items-center">
        <Link 
          to="/" 
          className="font-outfit font-normal text-xl tracking-tight hover:opacity-80 transition-opacity text-shadow"
        >
          Ivan Thomas
        </Link>
        
        <div className="flex space-x-8">
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'after:w-full font-medium' : 'after:w-0'}`}
          >
            About
          </Link>
          <a 
            href="mailto:hello@ivanthomas.pro" 
            className="nav-link after:w-0 hover:after:w-full"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
