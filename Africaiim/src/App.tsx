import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { ChancellorMessage } from './components/ChancellorMessage';
import { EventsNews } from './components/EventsNews';
import { Campus } from './components/Campus';
import { AdmissionForm } from './components/AdmissionForm';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { AdmissionsDashboard } from './components/AdmissionsDashboard';
import { Toaster } from 'sonner@2.0.3';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'dashboard' | 'admissions'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAdmissionsUser, setIsAdmissionsUser] = useState(false);

  const handleAuthSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    
    // Check if user is admissions staff
    if (email === 'admissions@africaiim.edu.gn') {
      setIsAdmissionsUser(true);
      setCurrentPage('admissions');
    } else {
      setIsAdmissionsUser(false);
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setIsAdmissionsUser(false);
    setCurrentPage('home');
  };

  if (currentPage === 'auth') {
    return <AuthPage onBack={() => setCurrentPage('home')} onAuthSuccess={handleAuthSuccess} />;
  }

  if (currentPage === 'dashboard' && isLoggedIn && !isAdmissionsUser) {
    return <Dashboard userEmail={userEmail} onLogout={handleLogout} />;
  }

  if (currentPage === 'admissions' && isLoggedIn && isAdmissionsUser) {
    return <AdmissionsDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigateToAuth={() => setCurrentPage('auth')} />
      <Hero onNavigateToAuth={() => setCurrentPage('auth')} />
      <About />
      <Programs />
      <ChancellorMessage />
      <EventsNews />
      <Campus onNavigateToAuth={() => setCurrentPage('auth')} />
      <AdmissionForm />
      <Footer />
      <Toaster />
    </div>
  );
}