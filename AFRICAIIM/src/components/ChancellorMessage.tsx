import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

export function ChancellorMessage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const chancellorImage = "https://images.unsplash.com/photo-1604783020105-a1c1a856a55d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBleGVjdXRpdmUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzAzNjQzNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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
            className="text-base uppercase tracking-widest mb-6 font-bold"
            style={{ color: '#d4a574' }}
          >
            A Word from Our Leadership
          </div>
          <h2 className="text-5xl md:text-6xl mb-8 font-light leading-tight" style={{ color: '#1a5443' }}>
            Chancellor's Message
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Chancellor Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Image without border */}
              <img
                src={chancellorImage}
                alt="Chancellor Dr. Mohamed Camara"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />

              {/* Decorative Corner Elements */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl"
                style={{ backgroundColor: '#d4a574', opacity: 0.3 }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl"
                style={{ backgroundColor: '#1a5443', opacity: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Message Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
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

            {/* Message Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl text-gray-800 font-light leading-relaxed italic">
                "At AFRICAIIM, we are not simply educating students—we are nurturing the next generation of African leaders who will shape the future of our continent and the world."
              </p>

              <p className="text-lg text-gray-700 font-light leading-relaxed">
                Our vision is clear: to create a bridge between African excellence and global opportunities. Through our innovative bilingual program, we prepare students not just academically, but holistically—developing critical thinkers, ethical leaders, and global citizens.
              </p>

              <p className="text-lg text-gray-700 font-light leading-relaxed">
                Every student who walks through our doors embarks on a transformative journey. From mastering multiple languages to gaining admission to the world's most prestigious universities, our graduates are proving that African talent, when properly nurtured, can compete and excel on any global stage.
              </p>

              <p className="text-lg text-gray-700 font-light leading-relaxed">
                I invite you to join us in this mission. Together, we are building not just careers, but legacies that will impact generations to come.
              </p>

              {/* Closing Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10 p-6 rounded-2xl relative"
                style={{ backgroundColor: '#1a544308', borderLeft: '4px solid #d4a574' }}
              >
                <Quote size={32} className="absolute top-4 right-4 opacity-20" style={{ color: '#d4a574' }} />
                <p className="text-lg md:text-xl text-gray-800 font-light leading-relaxed italic">
                  "Education is not the filling of a pail, but the lighting of a fire. At AFRICAIIM, we ignite that fire in every student."
                </p>
              </motion.div>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 pt-8 border-t"
              style={{ borderColor: '#d4a57430' }}
            >
              <h3 className="text-2xl font-light mb-2" style={{ color: '#1a5443' }}>
                Dr. Mohamed Camara
              </h3>
              <p className="text-lg font-light" style={{ color: '#d4a574' }}>
                Chancellor & Founder
              </p>
              <p className="text-base text-gray-600 font-light mt-1">
                The African Institute for Management and Innovation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}