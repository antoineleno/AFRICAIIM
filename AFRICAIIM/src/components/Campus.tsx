import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Users, Award, Building } from 'lucide-react';

interface CampusProps {
  onNavigateToAuth: () => void;
}

export function Campus({ onNavigateToAuth }: CampusProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: BookOpen,
      title: 'Modern Library',
      description: 'Access to over 100,000 books and digital resources',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsaWJyYXJ5JTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzcwMzE4MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Users,
      title: 'Collaborative Spaces',
      description: 'State-of-the-art facilities for teamwork and innovation',
      image: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2xsYWJvcmF0aXZlJTIwd29ya3NwYWNlJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwMzE4MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Building,
      title: 'Smart Classrooms',
      description: 'Technology-enabled learning environments',
      image: 'https://images.unsplash.com/photo-1747674148491-51f8a5c723db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY2xhc3Nyb29tJTIwdW5pdmVyc2l0eSUyMGxlY3R1cmV8ZW58MXx8fHwxNzcwMzE4MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Award,
      title: 'Career & Master\'s Center',
      description: 'Dedicated support for international Master\'s applications',
      image: 'https://images.unsplash.com/photo-1565688420536-11a4ddfa246f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBjb3Vuc2VsaW5nJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwYWR2aXNvcnxlbnwxfHx8fDE3NzAzNzA3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section id="campus" ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="text-base uppercase tracking-wider mb-4 font-bold"
            style={{ color: '#d4a574' }}
          >
            Campus Life
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 font-light" style={{ color: '#1a5443' }}>
            Experience Our Campus
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Our world-class facilities provide the perfect environment for learning, 
            collaboration, and personal growth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)' }}
              className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer bg-white"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(26, 84, 67, 0.95), rgba(26, 84, 67, 0.3))',
                  }}
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-lg"
                  style={{ backgroundColor: '#d4a574' }}
                >
                  <feature.icon size={26} />
                </motion.div>
                <h3 className="text-2xl font-light mb-2">{feature.title}</h3>
                <p className="text-white/95 font-light leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student Life Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1591218214141-45545921d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdHVkZW50cyUyMGNlbGVicmF0aW5nfGVufDF8fHx8MTc3MDMxMjI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Graduation"
            className="w-full h-96 object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 84, 67, 0.85), rgba(212, 165, 116, 0.85))',
            }}
          >
            <div className="text-center text-white px-4">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl md:text-5xl mb-4 font-light"
              >
                Join Our Community
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-xl mb-8 max-w-2xl mx-auto font-light"
              >
                Become part of a vibrant community of scholars, innovators, and future leaders
              </motion.p>
              <motion.button
                onClick={onNavigateToAuth}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-white rounded text-lg font-normal transition-all duration-300 cursor-pointer"
                style={{ color: '#1a5443' }}
              >
                Start Your Journey
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}