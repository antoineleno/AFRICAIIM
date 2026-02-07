import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from 'figma:asset/ec844cec6a228f098ee7a36535042ab0a7a84385.png';

interface NavigationProps {
  onNavigateToAuth: () => void;
}

export function Navigation({ onNavigateToAuth }: NavigationProps) {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [language, setLanguage] = useState<'EN' | 'FR'>(i18n.language === 'fr' ? 'FR' : 'EN');
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isBachelorOpen, setIsBachelorOpen] = useState(false);
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [masterCategoryOpen, setMasterCategoryOpen] = useState<string | null>(null);

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

  const toggleLanguage = (lang: 'EN' | 'FR') => {
    setLanguage(lang);
    i18n.changeLanguage(lang === 'EN' ? 'en' : 'fr');
  };

  const navItems = [
    { label: t('nav.home'), href: '#', id: 'home' },
    { label: t('nav.about'), href: '#about', id: 'about' },
  ];

  const navItemsAfter = [
    { label: t('nav.eventsNews'), href: '#events-news', id: 'events-news' },
    { label: t('nav.campusLife'), href: '#campus', id: 'campus' },
    { label: t('nav.contactUs'), href: '#apply', id: 'apply' },
  ];

  const bachelorPrograms = [
    { label: 'Bachelor Grande École - Management & IA', href: '#programs' },
    { label: 'Bachelor Banque & Assurance', href: '#programs' },
    { label: 'Bachelor Comptabilité & Gestion', href: '#programs' },
  ];

  const masterCategories = [
    { label: 'Business Management', id: 'management' },
    { label: 'Business Specializations', id: 'specializations' },
  ];

  const masterProgramsByCategory = {
    management: [
      { label: 'Master Transformation Digitale', href: '#programs' },
      { label: 'Master RH', href: '#programs' },
      { label: 'Master Gestion de Projets', href: '#programs' },
    ],
    specializations: [
      { label: 'Master Cybersécurité', href: '#programs' },
      { label: 'Master Ingénierie Financière', href: '#programs' },
      { label: 'Master Supply Chain', href: '#programs' },
    ],
  };

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
            <div className="flex justify-between items-center h-20 gap-16">
              {/* Logo */}
              <motion.a
                href="#"
                className="flex items-center gap-3 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img src={logo} alt="AFRICAIIM Logo" className="h-20 w-20" />
                <div className="hidden sm:block">
                  <div className="text-2xl font-bold tracking-wide" style={{ color: '#1a5443' }}>
                    AFRICAIIM
                  </div>
                  <div className="text-base font-bold tracking-wider" style={{ color: '#b8873e' }}>
                    Business School
                  </div>
                </div>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 flex-shrink-0">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`text-lg font-medium transition-all duration-300 relative whitespace-nowrap ${
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
                
                {/* Programs Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsProgramsOpen(true)}
                  onMouseLeave={() => {
                    setIsProgramsOpen(false);
                    setIsBachelorOpen(false);
                    setIsMasterOpen(false);
                    setMasterCategoryOpen(null);
                  }}
                >
                  <motion.a
                    href="#programs"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`text-lg font-medium transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                      activeSection === 'programs'
                        ? 'text-[#d4a574]'
                        : 'text-gray-700 hover:text-[#1a5443]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {t('nav.programs')}
                    {activeSection === 'programs' && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5"
                        style={{ backgroundColor: '#d4a574' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>

                  {/* Level 1: Bachelor and Master */}
                  {isProgramsOpen && (
                    <div className="absolute top-full left-0 mt-4 w-56 bg-white shadow-xl rounded-lg border border-gray-100 z-50">
                      {/* Bachelor Item */}
                      <div
                        className="relative"
                        onMouseEnter={() => {
                          setIsBachelorOpen(true);
                          setIsMasterOpen(false);
                          setMasterCategoryOpen(null);
                        }}
                      >
                        <div className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium cursor-pointer flex items-center justify-between">
                          <span>Bachelor</span>
                          <span className="text-gray-400">→</span>
                        </div>
                      </div>

                      {/* Master Item */}
                      <div
                        className="relative border-t border-gray-100"
                        onMouseEnter={() => {
                          setIsMasterOpen(true);
                          setIsBachelorOpen(false);
                          setMasterCategoryOpen(null);
                        }}
                      >
                        <div className="px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium cursor-pointer flex items-center justify-between">
                          <span>Master</span>
                          <span className="text-gray-400">→</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bachelor Programs - appears to the right */}
                  {isProgramsOpen && isBachelorOpen && (
                    <div 
                      className="absolute top-full left-56 mt-4 ml-2 w-96 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 z-[60]"
                      onMouseEnter={() => setIsBachelorOpen(true)}
                      onMouseLeave={() => setIsBachelorOpen(false)}
                    >
                      {bachelorPrograms.map((program, idx) => (
                        <a
                          key={idx}
                          href={program.href}
                          className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5443] transition-colors border-b border-gray-100 last:border-b-0 whitespace-nowrap"
                        >
                          {program.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Master Categories - appears to the right, lower position */}
                  {isProgramsOpen && isMasterOpen && (
                    <div 
                      className="absolute top-full left-56 mt-[68px] ml-2 w-72 bg-white shadow-xl rounded-lg border border-gray-100 z-[60]"
                      onMouseEnter={() => setIsMasterOpen(true)}
                      onMouseLeave={() => {
                        setIsMasterOpen(false);
                        setMasterCategoryOpen(null);
                      }}
                    >
                      {masterCategories.map((category, idx) => (
                        <div
                          key={category.id}
                          onMouseEnter={() => setMasterCategoryOpen(category.id)}
                        >
                          <div className={`px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5443] transition-colors cursor-pointer flex items-center justify-between whitespace-nowrap ${idx > 0 ? 'border-t border-gray-100' : ''}`}>
                            <span>{category.label}</span>
                            <span className="text-gray-400">→</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Master Programs - appears further to the right */}
                  {isProgramsOpen && isMasterOpen && masterCategoryOpen && (
                    <div 
                      className="absolute top-full left-[344px] mt-[68px] ml-2 w-96 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 z-[70]"
                      onMouseEnter={() => setMasterCategoryOpen(masterCategoryOpen)}
                      onMouseLeave={() => setMasterCategoryOpen(null)}
                    >
                      {masterProgramsByCategory[masterCategoryOpen as keyof typeof masterProgramsByCategory].map((program, pidx) => (
                        <a
                          key={pidx}
                          href={program.href}
                          className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a5443] transition-colors border-b border-gray-100 last:border-b-0 whitespace-nowrap"
                        >
                          {program.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {navItemsAfter.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                    className={`text-lg font-medium transition-all duration-300 relative whitespace-nowrap ${
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
                
                {/* Language Selector */}
                <div className="flex items-center gap-1 border-2 rounded-full overflow-hidden" style={{ borderColor: '#b8873e' }}>
                  <motion.button
                    onClick={() => toggleLanguage('EN')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-1 text-sm font-bold transition-all duration-300 ${
                      language === 'EN' 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    style={language === 'EN' ? { backgroundColor: '#b8873e' } : {}}
                  >
                    EN
                  </motion.button>
                  <motion.button
                    onClick={() => toggleLanguage('FR')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-1 text-sm font-bold transition-all duration-300 ${
                      language === 'FR' 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    style={language === 'FR' ? { backgroundColor: '#b8873e' } : {}}
                  >
                    FR
                  </motion.button>
                </div>

                <motion.button
                  onClick={onNavigateToAuth}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded text-lg font-medium text-white transition-all duration-300 whitespace-nowrap"
                  style={{ backgroundColor: '#1a5443' }}
                >
                  {t('nav.applyNow')}
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
                      className={`block py-2 text-lg font-medium transition-colors ${
                        activeSection === item.id
                          ? 'text-[#d4a574]'
                          : 'text-gray-700 hover:text-[#1a5443]'
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && ' •'}
                    </a>
                  ))}
                  
                  {/* Language Selector Mobile */}
                  <div className="flex items-center gap-2 py-2">
                    <span className="text-sm text-gray-600 font-medium">Language:</span>
                    <div className="flex items-center gap-1 border-2 rounded-full overflow-hidden" style={{ borderColor: '#b8873e' }}>
                      <button
                        onClick={() => toggleLanguage('EN')}
                        className={`px-4 py-1 text-sm font-bold transition-all duration-300 ${
                          language === 'EN' 
                            ? 'text-white' 
                            : 'text-gray-600'
                        }`}
                        style={language === 'EN' ? { backgroundColor: '#b8873e' } : {}}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => toggleLanguage('FR')}
                        className={`px-4 py-1 text-sm font-bold transition-all duration-300 ${
                          language === 'FR' 
                            ? 'text-white' 
                            : 'text-gray-600'
                        }`}
                        style={language === 'FR' ? { backgroundColor: '#b8873e' } : {}}
                      >
                        FR
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigateToAuth();
                    }}
                    className="block w-full py-2 px-4 text-center rounded-full text-lg text-white font-medium"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    {t('nav.applyNow')}
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