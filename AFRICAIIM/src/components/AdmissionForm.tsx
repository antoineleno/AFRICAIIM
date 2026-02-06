import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle } from 'lucide-react';

export function AdmissionForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <section
        id="apply"
        className="py-24 bg-white"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-12 shadow-2xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle size={64} className="mx-auto mb-6" style={{ color: '#d4a574' }} />
            </motion.div>
            <h2 className="text-3xl mb-4 font-light" style={{ color: '#1a5443' }}>
              Message Sent Successfully!
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Thank you for contacting AFRICAIIM. Our team will review your message and get back to you within 2 business days.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="apply"
      ref={ref}
      className="py-32 bg-gray-50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="text-base uppercase tracking-wider mb-4 font-bold"
            style={{ color: '#d4a574' }}
          >
            Contact Us
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 font-light" style={{ color: '#1a5443' }}>
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Have questions about our program? We're here to help. Fill out the form below and our team will respond promptly.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="firstName" className="block text-sm mb-2 font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-400"
                  style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="lastName" className="block text-sm mb-2 font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-400"
                  style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                />
              </motion.div>
            </div>

            {/* Contact Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-400"
                  style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="phone" className="block text-sm mb-2 font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-400"
                  style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                />
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="subject" className="block text-sm mb-2 font-medium text-gray-700">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-400"
                style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
              >
                <option value="">Select a subject</option>
                <option value="admissions">Admissions Inquiry</option>
                <option value="programs">Programs Information</option>
                <option value="campus">Campus Visit</option>
                <option value="partnerships">Partnerships</option>
                <option value="other">Other</option>
              </select>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label htmlFor="message" className="block text-sm mb-2 font-medium text-gray-700">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 resize-none shadow-sm hover:border-gray-400"
                style={{ '--tw-ring-color': '#d4a574' } as React.CSSProperties}
                placeholder="Tell us how we can help you..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center pt-4"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: '0 15px 40px rgba(26, 84, 67, 0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-lg text-white transition-all duration-300 font-medium shadow-lg"
                style={{ backgroundColor: '#1a5443' }}
              >
                <span>Send Message</span>
                <Send size={20} />
              </motion.button>
              <p className="text-sm text-gray-500 mt-5 font-light">
                All fields marked with * are required
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}