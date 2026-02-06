import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Globe2, Laptop, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Programs() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            {t('programs.label')}
          </div>
          <h2 className="text-5xl md:text-6xl mb-8 font-light leading-tight" style={{ color: '#1a5443' }}>
            {t('programs.title')}
          </h2>
          <p className="text-lg text-gray-900 max-w-4xl mx-auto leading-relaxed font-light">
            {t('programs.description')}
          </p>
          
          {/* Visual Timeline Connector */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={inView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-md" style={{ backgroundColor: '#1a5443', fontWeight: 500 }}>1</div>
              <span className="text-lg text-gray-800" style={{ fontWeight: 500, color: '#1a5443' }}>{t('programs.languageProgression.french')}</span>
            </div>
            <div className="w-16 h-1 rounded" style={{ backgroundColor: '#d4a574' }} />
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-md" style={{ backgroundColor: '#d4a574', fontWeight: 500 }}>2</div>
              <span className="text-lg text-gray-800" style={{ fontWeight: 500, color: '#d4a574' }}>{t('programs.languageProgression.bilingual')}</span>
            </div>
            <div className="w-16 h-1 rounded" style={{ backgroundColor: '#1a5443' }} />
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-md" style={{ backgroundColor: '#1a5443', fontWeight: 500 }}>3</div>
              <span className="text-lg text-gray-800" style={{ fontWeight: 500, color: '#1a5443' }}>{t('programs.languageProgression.english')}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Year-by-Year Program */}
        <div className="mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            {yearPrograms.map((program, index) => (
              <motion.div
                key={program.year}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -15, 
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12)',
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover Background Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ backgroundColor: program.color }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 shadow-md"
                    style={{ backgroundColor: program.color }}
                  >
                    <program.icon size={36} className="text-white" />
                  </motion.div>

                  {/* Year Badge */}
                  <div className="mb-4">
                    <span
                      className="px-4 py-2 rounded-full text-base font-medium"
                      style={{ 
                        backgroundColor: `${program.color}15`,
                        color: program.color 
                      }}
                    >
                      {program.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-light mb-2" style={{ color: '#1a5443' }}>
                    {program.title}
                  </h3>

                  {/* Language */}
                  <p className="text-lg mb-6 font-medium" style={{ color: program.color }}>
                    {program.language}
                  </p>

                  <p className="text-gray-700 mb-8 text-lg font-light leading-relaxed">
                    {program.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {program.highlights.map((highlight, idx) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: program.color }}
                        />
                        <span className="text-base text-gray-700">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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
    </section>
  );
}