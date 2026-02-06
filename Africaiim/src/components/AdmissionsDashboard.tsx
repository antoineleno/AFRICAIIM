import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  TrendingUp,
  UserCheck,
  UserX,
  Filter,
  Search,
  LogOut,
  AlertCircle,
  User,
  GraduationCap,
  BookOpen,
  Languages,
  Award
} from 'lucide-react';
import logo from 'figma:asset/ec844cec6a228f098ee7a36535042ab0a7a84385.png';
import admissionHeaderImage from '../assets/admission_header.jpg';

interface AdmissionsDashboardProps {
  onLogout: () => void;
}

interface Application {
  id: string;
  // Personal Information
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  city: string;
  countryOfResidence: string;
  address: string;
  // Contact Information
  email: string;
  phone: string;
  phoneNumber: string;
  alternatePhone: string;
  country: string;
  // Academic Background
  highSchoolName: string;
  highSchoolCountry: string;
  graduationYear: string;
  gpa: string;
  previousUniversity?: string;
  previousDegree?: string;
  previousFieldOfStudy?: string;
  previousGraduationYear?: string;
  // Program Selection
  program: string;
  programChoice: string;
  specialization: string;
  intakeYear: string;
  intakeSemester: string;
  // Language Proficiency
  englishProficiency: string;
  englishTestScore?: string;
  frenchProficiency: string;
  frenchTestScore?: string;
  // Motivation
  whyAFRICAIIM: string;
  careerGoals: string;
  academicInterests?: string;
  // Additional Information
  extracurriculars?: string;
  workExperience?: string;
  references?: string;
  // Metadata
  submittedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  academicInfo: {
    gpa: string;
    previousSchool: string;
  };
  documents: string[];
  profilePicture?: string;
}

export function AdmissionsDashboard({ onLogout }: AdmissionsDashboardProps) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'applications'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock data - in real app, this would come from backend
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'AFRI-001',
      firstName: 'Amadou',
      lastName: 'Diallo',
      name: 'Amadou Diallo',
      dateOfBirth: '2005-03-15',
      nationality: 'Guinean',
      city: 'Kindia',
      countryOfResidence: 'Guinea',
      address: '123 Main St, Kindia, Guinea',
      email: 'amadou.diallo@email.com',
      phone: '+224 621 234 567',
      phoneNumber: '+224 621 234 567',
      alternatePhone: '+224 621 234 568',
      country: 'Guinea',
      highSchoolName: 'Lycée Donka',
      highSchoolCountry: 'Guinea',
      graduationYear: '2023',
      gpa: '3.8',
      program: 'Business Analytics',
      programChoice: 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics',
      specialization: 'Business Analytics',
      intakeYear: '2026',
      intakeSemester: 'Fall',
      englishProficiency: 'Advanced',
      englishTestScore: 'IELTS 6.5',
      frenchProficiency: 'Fluent',
      frenchTestScore: 'DELF B2',
      whyAFRICAIIM: 'I am interested in AFRICAIIM because of its strong focus on bilingual education and African perspective on business. The program aligns perfectly with my goals to become a business analyst in West Africa.',
      careerGoals: 'I aim to work as a business analyst for a multinational corporation in Africa, focusing on data-driven decision making and strategic growth.',
      academicInterests: 'Business analytics, data science, and African market research',
      extracurriculars: 'President of school debate club, volunteer at local NGO',
      workExperience: '6 months internship at local bank analyzing customer data',
      references: 'Prof. Ahmed Diallo, Lycée Donka',
      submittedDate: '2026-02-01',
      status: 'pending',
      academicInfo: {
        gpa: '3.8',
        previousSchool: 'Lycée Donka'
      },
      documents: ['transcript.pdf', 'passport.pdf', 'cv.pdf', 'motivation_letter.pdf'],
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces'
    },
    {
      id: 'AFRI-002',
      firstName: 'Fatoumata',
      lastName: 'Bah',
      name: 'Fatoumata Bah',
      dateOfBirth: '2004-07-22',
      nationality: 'Guinean',
      city: 'Conakry',
      countryOfResidence: 'Guinea',
      address: '456 Business Ave, Conakry, Guinea',
      email: 'fatoumata.bah@email.com',
      phone: '+224 622 345 678',
      phoneNumber: '+224 622 345 678',
      alternatePhone: '+224 622 345 679',
      country: 'Guinea',
      highSchoolName: 'Lycée Classique',
      highSchoolCountry: 'Guinea',
      graduationYear: '2022',
      gpa: '3.9',
      program: 'Strategic Management & Leadership',
      programChoice: 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics',
      specialization: 'Strategic Management & Leadership',
      intakeYear: '2026',
      intakeSemester: 'Fall',
      englishProficiency: 'Fluent',
      englishTestScore: 'TOEFL 85',
      frenchProficiency: 'Native',
      frenchTestScore: 'DELF C1',
      whyAFRICAIIM: 'AFRICAIIM offers the best curriculum for developing leadership skills in an African context. The bilingual approach and focus on African business challenges are exactly what I need.',
      careerGoals: 'To become a strategic consultant helping African companies achieve sustainable growth and innovation.',
      academicInterests: 'Strategic management, organizational development, and African entrepreneurship',
      extracurriculars: 'Student council vice president, women in business mentor',
      workExperience: '1 year at international consulting firm as junior consultant',
      references: 'Dr. Marie Sow, Consulting firm director',
      submittedDate: '2026-01-28',
      status: 'accepted',
      academicInfo: {
        gpa: '3.9',
        previousSchool: 'Lycée Classique'
      },
      documents: ['transcript.pdf', 'passport.pdf', 'cv.pdf', 'motivation_letter.pdf', 'language_tests.pdf'],
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces'
    },
    {
      id: 'AFRI-003',
      firstName: 'Ibrahim',
      lastName: 'Camara',
      name: 'Ibrahim Camara',
      dateOfBirth: '2005-06-10',
      nationality: 'Guinean',
      city: 'Mamou',
      countryOfResidence: 'Guinea',
      address: '789 Tech Park, Mamou, Guinea',
      email: 'ibrahim.camara@email.com',
      phone: '+224 623 456 789',
      phoneNumber: '+224 623 456 789',
      alternatePhone: '+224 623 456 790',
      country: 'Guinea',
      highSchoolName: 'Lycée Kipé',
      highSchoolCountry: 'Guinea',
      graduationYear: '2023',
      gpa: '3.7',
      program: 'Business Analytics',
      programChoice: 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics',
      specialization: 'Business Analytics',
      intakeYear: '2026',
      intakeSemester: 'Fall',
      englishProficiency: 'Advanced',
      englishTestScore: 'IELTS 6.0',
      frenchProficiency: 'Intermediate',
      frenchTestScore: 'DELF A2',
      whyAFRICAIIM: 'The hands-on approach to business analytics at AFRICAIIM appeals to me. I want to develop practical skills that I can apply immediately in the African business context.',
      careerGoals: 'To establish a tech startup focused on business intelligence solutions for African SMEs.',
      academicInterests: 'Data analysis, business intelligence, technology entrepreneurship',
      extracurriculars: 'Tech club founder, coding competition participant',
      workExperience: 'Freelance data analyst for 2 small businesses',
      references: 'Eng. Mohamed Diallo, Tech Club Mentor',
      submittedDate: '2026-01-25',
      status: 'pending',
      academicInfo: {
        gpa: '3.7',
        previousSchool: 'Lycée Kipé'
      },
      documents: ['transcript.pdf', 'passport.pdf', 'cv.pdf', 'motivation_letter.pdf'],
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces'
    },
    {
      id: 'AFRI-004',
      firstName: 'Mariama',
      lastName: 'Sow',
      name: 'Mariama Sow',
      dateOfBirth: '2004-11-05',
      nationality: 'Senegalese',
      city: 'Dakar',
      countryOfResidence: 'Senegal',
      address: '321 Leadership Lane, Dakar, Senegal',
      email: 'mariama.sow@email.com',
      phone: '+224 624 567 890',
      phoneNumber: '+224 624 567 890',
      alternatePhone: '+224 624 567 891',
      country: 'Senegal',
      highSchoolName: 'Lycée Blaise Diagne',
      highSchoolCountry: 'Senegal',
      graduationYear: '2023',
      gpa: '3.6',
      program: 'Strategic Management & Leadership',
      programChoice: 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics',
      specialization: 'Strategic Management & Leadership',
      intakeYear: '2026',
      intakeSemester: 'Spring',
      englishProficiency: 'Intermediate',
      englishTestScore: 'IELTS 5.5',
      frenchProficiency: 'Native',
      frenchTestScore: 'DELF C2',
      whyAFRICAIIM: 'As a francophone student from Senegal, AFRICAIIM represents the best opportunity to bridge my regional perspective with world-class management education.',
      careerGoals: 'To lead sustainable development initiatives in West Africa as a business leader.',
      academicInterests: 'Social enterprise, sustainable business, African leadership models',
      extracurriculars: 'Social entrepreneurship club president, community service volunteer',
      workExperience: '8 months with NGO in project management role',
      references: 'Dr. Aminata Gueye, NGO Director',
      submittedDate: '2026-02-03',
      status: 'pending',
      academicInfo: {
        gpa: '3.6',
        previousSchool: 'Lycée Blaise Diagne'
      },
      documents: ['transcript.pdf', 'passport.pdf', 'cv.pdf', 'motivation_letter.pdf'],
      profilePicture: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces'
    },
    {
      id: 'AFRI-005',
      firstName: 'Alpha',
      lastName: 'Barry',
      name: 'Alpha Barry',
      dateOfBirth: '2005-09-18',
      nationality: 'Guinean',
      city: 'Kindia',
      countryOfResidence: 'Guinea',
      address: '555 Student Ave, Kindia, Guinea',
      email: 'alpha.barry@email.com',
      phone: '+224 625 678 901',
      phoneNumber: '+224 625 678 901',
      alternatePhone: '+224 625 678 902',
      country: 'Guinea',
      highSchoolName: 'Lycée 2 Octobre',
      highSchoolCountry: 'Guinea',
      graduationYear: '2024',
      gpa: '3.2',
      program: 'Business Analytics',
      programChoice: 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics',
      specialization: 'Business Analytics',
      intakeYear: '2026',
      intakeSemester: 'Fall',
      englishProficiency: 'Basic',
      englishTestScore: '',
      frenchProficiency: 'Fluent',
      frenchTestScore: 'DELF B1',
      whyAFRICAIIM: 'I want to study at AFRICAIIM because of its reputation.',
      careerGoals: 'To work in business.',
      academicInterests: 'General business studies',
      extracurriculars: 'School sports',
      workExperience: 'None',
      references: '',
      submittedDate: '2026-01-20',
      status: 'rejected',
      academicInfo: {
        gpa: '3.2',
        previousSchool: 'Lycée 2 Octobre'
      },
      documents: ['transcript.pdf', 'passport.pdf'],
      profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces'
    },
    {
      id: 'AFRI-006',
      firstName: 'Aissatou',
      lastName: 'Diallo',
      name: 'Aissatou Diallo',
      dateOfBirth: '2004-04-28',
      nationality: 'Guinean',
      city: 'Kindia',
      countryOfResidence: 'Guinea',
      address: '888 Excellence St, Kindia, Guinea',
      email: 'aissatou.diallo@email.com',
      phone: '+224 626 789 012',
      phoneNumber: '+224 626 789 012',
      alternatePhone: '+224 626 789 013',
      country: 'Guinea',
      highSchoolName: 'Lycée Coronthie',
      highSchoolCountry: 'Guinea',
      graduationYear: '2022',
      gpa: '3.85',
      program: 'Strategic Management & Leadership',
      programChoice: 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics',
      specialization: 'Strategic Management & Leadership',
      intakeYear: '2026',
      intakeSemester: 'Fall',
      englishProficiency: 'Advanced',
      englishTestScore: 'IELTS 7.0',
      frenchProficiency: 'Fluent',
      frenchTestScore: 'DELF B2',
      whyAFRICAIIM: 'AFRICAIIM is the perfect choice for developing comprehensive leadership skills with an African-centered approach. The curriculum and faculty are world-class.',
      careerGoals: 'To become a C-suite executive leading transformational change in African corporations.',
      academicInterests: 'Organizational leadership, strategic change management, corporate governance',
      extracurriculars: 'Debate champion, leadership development program participant, mentor to younger students',
      workExperience: '1 year as leadership intern at major corporation',
      references: 'Prof. Fatou Diallo, Leadership Program Director',
      submittedDate: '2026-02-05',
      status: 'pending',
      academicInfo: {
        gpa: '3.85',
        previousSchool: 'Lycée Coronthie'
      },
      documents: ['transcript.pdf', 'passport.pdf', 'cv.pdf', 'motivation_letter.pdf', 'language_tests.pdf'],
      profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces'
    }
  ]);

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    acceptanceRate: ((applications.filter(app => app.status === 'accepted').length / applications.filter(app => app.status !== 'pending').length) * 100).toFixed(1)
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleReviewApplication = (app: Application) => {
    setSelectedApplication(app);
    setShowReviewModal(true);
  };

  const handleUpdateStatus = (applicationId: string, newStatus: 'accepted' | 'rejected') => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    setShowReviewModal(false);
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={logo} alt="AFRICAIIM Logo" className="h-16 w-16" />
              <div className="hidden sm:block">
                <div className="text-xl font-bold tracking-wide" style={{ color: '#1a5443' }}>
                  AFRICAIIM
                </div>
                <div className="text-lg font-bold tracking-wider" style={{ color: '#d4a574' }}>
                  {t('adminDashboard.admissionsPortal')}
                </div>
              </div>
            </motion.div>
            
            {/* Logout Button */}
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition-all duration-300"
              style={{ backgroundColor: '#1a5443' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <LogOut size={18} />
              <span>{t('adminDashboard.logout')}</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`py-4 border-b-2 transition-all text-base font-normal ${
                selectedTab === 'overview'
                  ? 'border-[#1a5443] text-[#1a5443]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('adminDashboard.overview')}
            </button>
            <button
              onClick={() => setSelectedTab('applications')}
              className={`py-4 border-b-2 transition-all text-base font-normal ${
                selectedTab === 'applications'
                  ? 'border-[#1a5443] text-[#1a5443]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('adminDashboard.applications')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Welcome Banner */}
            <div className="relative rounded-2xl overflow-hidden mb-8 h-64">
              <img
                src={admissionHeaderImage}
                alt="Campus"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 84, 67, 0.65), rgba(212, 165, 116, 0.55))'
                }}
              >
                <div className="text-center text-white">
                  <h1 className="text-4xl font-light mb-2">{t('adminDashboard.welcomeTitle')}</h1>
                  <p className="text-lg font-light opacity-90">{t('adminDashboard.academicYear')}</p>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(26, 84, 67, 0.15)' }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl shadow-sm flex-shrink-0" style={{ backgroundColor: '#e6f3ef' }}>
                      <Users size={28} style={{ color: '#1a5443' }} />
                    </div>
                    <p className="text-4xl font-bold" style={{ color: '#1a5443' }}>{stats.total}</p>
                  </div>
                  <p className="text-base text-gray-600 font-medium">{t('adminDashboard.totalApplications')}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(212, 165, 116, 0.15)' }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm flex-shrink-0">
                      <Clock size={28} style={{ color: '#d4a574' }} />
                    </div>
                    <p className="text-4xl font-bold" style={{ color: '#d4a574' }}>{stats.pending}</p>
                  </div>
                  <p className="text-base text-gray-600 font-medium">{t('adminDashboard.pendingReview')}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(22, 163, 74, 0.15)' }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100 shadow-sm flex-shrink-0">
                      <CheckCircle2 size={28} className="text-green-600" />
                    </div>
                    <p className="text-4xl font-bold text-green-600">{stats.accepted}</p>
                  </div>
                  <p className="text-base text-gray-600 font-medium">{t('adminDashboard.accepted')}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(220, 38, 38, 0.15)' }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-red-100 shadow-sm flex-shrink-0">
                      <XCircle size={28} className="text-red-600" />
                    </div>
                    <p className="text-4xl font-bold text-red-600">{stats.rejected}</p>
                  </div>
                  <p className="text-base text-gray-600 font-medium">{t('adminDashboard.rejected')}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(26, 84, 67, 0.15)' }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 rounded-xl shadow-sm flex-shrink-0" style={{ backgroundColor: '#e6f3ef' }}>
                      <UserCheck size={28} style={{ color: '#1a5443' }} />
                    </div>
                    <p className="text-4xl font-bold" style={{ color: '#1a5443' }}>{stats.acceptanceRate}%</p>
                  </div>
                  <p className="text-base text-gray-600 font-medium">{t('adminDashboard.acceptanceRate')}</p>
                </div>
              </motion.div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold" style={{ color: '#1a5443' }}>{t('adminDashboard.recentApplications')}</h2>
                <button
                  onClick={() => setSelectedTab('applications')}
                  className="text-base font-medium hover:underline"
                  style={{ color: '#1a5443' }}
                >
                  {t('adminDashboard.viewAll')} →
                </button>
              </div>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: '#1a5443' }}>
                        {app.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-base font-normal text-gray-900">{app.name}</p>
                        <p className="text-sm text-gray-600 font-normal">{app.id} • {app.program}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status === 'pending' ? t('adminDashboard.pending') :
                         app.status === 'accepted' ? t('adminDashboard.accepted') :
                         t('adminDashboard.rejected')}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleReviewApplication(app)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                      >
                        <Eye size={18} className="text-gray-600" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('adminDashboard.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 font-normal"
                    style={{ focusRing: '#1a5443' }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-5 py-2.5 rounded-lg text-base font-normal transition-all ${
                      filterStatus === 'all'
                        ? 'bg-[#1a5443] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('adminDashboard.all')}
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-5 py-2.5 rounded-lg text-base font-normal transition-all ${
                      filterStatus === 'pending'
                        ? 'bg-[#d4a574] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('adminDashboard.pending')}
                  </button>
                  <button
                    onClick={() => setFilterStatus('accepted')}
                    className={`px-5 py-2.5 rounded-lg text-base font-normal transition-all ${
                      filterStatus === 'accepted'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('adminDashboard.accepted')}
                  </button>
                  <button
                    onClick={() => setFilterStatus('rejected')}
                    className={`px-5 py-2.5 rounded-lg text-base font-normal transition-all ${
                      filterStatus === 'rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('adminDashboard.rejected')}
                  </button>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-base font-normal text-gray-700">{t('adminDashboard.applicationId')}</th>
                      <th className="px-6 py-4 text-left text-base font-normal text-gray-700">{t('adminDashboard.applicant')}</th>
                      <th className="px-6 py-4 text-left text-base font-normal text-gray-700">{t('adminDashboard.program')}</th>
                      <th className="px-6 py-4 text-left text-base font-normal text-gray-700">{t('adminDashboard.submitted')}</th>
                      <th className="px-6 py-4 text-left text-base font-normal text-gray-700">{t('adminDashboard.status')}</th>
                      <th className="px-6 py-4 text-left text-base font-normal text-gray-700">{t('adminDashboard.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-base font-light">{app.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-base font-normal">{app.name}</p>
                            <p className="text-sm text-gray-600 font-light">{app.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-base font-light">{app.program}</td>
                        <td className="px-6 py-4 text-base font-light">{new Date(app.submittedDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-normal ${
                            app.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status === 'pending' ? t('adminDashboard.pending') :
                             app.status === 'accepted' ? t('adminDashboard.accepted') :
                             t('adminDashboard.rejected')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReviewApplication(app)}
                            className="px-5 py-2.5 rounded-lg text-base font-normal text-white hover:shadow-lg transition-all"
                            style={{ backgroundColor: '#1a5443' }}
                          >
                            {t('adminDashboard.review')}
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && selectedApplication && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowReviewModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-light" style={{ color: '#1a5443' }}>
                      {t('adminDashboard.applicationReview')}
                    </h2>
                    <p className="text-sm text-gray-600 font-light mt-1">{selectedApplication.id}</p>
                  </div>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-8 py-6 space-y-6 max-h-[calc(90vh-150px)] overflow-y-auto">
                {/* Passport Size Photo */}
                {selectedApplication.profilePicture && (
                  <div className="flex justify-center mb-6">
                    <img
                      src={selectedApplication.profilePicture}
                      alt={t('adminDashboard.applicantPhoto')}
                      className="h-40 w-40 rounded-full object-cover border-4 shadow-lg"
                      style={{ borderColor: '#d4a574' }}
                    />
                  </div>
                )}

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <User size={20} />
                    {t('adminDashboard.personalInformation')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.fullName')}</p>
                      <p className="font-normal">{selectedApplication.firstName} {selectedApplication.lastName}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.dateOfBirth')}</p>
                      <p className="font-normal">{selectedApplication.dateOfBirth}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.nationality')}</p>
                      <p className="font-normal">{selectedApplication.nationality}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.city')}</p>
                      <p className="font-normal">{selectedApplication.city}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.address')}</p>
                      <p className="font-normal">{selectedApplication.address}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <Mail size={20} />
                    {t('adminDashboard.contactInformation')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.email')}</p>
                      <p className="font-normal text-sm break-all">{selectedApplication.email}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.phoneNumber')}</p>
                      <p className="font-normal">{selectedApplication.phoneNumber}</p>
                    </div>
                    {selectedApplication.alternatePhone && (
                      <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                        <p className="text-sm text-gray-600 font-light">{t('adminDashboard.alternatePhone')}</p>
                        <p className="font-normal">{selectedApplication.alternatePhone}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Academic Background */}
                <div>
                  <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <GraduationCap size={20} />
                    {t('adminDashboard.academicBackground')}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                      <p className="font-normal mb-3" style={{ color: '#1a5443' }}>{t('adminDashboard.highSchoolEducation')}</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600 font-light">{t('adminDashboard.schoolName')}</p>
                          <p className="font-normal">{selectedApplication.highSchoolName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-light">{t('adminDashboard.country')}</p>
                          <p className="font-normal">{selectedApplication.highSchoolCountry}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-light">{t('adminDashboard.graduationYear')}</p>
                          <p className="font-normal">{selectedApplication.graduationYear}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-light">{t('adminDashboard.gpa')}</p>
                          <p className="font-normal">{selectedApplication.gpa}/4.0</p>
                        </div>
                      </div>
                    </div>
                    {selectedApplication.previousUniversity && (
                      <div className="p-4 rounded-lg bg-green-50 border-l-4 border-green-400">
                        <p className="font-normal mb-3" style={{ color: '#1a5443' }}>Previous Higher Education</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600 font-light">University</p>
                            <p className="font-normal">{selectedApplication.previousUniversity}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-light">Degree</p>
                            <p className="font-normal">{selectedApplication.previousDegree}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-light">Field of Study</p>
                            <p className="font-normal">{selectedApplication.previousFieldOfStudy}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-light">Graduation Year</p>
                            <p className="font-normal">{selectedApplication.previousGraduationYear}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Program Selection */}
                <div>
                  <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <BookOpen size={20} />
                    {t('adminDashboard.programSelection')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.specialization')}</p>
                      <p className="font-normal text-sm">{selectedApplication.specialization}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.intakeYear')}</p>
                      <p className="font-normal">{selectedApplication.intakeYear}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.intakeSemester')}</p>
                      <p className="font-normal">{selectedApplication.intakeSemester}</p>
                    </div>
                  </div>
                </div>

                {/* Language Proficiency */}
                <div>
                  <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <Languages size={20} />
                    {t('adminDashboard.languageProficiency')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.english')}</p>
                      <p className="font-normal">{selectedApplication.englishProficiency}</p>
                      {selectedApplication.englishTestScore && (
                        <p className="text-xs text-gray-600 mt-1">{selectedApplication.englishTestScore}</p>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light">{t('adminDashboard.french')}</p>
                      <p className="font-normal">{selectedApplication.frenchProficiency}</p>
                      {selectedApplication.frenchTestScore && (
                        <p className="text-xs text-gray-600 mt-1">{selectedApplication.frenchTestScore}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motivation & Goals */}
                <div>
                  <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <Award size={20} />
                    {t('adminDashboard.motivationGoals')}
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light mb-2">{t('adminDashboard.whyAfricaiim')}</p>
                      <p className="text-sm leading-relaxed">{selectedApplication.whyAFRICAIIM}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light mb-2">{t('adminDashboard.careerGoals')}</p>
                      <p className="text-sm leading-relaxed">{selectedApplication.careerGoals}</p>
                    </div>
                    {selectedApplication.academicInterests && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-light mb-2">{t('adminDashboard.academicInterests')}</p>
                        <p className="text-sm leading-relaxed">{selectedApplication.academicInterests}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <Award size={20} />
                    {t('adminDashboard.additionalInformation')}
                  </h3>
                  <div className="space-y-3">
                    {selectedApplication.extracurriculars && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-light mb-2">{t('adminDashboard.extracurricularActivities')}</p>
                        <p className="text-sm leading-relaxed">{selectedApplication.extracurriculars}</p>
                      </div>
                    )}
                    {selectedApplication.workExperience && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-light mb-2">{t('adminDashboard.workExperience')}</p>
                        <p className="text-sm leading-relaxed">{selectedApplication.workExperience}</p>
                      </div>
                    )}
                    {selectedApplication.references && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-light mb-2">{t('adminDashboard.references')}</p>
                        <p className="text-sm leading-relaxed">{selectedApplication.references}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-normal mb-4" style={{ color: '#1a5443' }}>{t('adminDashboard.academicInformation')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light mb-1">{t('adminDashboard.preferredProgram')}</p>
                      <p className="font-normal">{selectedApplication.program}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light mb-1">{t('adminDashboard.gpa')}</p>
                      <p className="font-normal">{selectedApplication.academicInfo.gpa}/4.0</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                      <p className="text-sm text-gray-600 font-light mb-1">{t('adminDashboard.previousSchool')}</p>
                      <p className="font-normal">{selectedApplication.academicInfo.previousSchool}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-normal mb-4" style={{ color: '#1a5443' }}>{t('adminDashboard.submittedDocuments')}</h3>
                  <div className="space-y-2">
                    {selectedApplication.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-gray-400" />
                          <span className="text-sm font-light">{doc}</span>
                        </div>
                        <button className="text-sm font-light hover:underline" style={{ color: '#1a5443' }}>
                          <Download size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submission Date */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-light">{t('adminDashboard.submittedOn')}</p>
                    <p className="font-normal">{new Date(selectedApplication.submittedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              {selectedApplication.status === 'pending' && (
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-6 rounded-b-2xl">
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'rejected')}
                      className="flex-1 py-3 px-6 rounded-xl font-light text-white bg-red-600 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <UserX size={20} />
                      Reject Application
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'accepted')}
                      className="flex-1 py-3 px-6 rounded-xl font-light text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#1a5443' }}
                    >
                      <UserCheck size={20} />
                      Accept Application
                    </motion.button>
                  </div>
                </div>
              )}

              {selectedApplication.status !== 'pending' && (
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-6 rounded-b-2xl">
                  <div className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl ${
                    selectedApplication.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedApplication.status === 'accepted' ? (
                      <>
                        <CheckCircle2 size={20} />
                        <span className="font-normal">Application Accepted</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={20} />
                        <span className="font-normal">Application Rejected</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
