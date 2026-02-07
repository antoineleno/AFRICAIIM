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

  const legalLinks = [
    { label: t('footer.privacyPolicy'), href: '#' },
    { label: t('footer.termsOfService'), href: '#' },
    { label: t('footer.cookiePolicy'), href: '#' },
  ];

  return (
    <footer className="py-16 text-white" style={{ backgroundColor: '#1a5443' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#b8873e' }}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-white/80 hover:text-white transition-colors duration-200 text-base"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#b8873e' }}>
              AFRICAIIM Business School
            </h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Excellence in Education, Empowering Africa's Future Leaders through innovative programs in Management, Social Sciences, and Business Analytics.
            </p>
            <div className="flex gap-4 mt-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white">f</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white">in</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="text-white">𝕏</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#b8873e' }}>
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1" style={{ color: '#b8873e' }} />
                <span className="text-white/80">{t('footer.location')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" style={{ color: '#b8873e' }} />
                <a href="tel:+224620111313" className="text-white/80 hover:text-white transition-colors">
                  +224 620 11 13 13
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" style={{ color: '#b8873e' }} />
                <a href="mailto:contact@africaiimbusinessschool.com" className="text-white/80 hover:text-white transition-colors break-all">
                  contact@africaiimbusinessschool.com
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
            © {new Date().getFullYear()} AFRICAIIM Business School. {t('footer.allRights')}
          </p>
          <div className="flex gap-6 text-sm">
            {legalLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                className="text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}