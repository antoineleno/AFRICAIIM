import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  
  const quickLinks = [
    { label: t('footer.aboutUs'), href: '#about' },
    { label: t('footer.program'), href: '#programs' },
    { label: t('footer.eventsNews'), href: '#events-news' },
    { label: t('footer.campusLife'), href: '#campus' },
  ];

  const focusAreas = [
    { label: t('footer.socialSciences'), href: '#programs' },
    { label: t('footer.managementBusiness'), href: '#programs' },
    { label: t('footer.businessAnalytics'), href: '#programs' },
    { label: t('footer.computerScience'), href: '#programs' },
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
            <h3 className="text-lg mb-6" style={{ color: '#b8873e' }}>
              {t('footer.quickLinks')}
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
            <h3 className="text-lg mb-6" style={{ color: '#b8873e' }}>
              {t('footer.focusAreas')}
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
            <h3 className="text-lg mb-6" style={{ color: '#b8873e' }}>
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin size={20} className="flex-shrink-0" style={{ color: '#b8873e' }} />
                <span className="text-white/80">{t('footer.location')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" style={{ color: '#b8873e' }} />
                <a href="tel:+224123456789" className="text-white/80 hover:text-white transition-colors">
                  +224 123 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" style={{ color: '#b8873e' }} />
                <a href="mailto:info@africaiim.edu.gn" className="text-white/80 hover:text-white transition-colors">
                  info@africaiim.edu.gn
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
            {t('footer.copyright')} {t('footer.allRights')}
          </p>
          <div className="flex gap-6 text-sm">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {t('footer.privacyPolicy')}
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {t('footer.termsOfService')}
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {t('footer.cookiePolicy')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}