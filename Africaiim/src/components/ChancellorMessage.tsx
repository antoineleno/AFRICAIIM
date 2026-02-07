import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Quote, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Professor images configuration
const PROFESSOR_IMAGES = {
  'hubert-silly': '/src/assets/professors/hubert-silly.jpg',
  'karim-dehimi': '/src/assets/professors/karim-dehimi.jpg',
  'radjkoumar-damien': '/src/assets/professors/radjkoumar-damien.jpg'
};

// Fallback images from Unsplash (temporary until actual photos are added)
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80"
];

// Image component with fallback handling
const ProfessorImage = ({ src, alt, fallbackIndex }: { src: string; alt: string; fallbackIndex: number }) => {
  const [imageError, setImageError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setShowFallback(true);
    }
  };

  return (
    <>
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <img
          src={FALLBACK_IMAGES[fallbackIndex]}
          alt={alt}
          className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
          loading="lazy"
        />
      )}
    </>
  );
};

export function ChancellorMessage() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const professorImageKeys = ['hubert-silly', 'karim-dehimi', 'radjkoumar-damien'];

  return (
    <section
      ref={ref}
      className="py-32 relative overflow-hidden bg-white"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5" style={{ backgroundColor: '#1a5443', filter: 'blur(120px)' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-5" style={{ backgroundColor: '#d4a574', filter: 'blur(120px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="w-16 h-1 mx-auto mb-6"
            style={{ backgroundColor: '#d4a574' }}
          />
          <div
            className="text-lg uppercase tracking-widest mb-6 font-bold"
            style={{ color: '#b8873e' }}
          >
            {t('chancellor.label')}
          </div>
          <h2 className="text-5xl md:text-6xl mb-8 font-light leading-tight" style={{ color: '#1a5443' }}>
            {t('chancellor.heading')}
          </h2>
        </motion.div>

        {/* Professors List */}
        <div className="space-y-32">
          {t('chancellor.professors', { returnObjects: true }).map((professor: any, index: number) => {
            const imageKey = professorImageKeys[index];
            const imageSrc = PROFESSOR_IMAGES[imageKey as keyof typeof PROFESSOR_IMAGES];
            
            const imageSection = (
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 1 ? 60 : -60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative group"
                >
                  <ProfessorImage 
                    src={imageSrc}
                    alt={`${professor.name} - Professor at AFRICAIIM`}
                    fallbackIndex={index}
                  />

                  {/* Image Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  {/* Decorative Corner Elements */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className={index % 2 === 1 ? 'absolute -top-6 -right-6 w-24 h-24 rounded-2xl' : 'absolute -top-6 -left-6 w-24 h-24 rounded-2xl'}
                    style={{ backgroundColor: '#d4a574', opacity: 0.3 }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className={index % 2 === 1 ? 'absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl' : 'absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl'}
                    style={{ backgroundColor: '#1a5443', opacity: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );

            const contentSection = (
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 1 ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 shadow-lg"
                  style={{ backgroundColor: '#1a5443' }}
                >
                  <Quote size={40} className="text-white" style={{ color: '#d4a574' }} />
                </motion.div>

                {/* Professor Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1a5443' }}>
                      {professor.name}
                    </h3>
                    <div className="w-20 h-1 mb-4" style={{ backgroundColor: '#d4a574' }} />
                    <p className="text-base md:text-lg font-medium" style={{ color: '#b8873e' }}>
                      {professor.title}
                    </p>
                  </div>

                  {/* Message Quote */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-8 p-6 rounded-2xl relative"
                    style={{ backgroundColor: '#1a544308', borderLeft: '4px solid #d4a574' }}
                  >
                    <Quote size={32} className="absolute top-4 right-4 opacity-20" style={{ color: '#d4a574' }} />
                    <p className="text-lg md:text-xl text-gray-800 font-light leading-relaxed italic">
                      "{professor.message}"
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
            
            return (
              <div key={index} className="grid lg:grid-cols-2 gap-16 items-center">
                {index % 2 === 0 ? (
                  <>
                    {imageSection}
                    {contentSection}
                  </>
                ) : (
                  <>
                    {contentSection}
                    {imageSection}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}