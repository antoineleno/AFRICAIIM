import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Program', href: '#programs' },
    { label: 'Events & News', href: '#events-news' },
    { label: 'Campus Life', href: '#campus' },
    { label: 'Contact Us', href: '#apply' },
  ];

  const focusAreas = [
    { label: 'Social Sciences', href: '#programs' },
    { label: 'Management & Business', href: '#programs' },
    { label: 'Business Analytics', href: '#programs' },
    { label: 'Computer Science & Decision Analysis', href: '#programs' },
  ];

  return (
    <footer className="py-16 text-white" style={{ backgroundColor: '#1a5443' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg mb-6" style={{ color: '#d4a574' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg mb-6" style={{ color: '#d4a574' }}>
              Focus Areas
            </h3>
            <ul className="space-y-3">
              {focusAreas.map((program) => (
                <li key={program.label}>
                  <motion.a
                    href={program.href}
                    whileHover={{ x: 5 }}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {program.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg mb-6" style={{ color: '#d4a574' }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin size={20} className="flex-shrink-0" style={{ color: '#d4a574' }} />
                <span className="text-white/80">MBA Center Paris, Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" style={{ color: '#d4a574' }} />
                <a href="tel:+33123456789" className="text-white/80 hover:text-white transition-colors">
                  +33 (0)1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" style={{ color: '#d4a574' }} />
                <a href="mailto:admissions@africaiim.edu.gn" className="text-white/80 hover:text-white transition-colors">
                  admissions@africaiim.edu.gn
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/60 text-sm">
            © 2026 AFRICAIIM Business School. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-white/60 hover:text-white transition-colors"
            >
              Cookie Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}