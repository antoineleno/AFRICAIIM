import React from 'react';
import { motion } from 'motion/react';
import { FileText, FileCheck, UserCheck, CheckCircle, Calendar } from 'lucide-react';

export function DashboardAdmissionsProcess() {
  const steps = [
    {
      icon: FileText,
      number: '01',
      title: 'Submit Application',
      description: 'Complete the online application form with your personal information, academic records, and motivation letter.',
      timeline: 'Rolling Admissions',
      color: '#1a5443',
    },
    {
      icon: FileCheck,
      number: '02',
      title: 'Document Review',
      description: 'Our admissions team carefully reviews your academic transcripts, English proficiency scores, and supporting documents.',
      timeline: '2-3 Weeks',
      color: '#d4a574',
    },
    {
      icon: UserCheck,
      number: '03',
      title: 'Admission Interview',
      description: 'Selected candidates participate in a personal interview to discuss their goals, motivations, and fit with our program.',
      timeline: '1-2 Weeks',
      color: '#1a5443',
    },
    {
      icon: CheckCircle,
      number: '04',
      title: 'Admission Decision',
      description: 'Receive your admission decision via email. Successful candidates will receive an official acceptance letter and enrollment details.',
      timeline: '1 Week',
      color: '#d4a574',
    },
    {
      icon: Calendar,
      number: '05',
      title: 'Enrollment & Registration',
      description: 'Confirm your enrollment by paying the deposit and completing registration. Attend the orientation program to begin your journey.',
      timeline: '2-4 Weeks',
      color: '#1a5443',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 overflow-hidden">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f0f9f6' }}>
            <CheckCircle size={28} style={{ color: '#1a5443' }} />
          </div>
          <h2 className="text-3xl font-light" style={{ color: '#1a5443' }}>
            Admissions Process
          </h2>
        </div>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          A clear, transparent pathway to joining AFRICAIIM. Follow these simple steps to begin your academic journey.
        </p>
      </div>

      {/* Process Flow */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-16 bottom-16 w-0.5" style={{ backgroundColor: '#d4a57430' }} />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex gap-6">
                {/* Number Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center font-bold text-xl text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: step.color, opacity: 0.2 }}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)' }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-100 group"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon size={28} style={{ color: step.color }} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-light mb-3" style={{ color: '#1a5443' }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 font-light leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Timeline Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${step.color}10` }}>
                    <Calendar size={16} style={{ color: step.color }} />
                    <span className="text-sm font-medium" style={{ color: step.color }}>
                      Timeline: {step.timeline}
                    </span>
                  </div>

                  {/* Hover Effect Border */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ 
                      border: `2px solid ${step.color}40`,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 p-6 rounded-xl" style={{ backgroundColor: '#f0f9f6', borderLeft: '4px solid #1a5443' }}>
        <p className="text-gray-700 font-light leading-relaxed">
          <span className="font-normal" style={{ color: '#1a5443' }}>Need Help?</span> Our admissions team is here to support you throughout the process. 
          Contact us at <a href="mailto:admissions@africaiim.edu.gn" className="font-medium hover:underline" style={{ color: '#d4a574' }}>admissions@africaiim.edu.gn</a> with any questions.
        </p>
      </div>
    </div>
  );
}
