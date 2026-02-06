import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from 'figma:asset/ec844cec6a228f098ee7a36535042ab0a7a84385.png';

interface NavigationProps {
  onNavigateToAuth: () => void;
}

export function Navigation({ onNavigateToAuth }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling 100px down
      setIsVisible(window.scrollY > 100);

      // Detect active section
      const sections = ['about', 'programs', 'events-news', 'campus', 'apply'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Program', href: '#programs', id: 'programs' },
    { label: 'Events & News', href: '#events-news', id: 'events-news' },
    { label: 'Campus Life', href: '#campus', id: 'campus' },
    { label: 'Contact Us', href: '#apply', id: 'apply' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed w-full z-50 bg-white shadow-md"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <motion.a
                href="#"
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={logo} alt="AFRICAIIM Logo" className="h-16 w-16" />
                <div className="hidden sm:block">
                  <div className="text-xl font-bold tracking-wide" style={{ color: '#1a5443' }}>
                    AFRICAIIM
                  </div>
                  <div className="text-sm font-bold tracking-wider" style={{ color: '#d4a574' }}>
                    Business School
                  </div>
                </div>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`font-medium transition-all duration-300 relative ${
                      activeSection === item.id
                        ? 'text-[#d4a574]'
                        : 'text-gray-700 hover:text-[#1a5443]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5"
                        style={{ backgroundColor: '#d4a574' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                ))}
                <motion.button
                  onClick={onNavigateToAuth}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded font-medium text-white transition-all duration-300"
                  style={{ backgroundColor: '#1a5443' }}
                >
                  Apply Now
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white shadow-lg"
              >
                <div className="px-4 py-4 space-y-3">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 font-medium transition-colors ${
                        activeSection === item.id
                          ? 'text-[#d4a574]'
                          : 'text-gray-700 hover:text-[#1a5443]'
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && ' •'}
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigateToAuth();
                    }}
                    className="block w-full py-2 px-4 text-center rounded-full text-white font-medium"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}