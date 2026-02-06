import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, FileText, User, GraduationCap, Mail, BookOpen, Languages, Award } from 'lucide-react';
import logo from 'figma:asset/ec844cec6a228f098ee7a36535042ab0a7a84385.png';

interface ApplicationModalsProps {
  showReview: boolean;
  showSuccessModal: boolean;
  formData: any;
  uploadedDocuments: Record<string, File | null>;
  onCloseReview: () => void;
  onConfirmSubmit: () => void;
  onCloseSuccess: () => void;
}

export function ApplicationModals({
  showReview,
  showSuccessModal,
  formData,
  uploadedDocuments,
  onCloseReview,
  onConfirmSubmit,
  onCloseSuccess,
}: ApplicationModalsProps) {
  return (
    <>
      {/* Review Modal */}
      <AnimatePresence>
        {showReview && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={onCloseReview}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="AFRICAIIM Logo" className="h-12 w-auto" />
                  <div>
                    <h2 className="text-2xl font-light" style={{ color: '#1a5443' }}>
                      Review Your Application
                    </h2>
                    <p className="text-sm text-gray-500 font-light">Please review all information before submitting</p>
                  </div>
                </div>
                <button
                  onClick={onCloseReview}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-normal mb-3 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <User size={20} />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Name</p>
                      <p className="font-normal">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Date of Birth</p>
                      <p className="font-normal">{formData.dateOfBirth}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Nationality</p>
                      <p className="font-normal">{formData.nationality}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">City, Country</p>
                      <p className="font-normal">{formData.city}, {formData.countryOfResidence}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-normal mb-3 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <Mail size={20} />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Email</p>
                      <p className="font-normal">{formData.email}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Phone Number</p>
                      <p className="font-normal">{formData.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Academic Background */}
                <div>
                  <h3 className="text-lg font-normal mb-3 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <GraduationCap size={20} />
                    Academic Background
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">High School</p>
                      <p className="font-normal">{formData.highSchoolName}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Graduation Year</p>
                      <p className="font-normal">{formData.graduationYear}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">GPA</p>
                      <p className="font-normal">{formData.gpa}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Country</p>
                      <p className="font-normal">{formData.highSchoolCountry}</p>
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div>
                  <h3 className="text-lg font-normal mb-3 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <BookOpen size={20} />
                    Program Selection
                  </h3>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Program</p>
                      <p className="font-normal">{formData.programChoice}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Intake Year</p>
                      <p className="font-normal">{formData.intakeYear}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">Semester</p>
                      <p className="font-normal">{formData.intakeSemester}</p>
                    </div>
                  </div>
                </div>

                {/* Language Proficiency */}
                <div>
                  <h3 className="text-lg font-normal mb-3 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <Languages size={20} />
                    Language Proficiency
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">English</p>
                      <p className="font-normal">{formData.englishProficiency}</p>
                      {formData.englishTestScore && <p className="text-xs text-gray-600 mt-1">{formData.englishTestScore}</p>}
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light">French</p>
                      <p className="font-normal">{formData.frenchProficiency}</p>
                      {formData.frenchTestScore && <p className="text-xs text-gray-600 mt-1">{formData.frenchTestScore}</p>}
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <h3 className="text-lg font-normal mb-3 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <Award size={20} />
                    Motivation & Goals
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light text-sm mb-2">Why AFRICAIIM?</p>
                      <p className="text-sm">{formData.whyAFRICAIIM}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 font-light text-sm mb-2">Career Goals</p>
                      <p className="text-sm">{formData.careerGoals}</p>
                    </div>
                  </div>
                </div>

                {/* Uploaded Documents */}
                <div>
                  <h3 className="text-lg font-normal mb-3 flex items-center gap-2" style={{ color: '#1a5443' }}>
                    <FileText size={20} />
                    Uploaded Documents
                  </h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(uploadedDocuments).map(([key, file]) => (
                      file && (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <p className="font-normal">{file.name}</p>
                          <CheckCircle size={16} style={{ color: '#1a5443' }} />
                        </div>
                      )
                    ))}
                    {Object.values(uploadedDocuments).every(file => !file) && (
                      <p className="text-gray-500 text-sm font-light p-3">No documents uploaded yet</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                <motion.button
                  type="button"
                  onClick={onCloseReview}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 border-2 rounded-xl font-light text-gray-700 border-gray-300 hover:bg-gray-50 transition-all duration-300"
                >
                  Go Back & Edit
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onConfirmSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 text-white rounded-xl font-normal shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: '#1a5443' }}
                >
                  Confirm & Submit Application
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
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

              <img src={logo} alt="AFRICAIIM Logo" className="h-16 w-auto mx-auto mb-4" />

              <h2 className="text-2xl font-light mb-2" style={{ color: '#1a5443' }}>
                Application Submitted Successfully!
              </h2>
              <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#d4a574' }} />

              <p className="text-gray-600 font-light mb-6 leading-relaxed">
                Thank you for applying to AFRICAIIM. Your application has been received and is now under review by our admissions team. You will receive an email confirmation shortly.
              </p>

              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#f0f9f6' }}>
                <p className="text-sm font-light text-gray-700 mb-2">Application ID</p>
                <p className="text-lg font-normal" style={{ color: '#1a5443' }}>
                  AFRI-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>

              <motion.button
                onClick={onCloseSuccess}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 text-white rounded-xl font-light shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#1a5443' }}
              >
                Go to Dashboard
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
