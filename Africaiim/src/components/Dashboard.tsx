import React, { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'application' | 'admissions-process'>('admissions-process');
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'draft' | 'submitted' | 'under-review' | 'accepted'>('draft');
  const [showReview, setShowReview] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Countries and Cities state
  const [countries, setCountries] = useState<Array<{ name: string; code: string }>>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({
    profilePicture: null, // Photo d'identité récente
    idPassport: null, // Photocopie de la pièce d'identité ou du passeport
    transcripts: null, // Copie certifiée des relevés de notes des deux dernières années
    diplomas: null, // Diplôme(s) obtenu(s) ou attestation(s) de réussite
    motivationEssay: null, // Essais de motivation
    cv: null, // Curriculum Vitae (si entrée en Bachelor 2 ou 3)
  });
  
  const [formData, setFormData] = useState({
    // Personal Information
    title: '', // Mme, Mle, M
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    birthCity: '',
    birthCountry: '',
    nationality: '',
    address: '',
    postalCode: '',
    city: '',
    
    // Contact Information
    email: userEmail,
    phoneNumber: '',
    mobilePhone: '',
    
    // Academic Background
    lastDiploma: '', // Dernier diplôme obtenu
    currentClass: '', // Classe actuelle
    originInstitution: '', // Établissement d'origine
    spokenLanguages: '', // Langues parlées / maîtrisées
    centersOfInterest: '', // Centres d'intérêt
    professionalPathOrInternships: '', // Parcours professionnel ou stages
    
    // Entry Level
    entryLevel: '', // Bachelor 1, Bachelor 2, Bachelor 3
    
    // Program Selection
    programChoice: '',
    
    // Higher Education History
    higherEducationYear: '',
    higherEducationInstitution: '',
    higherEducationDiploma: '',
    higherEducationMention: '',
    
    // Studies History
    studiesYear: '',
    studiesInstitution: '',
    studiesDiploma: '',
    studiesMention: '',
    
    // Foreign Languages
    language1: '',
    language1Level: '',
    language2: '',
    language2Level: '',
    language3: '',
    language3Level: '',
    
    // Professional Experience
    experience1Year: '',
    experience1Company: '',
    experience1Duration: '',
    experience1Activity: '',
    experience2Year: '',
    experience2Company: '',
    experience2Duration: '',
    experience2Activity: '',
    experience3Year: '',
    experience3Company: '',
    experience3Duration: '',
    experience3Activity: '',
    experience4Year: '',
    experience4Company: '',
    experience4Duration: '',
    experience4Activity: '',
    
    // Family Situation
    fatherProfession: '',
    motherProfession: '',
    numberOfBrothers: '',
    numberOfSisters: '',
    
    // Career Goals
    careerGoals: '', // Quelles sont les professions que vous envisagez d'exercer
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // If country changes, fetch cities for that country
    if (name === 'nationality') {
      setCities([]);
      setFormData(prev => ({ ...prev, city: '' }));
      if (value) {
        fetchCities(value);
      }
    }
    
    // If entry level changes, clear program choice
    if (name === 'entryLevel') {
      setFormData(prev => ({ ...prev, programChoice: '' }));
    }
  };

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryList = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoadingCountries(false);
      }
    };
    
    fetchCountries();
  }, []);

  // Fetch cities for selected country
  const fetchCities = async (countryName: string) => {
    setLoadingCities(true);
    try {
      // Using a cities API - you can replace this with your preferred API
      const response = await fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: countryName
        })
      });
      const data = await response.json();
      if (data.error === false && data.data) {
        setCities(data.data.sort());
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
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
                      className="px-6 py-3 border-2 rounded-lg font-normal text-white transition-all duration-300 shadow-md hover:shadow-lg"
                      style={{ backgroundColor: '#d4a574', borderColor: '#d4a574' }}
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
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Title *</label>
                        <select
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          required
                          disabled={hasApplied}
                        >
                          <option value="">Select Title</option>
                          <option value="M">M (Mr.)</option>
                          <option value="Mme">Mme (Mrs.)</option>
                          <option value="Mle">Mle (Miss)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Enter last name"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Enter first name"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Date of Birth *</label>
                        <div className="relative">
                          <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            required
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Country of Birth *</label>
                        <input
                          type="text"
                          name="birthCountry"
                          value={formData.birthCountry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Country of birth"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">City of Birth *</label>
                        <input
                          type="text"
                          name="birthCity"
                          value={formData.birthCity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="City of birth"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Nationality *</label>
                        <div className="relative">
                          <Globe size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                          <select
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all appearance-none bg-white"
                            required
                            disabled={hasApplied || loadingCountries}
                          >
                            <option value="">
                              {loadingCountries ? 'Loading countries...' : 'Select your country'}
                            </option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Full address"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Postal Code *</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Postal code"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">City *</label>
                        <div className="relative">
                          <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
                          {cities.length > 0 ? (
                            <select
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all appearance-none bg-white"
                              required
                              disabled={hasApplied || loadingCities}
                            >
                              <option value="">
                                {loadingCities ? 'Loading cities...' : 'Select your city'}
                              </option>
                              {cities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder={formData.nationality ? (loadingCities ? 'Loading cities...' : 'Enter your city') : 'Select country first'}
                              required
                              disabled={hasApplied || !formData.nationality || loadingCities}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Phone size={24} />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Phone *</label>
                        <div className="relative">
                          <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            placeholder="+224 XXX XX XX XX"
                            required
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Mobile *</label>
                        <div className="relative">
                          <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="mobilePhone"
                            value={formData.mobilePhone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            placeholder="+224 XXX XX XX XX"
                            required
                            disabled={hasApplied}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Email *</label>
                        <div className="relative">
                          <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all bg-gray-50"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <GraduationCap size={24} />
                      Academic Background
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Last Diploma Obtained *</label>
                        <input
                          type="text"
                          name="lastDiploma"
                          value={formData.lastDiploma}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="e.g., Baccalauréat, Licence, BTS, etc."
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Current Class *</label>
                        <input
                          type="text"
                          name="currentClass"
                          value={formData.currentClass}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="e.g., Terminale, Première Année, etc."
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Origin Institution *</label>
                        <input
                          type="text"
                          name="originInstitution"
                          value={formData.originInstitution}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Name of your previous school/university"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Spoken/Mastered Languages *</label>
                        <input
                          type="text"
                          name="spokenLanguages"
                          value={formData.spokenLanguages}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="e.g., French, English, Portuguese"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Centers of Interest *</label>
                        <input
                          type="text"
                          name="centersOfInterest"
                          value={formData.centersOfInterest}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Your hobbies and interests"
                          required
                          disabled={hasApplied}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Professional Path or Internships</label>
                        <input
                          type="text"
                          name="professionalPathOrInternships"
                          value={formData.professionalPathOrInternships}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Describe your professional experience or internships (if applicable)"
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Entry Level & Program Selection */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <BookOpen size={24} />
                      Entry Level & Program Selection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Desired Entry Level *</label>
                        <select
                          name="entryLevel"
                          value={formData.entryLevel}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          required
                          disabled={hasApplied}
                        >
                          <option value="">Select entry level</option>
                          <option value="Bachelor 1">Bachelor 1</option>
                          <option value="Bachelor 2">Bachelor 2</option>
                          <option value="Bachelor 3">Bachelor 3</option>
                          <option value="Master Initial">Master Initial</option>
                          <option value="Master Executive">Master Executive</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-gray-700 mb-2">Program Choice *</label>
                        <select
                          name="programChoice"
                          value={formData.programChoice}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          required
                          disabled={hasApplied || !formData.entryLevel}
                        >
                          <option value="">{formData.entryLevel ? 'Select your program' : 'Select entry level first'}</option>
                          {(formData.entryLevel === 'Bachelor 1' || formData.entryLevel === 'Bachelor 2' || formData.entryLevel === 'Bachelor 3') && (
                            <optgroup label="Bachelor Programs">
                              <option value="Bachelor Grande École - Management, Sciences Sociales & IA">Bachelor Grande École - Management, Sciences Sociales & IA</option>
                              <option value="Bachelor Banque & Assurance">Bachelor Banque & Assurance</option>
                              <option value="Bachelor Comptabilité & Gestion">Bachelor Comptabilité & Gestion</option>
                            </optgroup>
                          )}
                          {formData.entryLevel === 'Master Initial' && (
                            <optgroup label="Master Initial (2 ans)">
                              <option value="Master Transformation Digitale et Management des Outils Digitaux">Master Transformation Digitale et Management des Outils Digitaux</option>
                              <option value="Master Cybersécurité et Management des Systèmes d'informations">Master Cybersécurité et Management des Systèmes d'informations</option>
                              <option value="Master Management de Business Unit et Stratégies Financières">Master Management de Business Unit et Stratégies Financières</option>
                              <option value="Master Management Supply Chain Achat Logistique">Master Management Supply Chain Achat Logistique</option>
                              <option value="Master Gestion des Ressources Humaines">Master Gestion des Ressources Humaines</option>
                              <option value="Master Gestion des Projets">Master Gestion des Projets</option>
                            </optgroup>
                          )}
                          {formData.entryLevel === 'Master Executive' && (
                            <optgroup label="Master Executive (1 an)">
                              <option value="Master Ingénierie Financière">Master Ingénierie Financière</option>
                              <option value="Master Management des établissements de Santé">Master Management des établissements de Santé</option>
                              <option value="Master Achats et Logistiques">Master Achats et Logistiques</option>
                              <option value="Master Stratégie d'entreprise">Master Stratégie d'entreprise</option>
                              <option value="Master Executive - Gestion des Ressources Humaines">Master Executive - Gestion des Ressources Humaines</option>
                              <option value="Master Executive - Gestion des Projets">Master Executive - Gestion des Projets</option>
                            </optgroup>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Higher Education History - Only for Master Programs */}
                  {(formData.entryLevel === 'Master Initial' || formData.entryLevel === 'Master Executive') && (
                    <div>
                      <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                        <GraduationCap size={24} />
                        Higher Education History
                      </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Year</label>
                        <input
                          type="text"
                          name="higherEducationYear"
                          value={formData.higherEducationYear}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="e.g., 2023-2024"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Institution/City</label>
                        <input
                          type="text"
                          name="higherEducationInstitution"
                          value={formData.higherEducationInstitution}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Institution name and city"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Diploma</label>
                        <input
                          type="text"
                          name="higherEducationDiploma"
                          value={formData.higherEducationDiploma}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Diploma name"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Mention</label>
                        <input
                          type="text"
                          name="higherEducationMention"
                          value={formData.higherEducationMention}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Honors/Grade"
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                    </div>
                  )}

                  {/* Studies History */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <BookOpen size={24} />
                      Studies History
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Year</label>
                        <input
                          type="text"
                          name="studiesYear"
                          value={formData.studiesYear}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="e.g., 2021-2022"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Institution/City</label>
                        <input
                          type="text"
                          name="studiesInstitution"
                          value={formData.studiesInstitution}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Institution name and city"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Diploma</label>
                        <input
                          type="text"
                          name="studiesDiploma"
                          value={formData.studiesDiploma}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Diploma name"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Mention</label>
                        <input
                          type="text"
                          name="studiesMention"
                          value={formData.studiesMention}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Honors/Grade"
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Foreign Languages */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Languages size={24} />
                      Foreign Languages
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-light text-gray-700 mb-2">Language I</label>
                          <input
                            type="text"
                            name="language1"
                            value={formData.language1}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            placeholder="e.g., English"
                            disabled={hasApplied}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-gray-700 mb-2">Level</label>
                          <select
                            name="language1Level"
                            value={formData.language1Level}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            disabled={hasApplied}
                          >
                            <option value="">Select level</option>
                            <option value="A1">A1 - Beginner</option>
                            <option value="A2">A2 - Elementary</option>
                            <option value="B1">B1 - Intermediate</option>
                            <option value="B2">B2 - Upper Intermediate</option>
                            <option value="C1">C1 - Advanced</option>
                            <option value="C2">C2 - Proficient</option>
                            <option value="Native">Native</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-light text-gray-700 mb-2">Language II</label>
                          <input
                            type="text"
                            name="language2"
                            value={formData.language2}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            placeholder="e.g., French"
                            disabled={hasApplied}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-gray-700 mb-2">Level</label>
                          <select
                            name="language2Level"
                            value={formData.language2Level}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            disabled={hasApplied}
                          >
                            <option value="">Select level</option>
                            <option value="A1">A1 - Beginner</option>
                            <option value="A2">A2 - Elementary</option>
                            <option value="B1">B1 - Intermediate</option>
                            <option value="B2">B2 - Upper Intermediate</option>
                            <option value="C1">C1 - Advanced</option>
                            <option value="C2">C2 - Proficient</option>
                            <option value="Native">Native</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-light text-gray-700 mb-2">Language III</label>
                          <input
                            type="text"
                            name="language3"
                            value={formData.language3}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            placeholder="e.g., Spanish"
                            disabled={hasApplied}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-light text-gray-700 mb-2">Level</label>
                          <select
                            name="language3Level"
                            value={formData.language3Level}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                            disabled={hasApplied}
                          >
                            <option value="">Select level</option>
                            <option value="A1">A1 - Beginner</option>
                            <option value="A2">A2 - Elementary</option>
                            <option value="B1">B1 - Intermediate</option>
                            <option value="B2">B2 - Upper Intermediate</option>
                            <option value="C1">C1 - Advanced</option>
                            <option value="C2">C2 - Proficient</option>
                            <option value="Native">Native</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Experience - Only for Master Programs */}
                  {(formData.entryLevel === 'Master Initial' || formData.entryLevel === 'Master Executive') && (
                    <div>
                      <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                        <FileText size={24} />
                        Professional Experience
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f6' }}>
                          <p className="text-sm font-normal mb-3" style={{ color: '#1a5443' }}>Experience 1</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Year</label>
                            <input
                              type="text"
                              name="experience1Year"
                              value={formData.experience1Year}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all bg-white"
                              placeholder="2024"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Company/Place</label>
                            <input
                              type="text"
                              name="experience1Company"
                              value={formData.experience1Company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all bg-white"
                              placeholder="Company name"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Duration</label>
                            <input
                              type="text"
                              name="experience1Duration"
                              value={formData.experience1Duration}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all bg-white"
                              placeholder="3 months"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Nature of Activity</label>
                            <input
                              type="text"
                              name="experience1Activity"
                              value={formData.experience1Activity}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all bg-white"
                              placeholder="Role/Position"
                              disabled={hasApplied}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm font-normal mb-3 text-gray-700">Experience 2</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Year</label>
                            <input
                              type="text"
                              name="experience2Year"
                              value={formData.experience2Year}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="2023"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Company/Place</label>
                            <input
                              type="text"
                              name="experience2Company"
                              value={formData.experience2Company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="Company name"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Duration</label>
                            <input
                              type="text"
                              name="experience2Duration"
                              value={formData.experience2Duration}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="6 months"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Nature of Activity</label>
                            <input
                              type="text"
                              name="experience2Activity"
                              value={formData.experience2Activity}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="Role/Position"
                              disabled={hasApplied}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm font-normal mb-3 text-gray-700">Experience 3</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Year</label>
                            <input
                              type="text"
                              name="experience3Year"
                              value={formData.experience3Year}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="2022"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Company/Place</label>
                            <input
                              type="text"
                              name="experience3Company"
                              value={formData.experience3Company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="Company name"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Duration</label>
                            <input
                              type="text"
                              name="experience3Duration"
                              value={formData.experience3Duration}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="4 months"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Nature of Activity</label>
                            <input
                              type="text"
                              name="experience3Activity"
                              value={formData.experience3Activity}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="Role/Position"
                              disabled={hasApplied}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm font-normal mb-3 text-gray-700">Experience 4</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Year</label>
                            <input
                              type="text"
                              name="experience4Year"
                              value={formData.experience4Year}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="2021"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Company/Place</label>
                            <input
                              type="text"
                              name="experience4Company"
                              value={formData.experience4Company}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="Company name"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Duration</label>
                            <input
                              type="text"
                              name="experience4Duration"
                              value={formData.experience4Duration}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="2 months"
                              disabled={hasApplied}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-light text-gray-700 mb-2">Nature of Activity</label>
                            <input
                              type="text"
                              name="experience4Activity"
                              value={formData.experience4Activity}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                              placeholder="Role/Position"
                              disabled={hasApplied}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}

                  {/* Family Situation */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <User size={24} />
                      Family Situation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Father's Profession</label>
                        <input
                          type="text"
                          name="fatherProfession"
                          value={formData.fatherProfession}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Father's profession"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Mother's Profession</label>
                        <input
                          type="text"
                          name="motherProfession"
                          value={formData.motherProfession}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="Mother's profession"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Number of Brothers</label>
                        <input
                          type="number"
                          name="numberOfBrothers"
                          value={formData.numberOfBrothers}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="0"
                          min="0"
                          disabled={hasApplied}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-gray-700 mb-2">Number of Sisters</label>
                        <input
                          type="number"
                          name="numberOfSisters"
                          value={formData.numberOfSisters}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all"
                          placeholder="0"
                          min="0"
                          disabled={hasApplied}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Award size={24} />
                      Career Goals
                    </h3>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">
                        What professions do you plan to pursue after your studies? *
                      </label>
                      <textarea
                        name="careerGoals"
                        value={formData.careerGoals}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a5443] focus:ring-opacity-50 transition-all resize-none"
                        placeholder="Describe your career goals and the professions you envision..."
                        required
                        disabled={hasApplied}
                      />
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div>
                    <h3 className="text-xl font-normal mb-4 flex items-center gap-2" style={{ color: '#1a5443' }}>
                      <Upload size={24} />
                      Required Documents
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Photo d\'identité récente (Recent ID Photo)', key: 'profilePicture', required: true },
                        { name: 'Photocopie de la pièce d\'identité ou du passeport (ID/Passport Copy)', key: 'idPassport', required: true },
                        { name: 'Copie certifiée des relevés de notes des deux dernières années (Certified Transcripts)', key: 'transcripts', required: true },
                        { name: 'Diplôme(s) obtenu(s) ou attestation(s) de réussite (Diplomas/Certificates)', key: 'diplomas', required: true },
                        { name: 'Essais de motivation (Motivation Essay)', key: 'motivationEssay', required: true },
                        { name: 'Curriculum Vitae (CV) - Bachelor 2/3 ou Master', key: 'cv', required: false },
                      ].filter(doc => {
                        // Show CV only for Bachelor 2, Bachelor 3, or Master programs
                        if (doc.key === 'cv') {
                          return formData.entryLevel === 'Bachelor 2' || 
                                 formData.entryLevel === 'Bachelor 3' || 
                                 formData.entryLevel === 'Master Initial' || 
                                 formData.entryLevel === 'Master Executive';
                        }
                        return true;
                      }).map((doc) => (
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
                          I certify that all information provided in this application is accurate and complete.
                        </label>
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 text-white rounded-xl font-normal text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                        style={{ backgroundColor: '#1a5443' }}
                      >
                        Submit Application
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