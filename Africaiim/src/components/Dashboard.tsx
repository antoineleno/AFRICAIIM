import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  FileText, 
  LogOut, 
  GraduationCap, 
  CheckCircle, 
  Clock,
  Upload,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin,
  BookOpen,
  Award,
  Languages,
  FileUp,
  XCircle,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import logo from 'figma:asset/ec844cec6a228f098ee7a36535042ab0a7a84385.png';
import { ApplicationModals } from './ApplicationModals';
import { DashboardAdmissionsProcess } from './DashboardAdmissionsProcess';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'application' | 'admissions-process'>('overview');
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'draft' | 'submitted' | 'under-review' | 'accepted'>('draft');
  const [showReview, setShowReview] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({
    profilePicture: null,
    transcript: null,
    passport: null,
    cv: null,
    motivationLetter: null,
    languageTests: null,
    universityTranscripts: null,
  });
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    countryOfResidence: '',
    city: '',
    address: '',
    
    // Contact Information
    email: userEmail,
    phoneNumber: '',
    alternatePhone: '',
    
    // Academic Background
    highSchoolName: '',
    highSchoolCountry: '',
    graduationYear: '',
    gpa: '',
    
    // Previous Higher Education (if any)
    previousUniversity: '',
    previousDegree: '',
    previousFieldOfStudy: '',
    previousGraduationYear: '',
    
    // Program Selection
    programChoice: 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics',
    specialization: '',
    intakeYear: '',
    intakeSemester: '',
    
    // Language Proficiency
    englishProficiency: '',
    frenchProficiency: '',
    englishTestScore: '',
    frenchTestScore: '',
    
    // Motivation
    whyAFRICAIIM: '',
    careerGoals: '',
    academicInterests: '',
    
    // Additional Information
    extracurriculars: '',
    workExperience: '',
    references: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReview(true);
  };

  const handleFinalSubmit = () => {
    setHasApplied(true);
    setApplicationStatus('submitted');
    setShowReview(false);
    setShowSuccessModal(true);
    // Here you would normally send the data to your backend
    console.log('Application submitted:', formData);
    console.log('Uploaded documents:', uploadedDocuments);
  };

  const handleSaveDraft = () => {
    // Save draft logic
    console.log('Draft saved:', formData);
    alert('Draft saved successfully!');
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, docName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocuments({
        ...uploadedDocuments,
        [docName]: file,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-md sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="AFRICAIIM Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl font-light" style={{ color: '#1a5443' }}>
                  {t('dashboard.applicationPortal')}
                </h1>
                <p className="text-sm text-gray-500 font-light">{t('dashboard.welcomeBack')}, {userEmail}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all duration-300"
              style={{ backgroundColor: '#1a5443' }}
            >
              <LogOut size={18} />
              <span className="font-light">{t('dashboard.logout')}</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-2 mb-8 flex gap-2"
        >
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-light ${
              activeTab === 'overview'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={activeTab === 'overview' ? { backgroundColor: '#1a5443' } : {}}
          >
            <User size={20} />
            <span>{t('dashboard.overview')}</span>
          </button>
          <button
            onClick={() => setActiveTab('application')}
            className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-light ${
              activeTab === 'application'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={activeTab === 'application' ? { backgroundColor: '#d4a574' } : {}}
          >
            <FileText size={20} />
            <span>{t('dashboard.application')}</span>
          </button>
          <button
            onClick={() => setActiveTab('admissions-process')}
            className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-light ${
              activeTab === 'admissions-process'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            style={activeTab === 'admissions-process' ? { backgroundColor: '#1a5443' } : {}}
          >
            <GraduationCap size={20} />
            <span>{t('dashboard.admissionsProcess')}</span>
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Application Status Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap size={28} style={{ color: '#1a5443' }} />
                  <h2 className="text-2xl font-light" style={{ color: '#1a5443' }}>
                    {t('dashboard.applicationStatus')}
                  </h2>
                </div>

                {hasApplied ? (
                  <div className="space-y-4">
                    {/* Current Status Card */}
                    <div 
                      className="flex items-center justify-between p-6 rounded-lg border-2 transition-all duration-300" 
                      style={{ 
                        borderColor: applicationStatus === 'accepted' ? '#1a5443' : 
                                    applicationStatus === 'submitted' || applicationStatus === 'under-review' ? '#d4a574' : 
                                    applicationStatus === 'draft' ? '#9ca3af' : '#ef4444',
                        backgroundColor: applicationStatus === 'accepted' ? '#f0f9f6' : 
                                       applicationStatus === 'submitted' || applicationStatus === 'under-review' ? '#fffbeb' : 
                                       applicationStatus === 'draft' ? '#f9fafb' : '#fef2f2'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {applicationStatus === 'draft' && <AlertCircle size={32} className="text-gray-400" />}
                        {(applicationStatus === 'submitted' || applicationStatus === 'under-review') && <Clock size={32} style={{ color: '#d4a574' }} />}
                        {applicationStatus === 'accepted' && <CheckCircle2 size={32} style={{ color: '#1a5443' }} />}
                        {applicationStatus === 'rejected' && <XCircle size={32} className="text-red-500" />}
                        
                        <div>
                          <p className="font-normal text-lg" style={{ 
                            color: applicationStatus === 'accepted' ? '#1a5443' : 
                                  applicationStatus === 'submitted' || applicationStatus === 'under-review' ? '#92400e' : 
                                  applicationStatus === 'draft' ? '#374151' : '#991b1b'
                          }}>
                            {applicationStatus === 'draft' && t('dashboard.draft')}
                            {applicationStatus === 'submitted' && t('dashboard.inProcess')}
                            {applicationStatus === 'under-review' && t('dashboard.underReview')}
                            {applicationStatus === 'accepted' && t('dashboard.accepted')}
                            {applicationStatus === 'rejected' && t('dashboard.rejected')}
                          </p>
                          <p className="text-sm text-gray-600 font-light mt-1">
                            {applicationStatus === 'draft' && t('dashboard.draftMessage')}
                            {applicationStatus === 'submitted' && t('dashboard.submittedMessage')}
                            {applicationStatus === 'under-review' && t('dashboard.underReviewMessage')}
                            {applicationStatus === 'accepted' && t('dashboard.acceptedMessage')}
                            {applicationStatus === 'rejected' && t('dashboard.rejectedMessage')}
                          </p>
                        </div>
                      </div>
                      
                      <span 
                        className="px-4 py-2 rounded-full text-xs font-light whitespace-nowrap" 
                        style={{ 
                          backgroundColor: applicationStatus === 'accepted' ? '#d1fae5' : 
                                         applicationStatus === 'submitted' || applicationStatus === 'under-review' ? '#fef3c7' : 
                                         applicationStatus === 'draft' ? '#f3f4f6' : '#fee2e2',
                          color: applicationStatus === 'accepted' ? '#065f46' : 
                                applicationStatus === 'submitted' || applicationStatus === 'under-review' ? '#92400e' : 
                                applicationStatus === 'draft' ? '#374151' : '#991b1b'
                        }}
                      >
                        {t('dashboard.currentStatus')}
                      </span>
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 font-light">{t('dashboard.program')}</p>
                        <p className="font-normal mt-1">
                          {formData.programChoice === 'Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics' 
                            ? t('dashboard.bachelorOfScience') + ' - ' + t('dashboard.programDescription')
                            : formData.programChoice || t('dashboard.notSpecified')}
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 font-light">{t('dashboard.intake')}</p>
                        <p className="font-normal mt-1">
                          {formData.intakeSemester === 'Fall' ? t('dashboard.fall') : 
                           formData.intakeSemester === 'Spring' ? t('dashboard.spring') : 
                           formData.intakeSemester} {formData.intakeYear}
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 font-light">{t('dashboard.submissionDate')}</p>
                        <p className="font-normal mt-1">{new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 font-light">{t('dashboard.applicationId')}</p>
                        <p className="font-normal mt-1">AFRI-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('application')}
                      className="w-full mt-6 py-3 border-2 rounded-xl font-light transition-all duration-300"
                      style={{ borderColor: '#1a5443', color: '#1a5443' }}
                    >
                      {t('dashboard.viewFullApplication')}
                    </motion.button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-normal text-gray-700 mb-2">{t('dashboard.noApplicationYet')}</h3>
                    <p className="text-gray-500 font-light mb-6">
                      {t('dashboard.startYourJourney')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('application')}
                      className="px-8 py-3 rounded-xl text-white font-light shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: '#1a5443' }}
                    >
                      {t('dashboard.startApplication')}
                    </motion.button>
                  </div>
                )}
              </div>


            </motion.div>
          ) : activeTab === 'application' ? (
            <motion.div
              key="application"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <FileText size={28} style={{ color: '#1a5443' }} />
                    <h2 className="text-2xl font-light" style={{ color: '#1a5443' }}>
                      {t('dashboard.admissionApplication')}
                    </h2>
                  </div>
                  {!hasApplied && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveDraft}
                      className="px-6 py-2 border-2 rounded-lg font-light transition-all duration-300"
                      style={{ borderColor: '#d4a574', color: '#d4a574' }}
                    >
                      {t('dashboard.saveDraft')}
                    </motion.button>
                  )}
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <User size={24} />
                      {t('dashboard.personalInformation')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.firstName')} *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          placeholder={t('dashboard.enterFirstName')}
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.lastName')} *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          placeholder={t('dashboard.enterLastName')}
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.dateOfBirth')} *</label>
                        <div className="relative">
                          <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            required
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.nationality')} *</label>
                        <div className="relative">
                          <Globe size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            placeholder={t('dashboard.yourNationality')}
                            required
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.countryOfResidence')} *</label>
                        <input
                          type="text"
                          name="countryOfResidence"
                          value={formData.countryOfResidence}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          placeholder={t('dashboard.currentCountry')}
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.city')} *</label>
                        <div className="relative">
                          <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            placeholder={t('dashboard.yourCity')}
                            required
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.address')} *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          placeholder={t('dashboard.fullAddress')}
                          required
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Passport Size Photo Upload */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <User size={24} />
                      {t('dashboard.passportSizePhoto')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition-all cursor-pointer block"
                        style={uploadedDocuments.profilePicture ? { borderColor: '#1a5443', backgroundColor: '#f0f9f6' } : {}}>
                        <div className="flex flex-col items-center justify-center text-center">
                          {uploadedDocuments.profilePicture ? (
                            <>
                              <CheckCircle2 size={40} style={{ color: '#1a5443' }} className="mb-2" />
                              <p className="text-sm font-normal text-gray-700">{uploadedDocuments.profilePicture.name}</p>
                              <p className="text-xs font-light text-gray-600 mt-1">{t('dashboard.photoFormat')}</p>
                              <span className="mt-3 px-4 py-2 text-sm rounded-lg transition-all duration-300 border-2" style={{ borderColor: '#1a5443', color: '#1a5443' }}>
                                {t('dashboard.changePhoto')}
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload size={32} className="text-gray-400 mb-2" />
                              <p className="text-sm font-normal text-gray-700">{t('dashboard.passportSizePhoto')}</p>
                              <p className="text-xs text-gray-500 font-light mt-1">{t('dashboard.photoFormat')}</p>
                              <span className="mt-3 px-4 py-2 text-sm rounded-lg transition-all duration-300 border-2" style={{ borderColor: '#1a5443', color: '#1a5443' }}>
                                {t('dashboard.uploadPhoto')}
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleDocumentUpload(e, 'profilePicture')}
                            className="hidden"
                            disabled={hasApplied}
                          />
                        </div>
                      </label>
                      {uploadedDocuments.profilePicture && (
                        <div className="flex items-center justify-center p-6 rounded-lg border-2" style={{ borderColor: '#d4a57430', backgroundColor: '#f9f9f9' }}>
                          <img
                            src={URL.createObjectURL(uploadedDocuments.profilePicture)}
                            alt="Profile Preview"
                            className="max-h-48 max-w-48 rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Mail size={24} />
                      {t('dashboard.contactInformation')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.emailAddress')} *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.phoneNumber')} *</label>
                        <div className="relative">
                          <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            placeholder="+1 234 567 8900"
                            required
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.alternatePhone')}</label>
                        <div className="relative">
                          <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="alternatePhone"
                            value={formData.alternatePhone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                            placeholder="+1 234 567 8900"
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <GraduationCap size={24} />
                      {t('dashboard.academicBackground')}
                    </h3>
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f6' }}>
                        <p className="text-sm font-normal mb-4" style={{ color: '#1a5443' }}>{t('dashboard.highSchoolEducation')}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">High School Name *</label>
                            <input
                              type="text"
                              name="highSchoolName"
                              value={formData.highSchoolName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all bg-white"
                              placeholder="Name of your high school"
                              required
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Country *</label>
                            <input
                              type="text"
                              name="highSchoolCountry"
                              value={formData.highSchoolCountry}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all bg-white"
                              placeholder="Country"
                              required
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Graduation Year *</label>
                            <input
                              type="number"
                              name="graduationYear"
                              value={formData.graduationYear}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all bg-white"
                              placeholder="2024"
                              min="1950"
                              max="2030"
                              required
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">GPA / Grade *</label>
                            <input
                              type="text"
                              name="gpa"
                              value={formData.gpa}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all bg-white"
                              placeholder="e.g., 3.8/4.0 or 85%"
                              required
                              disabled={hasApplied}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm font-normal mb-4 text-gray-700">Previous Higher Education (Optional)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">University Name</label>
                            <input
                              type="text"
                              name="previousUniversity"
                              value={formData.previousUniversity}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                              placeholder="Name of university"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Degree Type</label>
                            <input
                              type="text"
                              name="previousDegree"
                              value={formData.previousDegree}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                              placeholder="e.g., Bachelor's"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Field of Study</label>
                            <input
                              type="text"
                              name="previousFieldOfStudy"
                              value={formData.previousFieldOfStudy}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                              placeholder="Major/Field"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Graduation Year</label>
                            <input
                              type="number"
                              name="previousGraduationYear"
                              value={formData.previousGraduationYear}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                              placeholder="Year"
                              min="1950"
                              max="2030"
                              disabled={hasApplied}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <BookOpen size={24} />
                      {t('dashboard.programSelection')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.program')} *</label>
                        <div className="p-4 rounded-lg border-2" style={{ borderColor: '#1a5443', backgroundColor: '#f0f9f6' }}>
                          <p className="font-normal mb-1" style={{ color: '#1a5443' }}>
                            {t('dashboard.bachelorOfScience')}
                          </p>
                          <p className="text-sm text-gray-600 font-light">
                            {t('dashboard.programDescription')}
                          </p>
                          <p className="text-xs text-gray-500 font-light mt-2">
                            {t('dashboard.programDetails')}
                          </p>
                        </div>
                        <input
                          type="hidden"
                          name="programChoice"
                          value="Bachelor of Science (BSc) - Social Sciences, Management & Business Analytics"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.preferredSpecialization')} *</label>
                        <select
                          name="specialization"
                          value={formData.specialization || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          required
                          disabled={hasApplied}
                        >
                          <option value="">{t('dashboard.selectSpecialization')}</option>
                          <option value="Business Analytics">{t('dashboard.businessAnalytics')}</option>
                          <option value="Strategic Management & Leadership">{t('dashboard.strategicManagement')}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.intakeYear')} *</label>
                        <select
                          name="intakeYear"
                          value={formData.intakeYear}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          required
                          disabled={hasApplied}
                        >
                          <option value="">{t('dashboard.selectYear')}</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.intakeSemester')} *</label>
                        <select
                          name="intakeSemester"
                          value={formData.intakeSemester}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          required
                          disabled={hasApplied}
                        >
                          <option value="">{t('dashboard.selectSemester')}</option>
                          <option value="Fall">{t('dashboard.fall')}</option>
                          <option value="Spring">{t('dashboard.spring')}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Language Proficiency */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Languages size={24} />
                      {t('dashboard.languageProficiency')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg border-2 border-gray-200">
                        <p className="font-normal mb-3" style={{ color: '#1a5443' }}>{t('dashboard.englishProficiency')} *</p>
                        <select
                          name="englishProficiency"
                          value={formData.englishProficiency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all mb-3"
                          required
                          disabled={hasApplied}
                        >
                          <option value="">{t('dashboard.selectLevel')}</option>
                          <option value="Native">{t('dashboard.nativeSpeaker')}</option>
                          <option value="Fluent">{t('dashboard.fluent')}</option>
                          <option value="Advanced">{t('dashboard.advanced')}</option>
                          <option value="Intermediate">{t('dashboard.intermediate')}</option>
                          <option value="Basic">{t('dashboard.basic')}</option>
                        </select>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.testScoreTOEFL')}</label>
                        <input
                          type="text"
                          name="englishTestScore"
                          value={formData.englishTestScore}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          placeholder={t('dashboard.testScorePlaceholder')}
                          disabled={hasApplied}
                        />
                      </div>
                      <div className="p-4 rounded-lg border-2 border-gray-200">
                        <p className="font-normal mb-3" style={{ color: '#1a5443' }}>{t('dashboard.frenchProficiency')} *</p>
                        <select
                          name="frenchProficiency"
                          value={formData.frenchProficiency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all mb-3"
                          required
                          disabled={hasApplied}
                        >
                          <option value="">{t('dashboard.selectLevel')}</option>
                          <option value="Native">{t('dashboard.nativeSpeaker')}</option>
                          <option value="Fluent">{t('dashboard.fluent')}</option>
                          <option value="Advanced">{t('dashboard.advanced')}</option>
                          <option value="Intermediate">{t('dashboard.intermediate')}</option>
                          <option value="Basic">{t('dashboard.basic')}</option>
                        </select>
                        <label className="block text-sm font-light text-gray-700 mb-2">{t('dashboard.testScoreDELF')}</label>
                        <input
                          type="text"
                          name="frenchTestScore"
                          value={formData.frenchTestScore}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                          placeholder={t('dashboard.testScoreDELFPlaceholder')}
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Motivation & Goals */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Award size={24} />
                      {t('dashboard.motivationAndGoals')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          {t('dashboard.whyAFRICAIIM')}
                        </label>
                        <textarea
                          name="whyAFRICAIIM"
                          value={formData.whyAFRICAIIM}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
                          placeholder={t('dashboard.whyAFRICAIIMPlaceholder')}
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          {t('dashboard.careerGoals')}
                        </label>
                        <textarea
                          name="careerGoals"
                          value={formData.careerGoals}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
                          placeholder={t('dashboard.careerGoalsPlaceholder')}
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          {t('dashboard.academicInterests')}
                        </label>
                        <textarea
                          name="academicInterests"
                          value={formData.academicInterests}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
                          placeholder={t('dashboard.academicInterestsPlaceholder')}
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <FileUp size={24} />
                      {t('dashboard.additionalInformation')}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          {t('dashboard.extracurricularActivities')}
                        </label>
                        <textarea
                          name="extracurriculars"
                          value={formData.extracurriculars}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
                          placeholder={t('dashboard.extracurricularPlaceholder')}
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          {t('dashboard.workExperience')}
                        </label>
                        <textarea
                          name="workExperience"
                          value={formData.workExperience}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
                          placeholder={t('dashboard.workExperiencePlaceholder')}
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">
                          {t('dashboard.references')}
                        </label>
                        <textarea
                          name="references"
                          value={formData.references}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
                          placeholder={t('dashboard.referencesPlaceholder')}
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Upload size={24} />
                      {hasApplied ? t('dashboard.uploadedDocuments') : t('dashboard.requiredDocuments')}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'High School Transcript', key: 'transcript', required: true },
                        { name: 'Passport/ID Copy', key: 'passport', required: true },
                        { name: 'Curriculum Vitae (CV)', key: 'cv', required: true },
                        { name: 'Motivation Letter', key: 'motivationLetter', required: true },
                        { name: 'Language Test Certificates', key: 'languageTests', required: false },
                        { name: 'Previous University Transcripts', key: 'universityTranscripts', required: false },
                      ].map((doc) => (
                        hasApplied ? (
                          // Read-only view when application is submitted
                          uploadedDocuments[doc.key] && (
                            <div
                              key={doc.key}
                              className="border-2 rounded-lg p-4 bg-gray-50"
                              style={{ borderColor: '#e5e7eb' }}
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle size={20} style={{ color: '#1a5443' }} />
                                <div className="flex-1">
                                  <p className="text-sm font-normal text-gray-700">
                                    {doc.name}
                                  </p>
                                  <p className="text-xs font-light text-gray-600 mt-1">
                                    {uploadedDocuments[doc.key]?.name}
                                  </p>
                                </div>
                                <FileText size={20} className="text-gray-400" />
                              </div>
                            </div>
                          )
                        ) : (
                          // Editable upload view when application is not submitted
                          <label
                            key={doc.key}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-all cursor-pointer block"
                            style={uploadedDocuments[doc.key] ? { borderColor: '#1a5443', backgroundColor: '#f0f9f6' } : {}}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {uploadedDocuments[doc.key] ? (
                                  <CheckCircle size={20} style={{ color: '#1a5443' }} />
                                ) : (
                                  <Upload size={20} className="text-gray-400" />
                                )}
                                <div>
                                  <p className="text-sm font-normal text-gray-700">
                                    {doc.name} {doc.required && <span className="text-red-500">*</span>}
                                  </p>
                                  {uploadedDocuments[doc.key] ? (
                                    <p className="text-xs font-light" style={{ color: '#1a5443' }}>
                                      {uploadedDocuments[doc.key]?.name}
                                    </p>
                                  ) : (
                                    <p className="text-xs text-gray-500 font-light">PDF, JPG, PNG (Max 5MB)</p>
                                  )}
                                </div>
                              </div>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleDocumentUpload(e, doc.key)}
                                className="hidden"
                              />
                              <span
                                className="px-4 py-2 text-sm rounded-lg transition-all duration-300 border-2"
                                style={{ borderColor: '#1a5443', color: '#1a5443' }}
                              >
                                {uploadedDocuments[doc.key] ? 'Change File' : 'Choose File'}
                              </span>
                            </div>
                          </label>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  {!hasApplied && (
                    <div className="pt-6 border-t-2 border-gray-200">
                      <div className="flex items-start gap-3 mb-6">
                        <input type="checkbox" id="terms" required className="mt-1" />
                        <label htmlFor="terms" className="text-sm text-gray-600 font-light">
                          {t('dashboard.certificationText')}
                        </label>
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 text-white rounded-xl font-normal text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                        style={{ backgroundColor: '#1a5443' }}
                      >
                        {t('dashboard.submitApplication')}
                      </motion.button>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="admissions-process"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardAdmissionsProcess />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <ApplicationModals
        showReview={showReview}
        showSuccessModal={showSuccessModal}
        formData={formData}
        uploadedDocuments={uploadedDocuments}
        onCloseReview={() => setShowReview(false)}
        onConfirmSubmit={handleFinalSubmit}
        onCloseSuccess={() => {
          setShowSuccessModal(false);
          setActiveTab('overview');
        }}
      />
    </div>
  );
}