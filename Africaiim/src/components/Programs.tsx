import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Globe2, Laptop, Award, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProgramsProps {
  onNavigateToAuth: () => void;
}

export function Programs({ onNavigateToAuth }: ProgramsProps) {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeTab, setActiveTab] = useState<'all' | 'bachelor' | 'master'>('all');
  const [masterFilter, setMasterFilter] = useState<'all' | 'initial' | 'executive'>('all');
  const [showAll, setShowAll] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  const bachelorPrograms = [
    {
      title: 'Bachelor Grande École - Management, Social Sciences & AI',
      description: 'Management, Innovation, Leadership. Prépa Grandes Ecoles (HEC, ESSEC, ESCP, INSEAD, LBS). Triple International Diploma.',
      duration: '3 years',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    },
    {
      title: 'Bachelor in Accounting & Management',
      description: 'Accounting, Audit, Control. Internationally Recognized Certifications. Direct Access to Master.',
      duration: '3 years',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    },
    {
      title: 'Bachelor in Banking & Insurance',
      description: 'Finance, Insurance, Digitalization. Customer Relations and Risk Management. Guaranteed Banking Career.',
      duration: '3 years',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    },
  ];

  const masterPrograms = [
    {
      title: 'Master in Digital Transformation & Digital Tools Management',
      description: 'Lead digital transformation initiatives in modern organizations',
      duration: '2 years',
      icon: Laptop,
      type: 'initial',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
      title: 'Master in Cybersecurity & Information Systems Management',
      description: 'Information systems security and cyber defense',
      duration: '2 years',
      icon: Laptop,
      type: 'initial',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    },
    {
      title: 'Master in Business Unit Management & Financial Strategies',
      description: 'Strategic business unit management and financial planning',
      duration: '2 years',
      icon: BookOpen,
      type: 'initial',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    },
    {
      title: 'Master in Supply Chain, Purchasing & Logistics Management',
      description: 'Logistics and supply chain management optimization',
      duration: '2 years',
      icon: Globe2,
      type: 'initial',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    },
    {
      title: 'Master in Human Resources Management',
      description: 'Strategic HR management and organizational development',
      duration: '2 years',
      icon: Globe2,
      type: 'initial',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    },
    {
      title: 'Master in Project Management',
      description: 'Complex project management and agile methodologies',
      duration: '2 years',
      icon: Award,
      type: 'initial',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
    {
      title: 'Master in Financial Engineering',
      description: 'Advanced finance, markets, and financial engineering',
      duration: '2 years',
      icon: BookOpen,
      type: 'executive',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    },
    {
      title: 'Master in Healthcare Facilities Management',
      description: 'Strategic management of healthcare establishments',
      duration: '2 years',
      icon: Award,
      type: 'executive',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    },
    {
      title: 'Master in Purchasing & Logistics',
      description: 'Advanced purchasing strategies and logistics optimization',
      duration: '2 years',
      icon: Globe2,
      type: 'executive',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    },
    {
      title: 'Master in Business Strategy',
      description: 'Corporate strategy and business development',
      duration: '2 years',
      icon: Laptop,
      type: 'executive',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
    {
      title: 'Master in Human Resources Management (Executive)',
      description: 'Advanced HR leadership and strategic workforce planning',
      duration: '2 years',
      icon: Globe2,
      type: 'executive',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    },
    {
      title: 'Master in Project Management (Executive)',
      description: 'Executive-level project leadership and portfolio management',
      duration: '2 years',
      icon: Award,
      type: 'executive',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
  ];

  const allPrograms = [...bachelorPrograms, ...masterPrograms];
  
  // Filter master programs by type if master tab is active
  const filteredMasterPrograms = masterFilter === 'all' 
    ? masterPrograms 
    : masterPrograms.filter(p => p.type === masterFilter);
  
  const currentPrograms = activeTab === 'all' 
    ? allPrograms
    : activeTab === 'bachelor' 
    ? bachelorPrograms 
    : filteredMasterPrograms;

  const displayedPrograms = showAll 
    ? currentPrograms
    : currentPrograms.slice(0, 6);

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const truncateTitle = (text: string, maxLength: number = 70) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const yearPrograms = [
    {
      icon: BookOpen,
      year: `${t('programs.year')} 1`,
      title: t('programs.year1.title'),
      language: t('programs.year1.language'),
      description: t('programs.year1.description'),
      highlights: [
        t('programs.year1.highlight1'),
        t('programs.year1.highlight2'),
        t('programs.year1.highlight3'),
        t('programs.year1.highlight4')
      ],
      color: '#1a5443',
    },
    {
      icon: Globe2,
      year: `${t('programs.year')} 2`,
      title: t('programs.year2.title'),
      language: t('programs.year2.language'),
      description: t('programs.year2.description'),
      highlights: [
        t('programs.year2.highlight1'),
        t('programs.year2.highlight2'),
        t('programs.year2.highlight3'),
        t('programs.year2.highlight4')
      ],
      color: '#d4a574',
    },
    {
      icon: Award,
      year: `${t('programs.year')} 3`,
      title: t('programs.year3.title'),
      language: t('programs.year3.language'),
      description: t('programs.year3.description'),
      highlights: [
        t('programs.year3.highlight1'),
        t('programs.year3.highlight2'),
        t('programs.year3.highlight3'),
        t('programs.year3.highlight4')
      ],
      color: '#1a5443',
    },
  ];

  const disciplines = [
    {
      icon: Laptop,
      title: t('programs.socialSciences'),
      description: t('programs.socialSciencesDesc'),
    },
    {
      icon: BookOpen,
      title: t('programs.management'),
      description: t('programs.managementDesc'),
    },
    {
      icon: Globe2,
      title: t('programs.csDecisionAnalysis'),
      description: t('programs.csDecisionAnalysisDesc'),
    },
  ];

  return (
    <section
      id="programs"
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: '#ffffff',
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              backgroundColor: i % 2 === 0 ? '#1a5443' : '#d4a574',
              top: `${-10 + i * 20}%`,
              left: `${-5 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
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
            {t('programs.label')}
          </div>
          <h2 className="text-5xl md:text-6xl mb-8 font-light leading-tight" style={{ color: '#1a5443' }}>
            {t('programs.title')}
          </h2>
          <p className="text-lg text-gray-900 max-w-4xl mx-auto leading-relaxed font-light">
            {t('programs.description')}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('all')}
            className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
              activeTab === 'all'
                ? 'text-white shadow-lg'
                : 'text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300'
            }`}
            style={activeTab === 'all' ? { backgroundColor: '#1a5443' } : {}}
          >
            All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('bachelor')}
            className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
              activeTab === 'bachelor'
                ? 'text-white shadow-lg'
                : 'text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300'
            }`}
            style={activeTab === 'bachelor' ? { backgroundColor: '#1a5443' } : {}}
          >
            Bachelor
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('master')}
            className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
              activeTab === 'master'
                ? 'text-white shadow-lg'
                : 'text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300'
            }`}
            style={activeTab === 'master' ? { backgroundColor: '#1a5443' } : {}}
          >
            Master
          </motion.button>
        </div>

        {/* Master Sub-Filter */}
        {activeTab === 'master' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setMasterFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                masterFilter === 'all'
                  ? 'text-white'
                  : 'text-gray-600 bg-white border border-gray-300 hover:border-gray-400'
              }`}
              style={masterFilter === 'all' ? { backgroundColor: '#d4a574' } : {}}
            >
              All Masters
            </button>
            <button
              onClick={() => setMasterFilter('initial')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                masterFilter === 'initial'
                  ? 'text-white'
                  : 'text-gray-600 bg-white border border-gray-300 hover:border-gray-400'
              }`}
              style={masterFilter === 'initial' ? { backgroundColor: '#d4a574' } : {}}
            >
              Initial
            </button>
            <button
              onClick={() => setMasterFilter('executive')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                masterFilter === 'executive'
                  ? 'text-white'
                  : 'text-gray-600 bg-white border border-gray-300 hover:border-gray-400'
              }`}
              style={masterFilter === 'executive' ? { backgroundColor: '#d4a574' } : {}}
            >
              Executive
            </button>
          </motion.div>
        )}

        {/* Programs List */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {displayedPrograms.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* Program Image - Fixed Height */}
              <div className="h-56 min-h-56 max-h-56 overflow-hidden flex-shrink-0 bg-gray-100" style={{ height: '14rem', minHeight: '14rem', maxHeight: '14rem' }}>
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-56 min-h-56 max-h-56 object-cover object-center hover:scale-110 transition-transform duration-300 block"
                  style={{ height: '14rem', minHeight: '14rem', maxHeight: '14rem' }}
                />
              </div>
              
              {/* Program Content - Fixed Height */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1.5 h-14 overflow-hidden" style={{ color: '#1a5443' }}>
                  {truncateTitle(program.title)}
                </h3>
                <p className="text-sm mb-1.5" style={{ color: '#b8873e', fontWeight: 600 }}>
                  {program.duration}
                </p>
                <p className="text-gray-600 leading-relaxed mb-0 h-20 overflow-hidden">
                  {truncateText(program.description)}
                </p>
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="w-full px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 mt-auto"
                  style={{ backgroundColor: '#d4a574' }}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        {currentPrograms.length > 6 && (
          <div className="flex justify-center mb-20">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 text-lg"
              style={{ backgroundColor: '#1a5443' }}
            >
              {showAll ? 'Show Less' : 'Load More Programs'}
            </button>
          </div>
        )}

        {/* Disciplines Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-6 font-light" style={{ color: '#1a5443' }}>
              {t('programs.disciplinesTitle')}
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
              {t('programs.disciplinesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {disciplines.map((discipline, index) => (
              <motion.div
                key={discipline.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
                }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
                  style={{ backgroundColor: '#d4a57420' }}
                >
                  <discipline.icon size={32} style={{ color: '#d4a574' }} />
                </motion.div>
                <h4 className="text-2xl font-light mb-4" style={{ color: '#1a5443' }}>
                  {discipline.title}
                </h4>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  {discipline.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Innovative Pedagogy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 text-center bg-white rounded-3xl p-12 shadow-lg"
        >
          <h3 className="text-4xl md:text-5xl mb-8 font-light" style={{ color: '#1a5443' }}>
            {t('programs.pedagogyTitle')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <div className="text-3xl mb-4" style={{ color: '#d4a574' }}>📚</div>
              <h4 className="text-2xl font-light mb-3" style={{ color: '#1a5443' }}>{t('programs.realCaseStudies')}</h4>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                {t('programs.realCaseStudiesDesc')}
              </p>
            </div>
            <div>
              <div className="text-3xl mb-4" style={{ color: '#d4a574' }}>💻</div>
              <h4 className="text-2xl font-light mb-3" style={{ color: '#1a5443' }}>{t('programs.advancedTech')}</h4>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                {t('programs.advancedTechDesc')}
              </p>
            </div>
            <div>
              <div className="text-3xl mb-4" style={{ color: '#d4a574' }}>🌍</div>
              <h4 className="text-2xl font-light mb-3" style={{ color: '#1a5443' }}>{t('programs.internationalExperts')}</h4>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                {t('programs.internationalExpertsDesc')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Program Details Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProgram(null)}
                className="sticky top-4 right-4 float-right z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X size={24} style={{ color: '#1a5443' }} />
              </button>

              {/* Hero Image */}
              <div className="relative h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Program Type Badge */}
                <div className="absolute bottom-6 left-6 flex gap-3">
                  <div
                    className="px-4 py-2 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: '#d4a574' }}
                  >
                    {selectedProgram.duration}
                  </div>
                  {selectedProgram.type && (
                    <div
                      className="px-4 py-2 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: '#1a5443' }}
                    >
                      {selectedProgram.type === 'initial' ? 'Master Initial' : 'Master Executive'}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight" style={{ color: '#1a5443' }}>
                  {selectedProgram.title}
                </h2>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} style={{ color: '#1a5443' }} />
                    <span className="text-gray-700 font-light">{selectedProgram.duration} Program</span>
                  </div>
                </div>

                {/* Full Description */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 font-light leading-relaxed mb-6 text-lg">
                    {selectedProgram.description}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedProgram(null);
                        setTimeout(() => {
                          onNavigateToAuth();
                        }, 300);
                      }}
                      className="flex-1 px-10 py-4 rounded-lg text-white font-light text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: '#1a5443' }}
                    >
                      Apply Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-10 py-4 rounded-lg font-light text-lg border-2 hover:bg-gray-50 transition-all duration-300"
                      style={{ borderColor: '#1a5443', color: '#1a5443' }}
                    >
                      Download Brochure
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}