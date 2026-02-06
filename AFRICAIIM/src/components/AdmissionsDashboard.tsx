import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  AlertCircle
} from 'lucide-react';

interface AdmissionsDashboardProps {
  onLogout: () => void;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  program: string;
  submittedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  academicInfo: {
    gpa: string;
    previousSchool: string;
  };
  documents: string[];
}

export function AdmissionsDashboard({ onLogout }: AdmissionsDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'applications'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock data - in real app, this would come from backend
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'AFRI-001',
      name: 'Amadou Diallo',
      email: 'amadou.diallo@email.com',
      phone: '+224 621 234 567',
      country: 'Guinea',
      program: 'Business Analytics',
      submittedDate: '2026-02-01',
      status: 'pending',
      academicInfo: {
        gpa: '3.8',
        previousSchool: 'Lycée Donka'
      },
      documents: ['transcript.pdf', 'recommendation.pdf', 'personal_statement.pdf']
    },
    {
      id: 'AFRI-002',
      name: 'Fatoumata Bah',
      email: 'fatoumata.bah@email.com',
      phone: '+224 622 345 678',
      country: 'Guinea',
      program: 'Strategic Management & Leadership',
      submittedDate: '2026-01-28',
      status: 'accepted',
      academicInfo: {
        gpa: '3.9',
        previousSchool: 'Lycée Classique'
      },
      documents: ['transcript.pdf', 'recommendation.pdf', 'personal_statement.pdf']
    },
    {
      id: 'AFRI-003',
      name: 'Ibrahim Camara',
      email: 'ibrahim.camara@email.com',
      phone: '+224 623 456 789',
      country: 'Guinea',
      program: 'Business Analytics',
      submittedDate: '2026-01-25',
      status: 'pending',
      academicInfo: {
        gpa: '3.7',
        previousSchool: 'Lycée Kipé'
      },
      documents: ['transcript.pdf', 'recommendation.pdf', 'personal_statement.pdf']
    },
    {
      id: 'AFRI-004',
      name: 'Mariama Sow',
      email: 'mariama.sow@email.com',
      phone: '+224 624 567 890',
      country: 'Senegal',
      program: 'Strategic Management & Leadership',
      submittedDate: '2026-02-03',
      status: 'pending',
      academicInfo: {
        gpa: '3.6',
        previousSchool: 'Lycée Blaise Diagne'
      },
      documents: ['transcript.pdf', 'recommendation.pdf', 'personal_statement.pdf']
    },
    {
      id: 'AFRI-005',
      name: 'Alpha Barry',
      email: 'alpha.barry@email.com',
      phone: '+224 625 678 901',
      country: 'Guinea',
      program: 'Business Analytics',
      submittedDate: '2026-01-20',
      status: 'rejected',
      academicInfo: {
        gpa: '3.2',
        previousSchool: 'Lycée 2 Octobre'
      },
      documents: ['transcript.pdf', 'recommendation.pdf']
    },
    {
      id: 'AFRI-006',
      name: 'Aissatou Diallo',
      email: 'aissatou.diallo@email.com',
      phone: '+224 626 789 012',
      country: 'Guinea',
      program: 'Strategic Management & Leadership',
      submittedDate: '2026-02-05',
      status: 'pending',
      academicInfo: {
        gpa: '3.85',
        previousSchool: 'Lycée Coronthie'
      },
      documents: ['transcript.pdf', 'recommendation.pdf', 'personal_statement.pdf']
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-light" style={{ color: '#1a5443' }}>
                AFRICAIIM
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <div className="text-sm text-gray-600 font-light">Admissions Portal</div>
            </div>
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
            >
              <LogOut size={18} />
              <span className="font-light">Logout</span>
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
              className={`py-4 border-b-2 transition-all font-light ${
                selectedTab === 'overview'
                  ? 'border-[#1a5443] text-[#1a5443]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('applications')}
              className={`py-4 border-b-2 transition-all font-light ${
                selectedTab === 'applications'
                  ? 'border-[#1a5443] text-[#1a5443]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Applications
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
                src="https://images.unsplash.com/photo-1666243035395-9b7853cecc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlldyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAzNzE3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Campus"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 84, 67, 0.9), rgba(212, 165, 116, 0.8))'
                }}
              >
                <div className="text-center text-white">
                  <h1 className="text-4xl font-light mb-2">Welcome to Admissions Portal</h1>
                  <p className="text-lg font-light opacity-90">Academic Year 2026-2027</p>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#e6f3ef' }}>
                    <Users size={24} style={{ color: '#1a5443' }} />
                  </div>
                  <TrendingUp size={20} className="text-gray-400" />
                </div>
                <p className="text-3xl font-light mb-1" style={{ color: '#1a5443' }}>{stats.total}</p>
                <p className="text-sm text-gray-600 font-light">Total Applications</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-amber-50">
                    <Clock size={24} style={{ color: '#d4a574' }} />
                  </div>
                </div>
                <p className="text-3xl font-light mb-1" style={{ color: '#d4a574' }}>{stats.pending}</p>
                <p className="text-sm text-gray-600 font-light">Pending Review</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <CheckCircle2 size={24} className="text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-light text-green-600 mb-1">{stats.accepted}</p>
                <p className="text-sm text-gray-600 font-light">Accepted</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-red-50">
                    <XCircle size={24} className="text-red-600" />
                  </div>
                </div>
                <p className="text-3xl font-light text-red-600 mb-1">{stats.rejected}</p>
                <p className="text-sm text-gray-600 font-light">Rejected</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#e6f3ef' }}>
                    <UserCheck size={24} style={{ color: '#1a5443' }} />
                  </div>
                </div>
                <p className="text-3xl font-light mb-1" style={{ color: '#1a5443' }}>{stats.acceptanceRate}%</p>
                <p className="text-sm text-gray-600 font-light">Acceptance Rate</p>
              </motion.div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-light" style={{ color: '#1a5443' }}>Recent Applications</h2>
                <button
                  onClick={() => setSelectedTab('applications')}
                  className="text-sm font-light hover:underline"
                  style={{ color: '#d4a574' }}
                >
                  View All →
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
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-light text-white" style={{ backgroundColor: '#1a5443' }}>
                        {app.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-normal">{app.name}</p>
                        <p className="text-sm text-gray-600 font-light">{app.id} • {app.program}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-light ${
                        app.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
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
                    placeholder="Search by name, email, or application ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 font-light"
                    style={{ focusRing: '#1a5443' }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 rounded-lg font-light transition-all ${
                      filterStatus === 'all'
                        ? 'bg-[#1a5443] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 rounded-lg font-light transition-all ${
                      filterStatus === 'pending'
                        ? 'bg-[#d4a574] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilterStatus('accepted')}
                    className={`px-4 py-2 rounded-lg font-light transition-all ${
                      filterStatus === 'accepted'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Accepted
                  </button>
                  <button
                    onClick={() => setFilterStatus('rejected')}
                    className={`px-4 py-2 rounded-lg font-light transition-all ${
                      filterStatus === 'rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Rejected
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
                      <th className="px-6 py-4 text-left text-sm font-normal text-gray-700">Application ID</th>
                      <th className="px-6 py-4 text-left text-sm font-normal text-gray-700">Applicant</th>
                      <th className="px-6 py-4 text-left text-sm font-normal text-gray-700">Program</th>
                      <th className="px-6 py-4 text-left text-sm font-normal text-gray-700">Submitted</th>
                      <th className="px-6 py-4 text-left text-sm font-normal text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-normal text-gray-700">Actions</th>
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
                        <td className="px-6 py-4 text-sm font-light">{app.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-normal">{app.name}</p>
                            <p className="text-xs text-gray-600 font-light">{app.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-light">{app.program}</td>
                        <td className="px-6 py-4 text-sm font-light">{new Date(app.submittedDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-light ${
                            app.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReviewApplication(app)}
                            className="px-4 py-2 rounded-lg text-sm font-light text-white hover:shadow-lg transition-all"
                            style={{ backgroundColor: '#1a5443' }}
                          >
                            Review
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
                      Application Review
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
              <div className="px-8 py-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-normal mb-4" style={{ color: '#1a5443' }}>Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <User size={20} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 font-light">Full Name</p>
                        <p className="font-normal">{selectedApplication.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail size={20} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 font-light">Email</p>
                        <p className="font-normal">{selectedApplication.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={20} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 font-light">Phone</p>
                        <p className="font-normal">{selectedApplication.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 font-light">Country</p>
                        <p className="font-normal">{selectedApplication.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-normal mb-4" style={{ color: '#1a5443' }}>Academic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light mb-1">Preferred Program</p>
                      <p className="font-normal">{selectedApplication.program}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-light mb-1">GPA</p>
                      <p className="font-normal">{selectedApplication.academicInfo.gpa}/4.0</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                      <p className="text-sm text-gray-600 font-light mb-1">Previous School</p>
                      <p className="font-normal">{selectedApplication.academicInfo.previousSchool}</p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-normal mb-4" style={{ color: '#1a5443' }}>Submitted Documents</h3>
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
                    <p className="text-sm text-gray-600 font-light">Submitted On</p>
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
