import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import bostonLogo from 'figma:asset/33d0819c28e526f4a003ced87b6642501268c5e8.png';
import emlyonLogo from 'figma:asset/7c11df9de3d34e048e730595f39c55902c5a14f2.png';
import sorbonneLogo from 'figma:asset/856a0cbe551d87fa57805279ce9cbcfc4344bf28.png';
import aberystwythLogo from '../assets/Shield_of_Aberystwyth_University.svg.png';
import buckinghamshireLogo from '../assets/Coat_of_arms_of_Buckinghamshire_New_University.svg.png';

export function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0.95]);

  // Auto-play carousel with 18 seconds per slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // 3 slides
    }, 18000); // 18 seconds per slide

    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      title: t('about.visionTitle'),
      subtitle: "Pioneering Excellence in West Africa",
      content: t('about.visionContent'),
      accent: '#1a5443'
    },
    {
      title: t('about.bilingualTitle'),
      subtitle: "French & English Excellence",
      content: t('about.bilingualContent'),
      accent: '#d4a574'
    },
    {
      title: t('about.partnershipTitle'),
      subtitle: "Connected to the World's Best",
      content: t('about.partnershipContent'),
      accent: '#1a5443'
    }
  ];

  const partnerUniversities = [
    { name: 'Boston University', schoolKey: 'questromSchool', img: bostonLogo },
    { name: 'emlyon', schoolKey: 'businessSchool', img: emlyonLogo },
    { name: 'Sorbonne Business School', schoolKey: 'businessSchool', img: sorbonneLogo },
    { name: 'Aberystwyth University', schoolKey: 'businessSchool', img: aberystwythLogo },
    { name: 'Buckinghamshire New University', schoolKey: 'businessSchool', img: buckinghamshireLogo },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <motion.section 
      id="about" 
      ref={ref} 
      className="py-32 bg-white relative overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ backgroundColor: '#1a5443', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5" style={{ backgroundColor: '#d4a574', filter: 'blur(100px)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="w-16 h-1 mx-auto mb-6"
            style={{ backgroundColor: '#d4a574' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-lg uppercase tracking-widest mb-6 font-bold"
            style={{ color: '#b8873e', letterSpacing: '0.15em' }}
          >
            {t('about.label')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl mb-8 font-light leading-tight"
            style={{ color: '#1a5443' }}
          >
            {t('about.institutionName')}
          </motion.h2>
        </motion.div>

        {/* Manual Navigation Text Slider */}
        <div className="relative min-h-[500px] flex items-center justify-center mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-24 h-1 mx-auto mb-8"
                style={{ backgroundColor: slides[currentSlide].accent }}
              />

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg uppercase tracking-widest mb-6 font-medium"
                style={{ color: slides[currentSlide].accent }}
              >
                {slides[currentSlide].subtitle}
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl mb-10 font-light leading-tight"
                style={{ color: '#1a5443' }}
              >
                {slides[currentSlide].title}
              </motion.h3>

              {/* Content */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed max-w-4xl mx-auto"
              >
                {slides[currentSlide].content}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl"
            style={{ color: '#1a5443' }}
          >
            <ChevronLeft size={28} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl"
            style={{ color: '#1a5443' }}
          >
            <ChevronRight size={28} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: currentSlide === index ? '#d4a574' : '#d4d4d4',
                }}
              />
            ))}
          </div>
        </div>

        {/* Partner Universities Scrolling Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="w-16 h-1 mx-auto mb-6"
              style={{ backgroundColor: '#d4a574' }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-lg uppercase tracking-widest mb-6 font-bold"
              style={{ color: '#d4a574', letterSpacing: '0.15em' }}
            >
              {t('about.globalNetwork')}
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-light mb-4" style={{ color: '#1a5443' }}>
              {t('about.partnerUniversities')}
            </h3>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              {t('about.collaborating')}
            </p>
          </div>
          
          {/* Scrolling Container */}
          <div className="relative py-8">
            {/* Decorative Vertical Lines at Start */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              <div className="w-1 h-16" style={{ backgroundColor: '#1a5443' }} />
              <div className="w-1 h-12" style={{ backgroundColor: '#d4a574' }} />
              <div className="w-1 h-8" style={{ backgroundColor: '#1a5443' }} />
            </div>
            
            {/* Decorative Vertical Lines at End */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              <div className="w-1 h-16" style={{ backgroundColor: '#1a5443' }} />
              <div className="w-1 h-12" style={{ backgroundColor: '#d4a574' }} />
              <div className="w-1 h-8" style={{ backgroundColor: '#1a5443' }} />
            </div>
            
            {/* Elegant Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling Track */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8 items-center"
                animate={{
                  x: [0, -((partnerUniversities.length * 280) + (partnerUniversities.length * 32))],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {/* Render universities 3 times for seamless loop */}
                {[...partnerUniversities, ...partnerUniversities, ...partnerUniversities].map((university, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-[280px] flex flex-col items-center justify-center"
                    whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
                  >
                    {/* Logo */}
                    <div className="w-full h-[120px] flex items-center justify-center mb-4">
                      <img 
                        src={university.img} 
                        alt={university.name}
                        className="max-w-full max-h-full object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                      />
                    </div>
                    
                    {/* University Name */}
                    <h4 className="text-lg font-semibold text-center mb-1" style={{ color: '#1a5443' }}>
                      {university.name}
                    </h4>
                    
                    {/* School Name */}
                    <p className="text-sm text-gray-500 text-center font-light">
                      {t(`about.${university.schoolKey}`)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transition Element to Programs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #f8f9fa)',
        }}
      />
    </motion.section>
  );
}