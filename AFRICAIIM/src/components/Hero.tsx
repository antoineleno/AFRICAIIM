import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigateToAuth: () => void;
}

export function Hero({ onNavigateToAuth }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29sbGVnZSUyMHN0dWRlbnRzJTIwc3R1ZHlpbmclMjBib29rcyUyMGNhbXB1c3xlbnwxfHx8fDE3NzAzMTUxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Business Students Studying'
    },
    {
      url: 'https://images.unsplash.com/photo-1741637335289-c99652d3155f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJlZSUyMHN0dWRlbnRzJTIwaG9sZGluZyUyMGJvb2tzJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NzAzMTUyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'Three Students Holding Books'
    },
    {
      url: 'https://images.unsplash.com/photo-1671917057310-88d5fd951ece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzdGlnaW91cyUyMHVuaXZlcnNpdHklMjBjYW1wdXMlMjBhcmNoaXRlY3R1cmUlMjBhZnJpY2F8ZW58MXx8fHwxNzcwMzE1NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'University Campus Architecture'
    },
    {
      url: 'https://images.unsplash.com/photo-1770235622340-e64e2146ee4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwdW5pdmVyc2l0eSUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3IlMjBkYXl0aW1lfGVufDF8fHx8MTc3MDMxMjg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      alt: 'University Campus'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Images with Smooth Crossfade */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
            }}
            transition={{ 
              duration: 2,
              ease: 'easeInOut'
            }}
            className="absolute inset-0"
            style={{ pointerEvents: currentImageIndex === index ? 'auto' : 'none' }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover brightness-50"
            />
            {/* Gradient overlay for better text visibility */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 84, 67, 0.75) 0%, rgba(0, 0, 0, 0.5) 100%)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.3 }}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: currentImageIndex === index ? '#d4a574' : 'rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight text-white drop-shadow-lg"
            style={{ fontWeight: '300', letterSpacing: '-0.02em' }}
          >
            AFRICAIIM
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl mb-4 text-white drop-shadow-md"
            style={{ color: '#d4a574', fontWeight: '300' }}
          >
            The Camara Laye Business School
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-0.5 mx-auto mb-8"
            style={{ backgroundColor: '#d4a574' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white drop-shadow-md"
            style={{ fontWeight: '300', lineHeight: '1.6' }}
          >
            Elevating African Growth through Leadership and Education
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={onNavigateToAuth}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(212, 165, 116, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded text-lg font-normal text-white transition-all duration-300 shadow-lg cursor-pointer"
              style={{ backgroundColor: '#d4a574', letterSpacing: '0.5px' }}
            >
              Apply for Admission
            </motion.button>
            <motion.a
              href="#programs"
              whileHover={{ scale: 1.05, backgroundColor: 'white', color: '#1a5443' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded text-lg font-normal border-2 border-white text-white transition-all duration-300 backdrop-blur-sm"
              style={{ letterSpacing: '0.5px' }}
            >
              Explore Program
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} className="text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}