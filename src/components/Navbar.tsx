import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Instagram, Mail, Linkedin, Github, Youtube } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'resume', 'projects'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add fade-in animation to the section
      element.classList.add('animate-fade-in');
      setTimeout(() => {
        element.classList.remove('animate-fade-in');
      }, 600);
    }
    setIsOpen(false);
    setIsContactOpen(false);
    setActiveSection(sectionId);
  };

  const contactLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/nafishusen24', color: 'hover:text-pink-500' },
    { name: 'Email', icon: Mail, href: 'mailto:nafishusenromadani@gmail.com', color: 'hover:text-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/nafishusen24/', color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/nafishr24/', color: 'hover:text-gray-800' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/yourchannel', color: 'hover:text-red-500' }, // Added YouTube
  ];

  const getNavItemClass = (sectionId: string) => {
      const isActive = activeSection === sectionId;
      return `relative px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors font-medium
        ${isActive ? 'text-blue-700 font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-700' : ''}
      `;
};


  const getMobileNavItemClass = (sectionId: string) => {
    return `block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors ${
      activeSection === sectionId ? 'text-blue-600 bg-blue-50 font-semibold' : ''
    }`;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
            Nafis' Portfolio
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={getNavItemClass('home')}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={getNavItemClass('about')}
            >
              About Me
            </button>
            <button
              onClick={() => scrollToSection('resume')}
              className={getNavItemClass('resume')}
            >
              My Resume
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className={getNavItemClass('projects')}
            >
              My Projects
            </button>
            
            {/* Contact Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact Me
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isContactOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                  {contactLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-4 py-3 text-gray-700 ${link.color} transition-colors border-b last:border-b-0`}
                    >
                      <link.icon className="h-4 w-4 mr-3" />
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg rounded-lg mt-2 border shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className={getMobileNavItemClass('home')}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={getMobileNavItemClass('about')}
              >
                About Me
              </button>
              <button
                onClick={() => scrollToSection('resume')}
                className={getMobileNavItemClass('resume')}
              >
                My Resume
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={getMobileNavItemClass('projects')}
              >
                My Projects
              </button>
              
              {/* Mobile Contact Section */}
              <div className="px-3 py-2">
                <div className="text-gray-700 font-medium mb-2">Contact Me</div>
                <div className="grid grid-cols-2 gap-2">
                  {contactLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-2 text-sm text-gray-600 ${link.color} transition-colors rounded-md hover:bg-blue-50`}
                    >
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;