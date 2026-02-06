import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, ArrowRight, X, Users, Tag, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EventNewsItem {
  id: string;
  type: 'event' | 'news';
  title: string;
  excerpt: string;
  fullContent: string;
  image: string;
  images?: string[]; // Multiple images for news items
  date: string;
  time?: string;
  location?: string;
  category: string;
  author?: string;
}

export function EventsNews() {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<EventNewsItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'news'>('all');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    affiliation: '',
    areaOfInterest: '',
  });

  // Helper function to check if event has passed
  const isEventPassed = (dateString: string): boolean => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return eventDate < today;
  };

  // Auto-play image gallery for news
  useEffect(() => {
    if (selectedItem && selectedItem.type === 'news' && selectedItem.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === selectedItem.images!.length - 1 ? 0 : prev + 1
        );
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [selectedItem, currentImageIndex]);

  // Reset image index when opening a new item
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedItem]);

  const allItems: EventNewsItem[] = [
    {
      id: '1',
      type: 'event',
      title: t('events.items.graduation2026.title'),
      excerpt: t('events.items.graduation2026.excerpt'),
      fullContent: t('events.items.graduation2026.fullContent'),
      image: 'https://images.unsplash.com/photo-1686213011371-2aff28a08f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZ3JhZHVhdGlvbiUyMGNlcmVtb255JTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwMzY2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: t('events.items.graduation2026.date'),
      time: t('events.items.graduation2026.time'),
      location: t('events.items.graduation2026.location'),
      category: t('events.items.graduation2026.category'),
    },
    {
      id: '2',
      type: 'news',
      title: t('events.items.europeanPartnerships.title'),
      excerpt: t('events.items.europeanPartnerships.excerpt'),
      fullContent: t('events.items.europeanPartnerships.fullContent'),
      image: 'https://images.unsplash.com/photo-1716654716581-3c92ba53de10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudHMlMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwMzY2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1716654716581-3c92ba53de10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudHMlMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwMzY2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1564336899707-dd34a4b165d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdXJvcGVhbiUyMHVuaXZlcnNpdHklMjBidWlsZGluZ3MlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwMzY2ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1752920299180-e8fd9276c202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwbGlicmFyeSUyMGJvb2tzfGVufDF8fHx8MTc3MDI1NjQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1655543274920-06de452d0d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzAzMzE0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      date: 'January 28, 2026',
      category: t('events.items.europeanPartnerships.category'),
      author: t('events.items.europeanPartnerships.author'),
    },
    {
      id: '3',
      type: 'event',
      title: t('events.items.leadershipSummit.title'),
      excerpt: t('events.items.leadershipSummit.excerpt'),
      fullContent: t('events.items.leadershipSummit.fullContent'),
      image: 'https://images.unsplash.com/photo-1769798643237-8642a3fbe5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBwcm9mZXNzaW9uYWwlMjBldmVudHxlbnwxfHx8fDE3NzAzMTUzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'March 20-22, 2026',
      time: '9:00 AM - 6:00 PM',
      location: 'AFRICAIIM Conference Center, Paris',
      category: t('events.items.leadershipSummit.category'),
    },
    {
      id: '4',
      type: 'news',
      title: t('events.items.mastersAdmissions.title'),
      excerpt: t('events.items.mastersAdmissions.excerpt'),
      fullContent: t('events.items.mastersAdmissions.fullContent'),
      image: 'https://images.unsplash.com/photo-1770208524687-9ed3dfa80c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXdhcmRzJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzAzNjYxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1770208524687-9ed3dfa80c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXdhcmRzJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzAzNjYxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1760348082270-3a46a3512850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9uJTIwaGFwcHl8ZW58MXx8fHwxNzcwMzY2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1564336899707-dd34a4b165d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdXJvcGVhbiUyMHVuaXZlcnNpdHklMjBidWlsZGluZ3MlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwMzY2ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1736066330610-c102cab4e942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwdGVhY2hpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzcwMzY2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      date: 'February 5, 2026',
      category: t('events.items.mastersAdmissions.category'),
      author: t('events.items.mastersAdmissions.author'),
    },
    {
      id: '5',
      type: 'event',
      title: t('events.items.aiLectureSeries.title'),
      excerpt: t('events.items.aiLectureSeries.excerpt'),
      fullContent: t('events.items.aiLectureSeries.fullContent'),
      image: 'https://images.unsplash.com/photo-1736066330610-c102cab4e942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzcwMzY2MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'April 10 - May 1, 2026',
      time: '6:00 PM - 8:00 PM',
      location: 'AFRICAIIM Lecture Hall B',
      category: t('events.items.aiLectureSeries.category'),
    },
    {
      id: '6',
      type: 'news',
      title: t('events.items.researchCenter.title'),
      excerpt: t('events.items.researchCenter.excerpt'),
      fullContent: t('events.items.researchCenter.fullContent'),
      image: 'https://images.unsplash.com/photo-1767319257862-e5c5aeb1c628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcmVzZWFyY2glMjBpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAzMTIyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1767319257862-e5c5aeb1c628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcmVzZWFyY2glMjBpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAzMTIyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1766297246906-210617be31a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGxhYm9yYXRvcnklMjBzY2llbnRpc3QlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc3MDM2NjgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1758243907171-dbb3cc264ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGNlbnRlcnxlbnwxfHx8fDE3NzAzNjY4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1655543274920-06de452d0d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzAzMzE0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      date: 'January 15, 2026',
      category: t('events.items.researchCenter.category'),
      author: t('events.items.researchCenter.author'),
    },
  ];

  const filteredItems = allItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'events') return item.type === 'event';
    if (activeFilter === 'news') return item.type === 'news';
    return true;
  });

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 3);

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    setShowRegistrationForm(false);
    setShowRegistrationSuccess(true);
    setRegistrationData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      affiliation: '',
      areaOfInterest: '',
    });
  };

  const nextImage = () => {
    if (selectedItem?.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedItem.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.images!.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="events-news" className="py-32 relative overflow-hidden bg-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#1a5443', filter: 'blur(100px)' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#d4a574', filter: 'blur(100px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-16 h-1 mx-auto mb-6"
            style={{ backgroundColor: '#d4a574' }}
          />
          <div
            className="text-lg uppercase tracking-widest mb-6 font-bold"
            style={{ color: '#b8873e' }}
          >
            {t('events.sectionLabel')}
          </div>
          <h2 className="text-5xl md:text-6xl mb-8 font-light leading-tight" style={{ color: '#1a5443' }}>
            {t('events.label')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
            {t('events.description')}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-16"
        >
          {['all', 'events', 'news'].map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-8 py-3 rounded-full font-light transition-all duration-300 ${
                activeFilter === filter
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300'
              }`}
              style={activeFilter === filter ? { backgroundColor: '#1a5443' } : {}}
            >
              {t(`events.${filter}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Type Badge */}
                <div
                  className="absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: item.type === 'event' ? '#1a5443' : '#d4a574' }}
                >
                  {item.type === 'event' ? 'Event' : 'News'}
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium flex items-center gap-2">
                  <Tag size={14} />
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date and Location */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} style={{ color: '#1a5443' }} />
                    <span className="font-light">{item.date}</span>
                  </div>
                  {item.time && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} style={{ color: '#d4a574' }} />
                      <span className="font-light">{item.time}</span>
                    </div>
                  )}
                </div>

                {item.location && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <MapPin size={16} style={{ color: '#1a5443' }} />
                    <span className="font-light">{item.location}</span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-light mb-3 group-hover:text-opacity-80 transition-all" style={{ color: '#1a5443' }}>
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 font-light leading-relaxed mb-4 line-clamp-3 text-base">
                  {item.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 font-medium group-hover:gap-4 transition-all" style={{ color: '#d4a574' }}>
                  <span>{t('events.readMore')}</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {filteredItems.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-lg text-white font-light text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#1a5443' }}
            >
              {showAll ? t('events.showLess') : `${t('events.viewAll')} ${filteredItems.length} Items`}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
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
                onClick={() => setSelectedItem(null)}
                className="sticky top-4 right-4 float-right z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X size={24} style={{ color: '#1a5443' }} />
              </button>

              {/* Image Gallery for News or Single Image for Events */}
              <div className="relative h-96 overflow-hidden rounded-t-2xl">
                {selectedItem.type === 'news' && selectedItem.images ? (
                  <>
                    {/* Image Gallery with Navigation */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={selectedItem.images[currentImageIndex]}
                        alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
                      style={{ color: '#1a5443' }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
                      style={{ color: '#1a5443' }}
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedItem.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'w-8 bg-white'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Type and Category Badges */}
                <div className="absolute bottom-6 left-6 flex gap-3">
                  <div
                    className="px-4 py-2 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: selectedItem.type === 'event' ? '#1a5443' : '#d4a574' }}
                  >
                    {selectedItem.type === 'event' ? t('events.event') : t('events.newsItem')}
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium flex items-center gap-2">
                    <Tag size={14} />
                    {selectedItem.category}
                  </div>
                  {/* Event Status Badge - only show for events */}
                  {selectedItem.type === 'event' && (
                    <div
                      className="px-4 py-2 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: isEventPassed(selectedItem.date) ? '#6b7280' : '#b8873e' }}
                    >
                      {isEventPassed(selectedItem.date) ? t('events.passed') : t('events.comingSoon')}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight" style={{ color: '#1a5443' }}>
                  {selectedItem.title}
                </h2>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} style={{ color: '#1a5443' }} />
                    <span className="text-gray-700 font-light">{selectedItem.date}</span>
                  </div>
                  {selectedItem.time && (
                    <div className="flex items-center gap-3">
                      <Clock size={20} style={{ color: '#d4a574' }} />
                      <span className="text-gray-700 font-light">{selectedItem.time}</span>
                    </div>
                  )}
                  {selectedItem.location && (
                    <div className="flex items-center gap-3">
                      <MapPin size={20} style={{ color: '#1a5443' }} />
                      <span className="text-gray-700 font-light">{selectedItem.location}</span>
                    </div>
                  )}
                  {selectedItem.author && (
                    <div className="flex items-center gap-3">
                      <Users size={20} style={{ color: '#d4a574' }} />
                      <span className="text-gray-700 font-light">{selectedItem.author}</span>
                    </div>
                  )}
                </div>

                {/* Full Content */}
                <div className="prose prose-lg max-w-none">
                  {selectedItem.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 font-light leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* CTA for Events - only show registration button for upcoming events */}
                {selectedItem.type === 'event' && !isEventPassed(selectedItem.date) && (
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowRegistrationForm(true)}
                      className="w-full md:w-auto px-10 py-4 rounded-lg text-white font-light text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: '#1a5443' }}
                    >
                      {t('events.register')}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showRegistrationForm && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowRegistrationForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 pb-6 border-b border-gray-200">
                <button
                  onClick={() => setShowRegistrationForm(false)}
                  className="float-right p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} style={{ color: '#1a5443' }} />
                </button>
                <h3 className="text-3xl font-light mb-2" style={{ color: '#1a5443' }}>
                  {t('registration.title')}
                </h3>
                <p className="text-gray-600 font-light">
                  {t('registration.subtitle')}: {selectedItem.title}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleRegistrationSubmit} className="p-8">
                {/* First Name and Last Name */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.firstName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={registrationData.firstName}
                      onChange={(e) => setRegistrationData({ ...registrationData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
                      style={{ '--tw-ring-color': '#1a5443' } as any}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.lastName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={registrationData.lastName}
                      onChange={(e) => setRegistrationData({ ...registrationData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
                      style={{ '--tw-ring-color': '#1a5443' } as any}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': '#1a5443' } as any}
                  />
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': '#1a5443' } as any}
                  />
                </div>

                {/* Affiliation/Institution */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registration.affiliation')} *
                  </label>
                  <select
                    required
                    value={registrationData.affiliation}
                    onChange={(e) => setRegistrationData({ ...registrationData, affiliation: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all bg-white"
                    style={{ '--tw-ring-color': '#1a5443' } as any}
                  >
                    <option value="">{t('registration.selectAffiliation')}</option>
                    <option value="AFRICAIIM">AFRICAIIM</option>
                    <option value="Alumni">{t('registration.affiliationOptions.alumni')}</option>
                    <option value="Other">{t('registration.affiliationOptions.other')}</option>
                  </select>
                </div>

                {/* Area of Interest */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('registration.areaOfInterest')} *
                  </label>
                  <select
                    required
                    value={registrationData.areaOfInterest}
                    onChange={(e) => setRegistrationData({ ...registrationData, areaOfInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all bg-white"
                    style={{ '--tw-ring-color': '#1a5443' } as any}
                  >
                    <option value="">{t('registration.selectInterest')}</option>
                    <option value="social-sciences">{t('registration.interestOptions.socialSciences')}</option>
                    <option value="management-business">{t('registration.interestOptions.management')}</option>
                    <option value="business-analytics">{t('registration.interestOptions.analytics')}</option>
                    <option value="computer-science">{t('registration.interestOptions.computerScience')}</option>
                    <option value="bilingual-education">{t('registration.interestOptions.bilingual')}</option>
                    <option value="masters-preparation">{t('registration.interestOptions.masters')}</option>
                    <option value="international-partnerships">{t('registration.interestOptions.partnerships')}</option>
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-lg text-white font-light text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: '#1a5443' }}
                >
                  {t('registration.register')}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Success Modal */}
      <AnimatePresence>
        {showRegistrationSuccess && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowRegistrationSuccess(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-50 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f0f9f6' }}>
                  <CheckCircle size={48} style={{ color: '#1a5443' }} />
                </div>
              </motion.div>

              <h2 className="text-2xl font-light mb-2" style={{ color: '#1a5443' }}>
                {t('registration.successTitle')}
              </h2>
              <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#d4a574' }} />

              <p className="text-gray-600 font-light mb-6 leading-relaxed">
                {t('registration.successMessage')}
              </p>

              <motion.button
                onClick={() => setShowRegistrationSuccess(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 text-white rounded-xl font-light shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#1a5443' }}
              >
                {t('nav.home') === 'Home' ? 'Close' : 'Fermer'}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}