import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, ArrowRight, X, Users, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [selectedItem, setSelectedItem] = useState<EventNewsItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'news'>('all');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    affiliation: '',
    areaOfInterest: '',
  });

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
      title: 'Annual Graduation Ceremony 2026',
      excerpt: 'Join us in celebrating the achievements of our graduating class of 2026. A momentous occasion for students, families, and faculty.',
      fullContent: `We are proud to announce the Annual Graduation Ceremony for the Class of 2026. This prestigious event marks the culmination of years of hard work, dedication, and academic excellence.\n\nThe ceremony will feature keynote speeches from distinguished alumni, industry leaders, and academic scholars. Graduates will receive their degrees and celebrate their achievements with family, friends, and the entire AFRICAIIM community.\n\nThis year's ceremony is particularly special as we celebrate our largest graduating class yet, with students going on to pursue advanced degrees at top universities worldwide including Harvard, MIT, Oxford, and the Sorbonne.\n\nDress code: Academic regalia required for graduates, business formal for guests.\n\nRefreshments and networking reception to follow the ceremony.`,
      image: 'https://images.unsplash.com/photo-1686213011371-2aff28a08f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZ3JhZHVhdGlvbiUyMGNlcmVtb255JTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwMzY2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'June 15, 2026',
      time: '10:00 AM - 2:00 PM',
      location: 'AFRICAIIM Main Auditorium, Paris',
      category: 'Ceremony',
    },
    {
      id: '2',
      type: 'news',
      title: 'AFRICAIIM Partners with Leading European Universities',
      excerpt: 'New strategic partnerships established with top European institutions to enhance student opportunities and academic exchange programs.',
      fullContent: `AFRICAIIM is thrilled to announce new strategic partnerships with several leading European universities, further strengthening our commitment to providing world-class education and global opportunities for our students.\n\nThese partnerships include:\n\n• HEC Paris - Joint research initiatives and faculty exchange\n• London School of Economics - Student exchange program and dual degree options\n• ETH Zurich - Collaboration in Business Analytics and Data Science\n• Sciences Po - Joint seminars and academic conferences\n\nThese collaborations will provide our students with:\n- Enhanced mobility options for study abroad programs\n- Access to joint degree programs\n- Increased research opportunities\n- Expanded network of academic and industry connections\n- Priority consideration for Master's program admissions\n\nDr. Mohamed Camara, Chancellor of AFRICAIIM, stated: "These partnerships represent a significant milestone in our mission to bridge African excellence with global opportunities. Our students will benefit from world-class resources, diverse perspectives, and an expanded network that will serve them throughout their careers."\n\nThe partnerships will take effect from the 2026-2027 academic year.`,
      image: 'https://images.unsplash.com/photo-1716654716581-3c92ba53de10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudHMlMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwMzY2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1716654716581-3c92ba53de10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudHMlMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwMzY2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1564336899707-dd34a4b165d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdXJvcGVhbiUyMHVuaXZlcnNpdHklMjBidWlsZGluZ3MlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwMzY2ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1752920299180-e8fd9276c202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwbGlicmFyeSUyMGJvb2tzfGVufDF8fHx8MTc3MDI1NjQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1655543274920-06de452d0d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzAzMzE0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      date: 'January 28, 2026',
      category: 'Partnerships',
      author: 'AFRICAIIM Communications Office',
    },
    {
      id: '3',
      type: 'event',
      title: 'Global Leadership Summit 2026',
      excerpt: 'International conference bringing together business leaders, policymakers, and academics to discuss the future of African innovation.',
      fullContent: `AFRICAIIM is proud to host the Global Leadership Summit 2026, a premier international conference that brings together visionary leaders, innovators, and change-makers from across the continent and beyond.\n\nTheme: "Shaping Africa's Future: Innovation, Leadership, and Sustainable Growth"\n\nKeynote Speakers:\n• Dr. Ngozi Okonjo-Iweala - Director-General, World Trade Organization\n• Strive Masiyiwa - Founder & Executive Chairman, Econet Group\n• Dr. Vera Songwe - Former UN Under-Secretary-General\n• Tony Elumelu - Chairman, UBA Group & Founder, Tony Elumelu Foundation\n\nPanel Discussions:\n- Digital Transformation in African Markets\n- Sustainable Business Practices and Green Innovation\n- Youth Entrepreneurship and Economic Empowerment\n- The Future of Education in Africa\n\nNetworking Opportunities:\n- Meet industry leaders and potential mentors\n- Connect with fellow students and alumni\n- Explore internship and career opportunities\n- Participate in interactive workshops\n\nRegistration is free for AFRICAIIM students and alumni. Limited seats available for external participants.\n\nDon't miss this opportunity to be part of shaping the future of African leadership and innovation!`,
      image: 'https://images.unsplash.com/photo-1769798643237-8642a3fbe5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBwcm9mZXNzaW9uYWwlMjBldmVudHxlbnwxfHx8fDE3NzAzMTUzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'March 20-22, 2026',
      time: '9:00 AM - 6:00 PM',
      location: 'AFRICAIIM Conference Center, Paris',
      category: 'Conference',
    },
    {
      id: '4',
      type: 'news',
      title: 'Record-Breaking Admissions for Master\'s Programs',
      excerpt: '95% of AFRICAIIM graduates secure admission to top global Master\'s programs, setting a new institutional record.',
      fullContent: `AFRICAIIM celebrates a remarkable achievement as 95% of our Class of 2025 graduates have secured admission to prestigious Master's programs at top universities worldwide, setting a new institutional record.\n\nDestination Universities Include:\n• Harvard University - 8 students\n• MIT - 6 students\n• Oxford University - 12 students\n• Cambridge University - 7 students\n• HEC Paris - 15 students\n• INSEAD - 9 students\n• London School of Economics - 14 students\n• Sorbonne University - 11 students\n\nThis outstanding success reflects:\n- Our rigorous bilingual curriculum\n- Strong emphasis on analytical and critical thinking\n- Personalized mentorship and career guidance\n- Comprehensive academic preparation\n- Global partnerships and recognition\n\nTestimonials from Successful Applicants:\n\n"AFRICAIIM's program prepared me not just academically, but gave me the confidence to compete on a global stage. The bilingual instruction and analytical focus made my transition to Harvard seamless." - Amina K., Harvard Kennedy School\n\n"The faculty's dedication and the program's comprehensive approach to business analytics opened doors I never imagined. I'm now pursuing my Master's at MIT with a full scholarship." - Jean-Paul M., MIT Sloan School of Management\n\nChancellor Dr. Mohamed Camara commented: "These results validate our vision and methodology. When African students receive world-class education and proper support, they excel anywhere in the world. We are immensely proud of our graduates and look forward to their continued success."\n\nApplications for the 2026-2027 academic year are now open.`,
      image: 'https://images.unsplash.com/photo-1770208524687-9ed3dfa80c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXdhcmRzJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzAzNjYxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1770208524687-9ed3dfa80c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXdhcmRzJTIwY2VyZW1vbnklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzAzNjYxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1760348082270-3a46a3512850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9uJTIwaGFwcHl8ZW58MXx8fHwxNzcwMzY2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1564336899707-dd34a4b165d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdXJvcGVhbiUyMHVuaXZlcnNpdHklMjBidWlsZGluZ3MlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwMzY2ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1736066330610-c102cab4e942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwdGVhY2hpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzcwMzY2ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      date: 'February 5, 2026',
      category: 'Academic Excellence',
      author: 'AFRICAIIM Admissions Office',
    },
    {
      id: '5',
      type: 'event',
      title: 'Guest Lecture Series: AI in Business Analytics',
      excerpt: 'Distinguished speaker series featuring leading experts in artificial intelligence and its applications in modern business.',
      fullContent: `Join us for an exclusive Guest Lecture Series exploring the intersection of Artificial Intelligence and Business Analytics. This multi-week series brings renowned experts to share cutting-edge insights and practical applications.\n\nSchedule:\n\nWeek 1: "Introduction to AI in Business Decision Making"\nSpeaker: Dr. Sarah Chen, AI Research Lead at Google\nDate: April 10, 2026\n\nWeek 2: "Machine Learning for Predictive Analytics"\nSpeaker: Prof. Michael Anderson, Stanford University\nDate: April 17, 2026\n\nWeek 3: "Natural Language Processing in Market Research"\nSpeaker: Dr. Fatima Hassan, IBM Research Africa\nDate: April 24, 2026\n\nWeek 4: "Ethical AI and Responsible Innovation"\nSpeaker: Prof. Jean Dupont, Sorbonne University\nDate: May 1, 2026\n\nEach session includes:\n- 60-minute keynote presentation\n- 30-minute Q&A session\n- Networking reception\n- Certificate of attendance\n\nWho Should Attend:\n- Current students interested in Business Analytics\n- Alumni seeking to update their skills\n- Industry professionals exploring AI applications\n- Researchers in related fields\n\nAll lectures will be conducted in English with French translation available. Sessions will also be recorded and made available to registered participants.\n\nRegistration is required. Priority given to AFRICAIIM students and alumni.`,
      image: 'https://images.unsplash.com/photo-1736066330610-c102cab4e942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGwlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzcwMzY2MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'April 10 - May 1, 2026',
      time: '6:00 PM - 8:00 PM',
      location: 'AFRICAIIM Lecture Hall B',
      category: 'Guest Lecture',
    },
    {
      id: '6',
      type: 'news',
      title: 'New Research Center for African Innovation Launched',
      excerpt: 'AFRICAIIM inaugurates state-of-the-art research facility dedicated to studying and promoting innovation across Africa.',
      fullContent: `AFRICAIIM is proud to announce the official launch of the African Innovation Research Center (AIRC), a cutting-edge facility dedicated to advancing research, innovation, and entrepreneurship across the African continent.\n\nFacility Highlights:\n• 5,000 square meters of research space\n• Advanced data analytics laboratories\n• Innovation hub for student startups\n• Collaborative workspaces for interdisciplinary research\n• Video conferencing facilities for international collaboration\n\nResearch Focus Areas:\n1. Digital Economy and Fintech\n2. Sustainable Business Models\n3. Healthcare Innovation\n4. Agricultural Technology\n5. Renewable Energy Solutions\n6. Education Technology\n\nThe center will:\n- Support faculty and student research projects\n- Host visiting scholars and researchers\n- Facilitate partnerships with industry and government\n- Provide resources for startup incubation\n- Organize workshops and training programs\n\nFunding and Support:\nThe center has received generous funding from:\n• African Development Bank\n• European Union Research Fund\n• Private sector partners including Microsoft, IBM, and Google\n• Alumni contributions\n\nDr. Mohamed Camara, Chancellor, stated: "The African Innovation Research Center represents our commitment to not just consuming knowledge, but creating it. We believe that solutions to African challenges will come from African innovators equipped with world-class resources and support."\n\nThe center is now accepting research proposals from faculty and students. Applications open March 1, 2026.\n\nFor more information, visit our website or contact research@africaiim.edu.gn`,
      image: 'https://images.unsplash.com/photo-1767319257862-e5c5aeb1c628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcmVzZWFyY2glMjBpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAzMTIyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      images: [
        'https://images.unsplash.com/photo-1767319257862-e5c5aeb1c628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcmVzZWFyY2glMjBpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAzMTIyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1766297246906-210617be31a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGxhYm9yYXRvcnklMjBzY2llbnRpc3QlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc3MDM2NjgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1758243907171-dbb3cc264ba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGNlbnRlcnxlbnwxfHx8fDE3NzAzNjY4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1655543274920-06de452d0d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzAzMzE0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      date: 'January 15, 2026',
      category: 'Research & Innovation',
      author: 'AFRICAIIM Communications Office',
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
    alert('Registration successful! We will contact you soon.');
    setShowRegistrationForm(false);
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
            className="text-base uppercase tracking-widest mb-6 font-bold"
            style={{ color: '#d4a574' }}
          >
            Stay Connected
          </div>
          <h2 className="text-5xl md:text-6xl mb-8 font-light leading-tight" style={{ color: '#1a5443' }}>
            Events & News
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the latest happenings, achievements, and opportunities at AFRICAIIM
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
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
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
                <h3 className="text-xl font-light mb-3 group-hover:text-opacity-80 transition-all" style={{ color: '#1a5443' }}>
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 font-light leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 font-medium group-hover:gap-4 transition-all" style={{ color: '#d4a574' }}>
                  <span>Read More</span>
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
              {showAll ? 'Show Less' : `View All ${filteredItems.length} Items`}
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
                    {selectedItem.type === 'event' ? 'Event' : 'News'}
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium flex items-center gap-2">
                    <Tag size={14} />
                    {selectedItem.category}
                  </div>
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

                {/* CTA for Events */}
                {selectedItem.type === 'event' && (
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowRegistrationForm(true)}
                      className="w-full md:w-auto px-10 py-4 rounded-lg text-white font-light text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: '#1a5443' }}
                    >
                      Register for This Event
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
                  Event Registration
                </h3>
                <p className="text-gray-600 font-light">
                  {selectedItem.title}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleRegistrationSubmit} className="p-8">
                {/* First Name and Last Name */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
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
                      Last Name *
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
                    Email Address *
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
                    Phone Number *
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
                    Affiliation/Institution *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., AFRICAIIM Student, Alumni, University Name, Company Name"
                    value={registrationData.affiliation}
                    onChange={(e) => setRegistrationData({ ...registrationData, affiliation: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': '#1a5443' } as any}
                  />
                </div>

                {/* Area of Interest */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area of Interest *
                  </label>
                  <select
                    required
                    value={registrationData.areaOfInterest}
                    onChange={(e) => setRegistrationData({ ...registrationData, areaOfInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all bg-white"
                    style={{ '--tw-ring-color': '#1a5443' } as any}
                  >
                    <option value="">Select your area of interest</option>
                    <option value="business-analytics">Business Analytics</option>
                    <option value="strategic-management">Strategic Management & Leadership</option>
                    <option value="entrepreneurship">Entrepreneurship</option>
                    <option value="data-science">Data Science</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="technology">Technology & Innovation</option>
                    <option value="research">Academic Research</option>
                    <option value="other">Other</option>
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
                  Complete Registration
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}