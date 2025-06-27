import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { HomePage } from './components/Home/HomePage';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return (
          <LoginForm
            onSuccess={() => setCurrentPage('dashboard')}
            onSwitchToSignup={() => setCurrentPage('signup')}
            onBackToHome={() => setCurrentPage('home')}
          />
        );
      case 'admin-login':
        return (
          <LoginForm
            onSuccess={() => setCurrentPage('admin')}
            onSwitchToSignup={() => setCurrentPage('signup')}
            onBackToHome={() => setCurrentPage('home')}
            isAdmin={true}
          />
        );
      case 'signup':
        return (
          <SignupForm
            onSuccess={() => setCurrentPage('dashboard')}
            onSwitchToLogin={() => setCurrentPage('login')}
            onBackToHome={() => setCurrentPage('home')}
          />
        );
      case 'dashboard':
      case 'admin':
        return <Dashboard />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  const showHeader = !['login', 'signup', 'admin-login'].includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header currentPage={currentPage} onPageChange={setCurrentPage} />}
      <main className={showHeader ? '' : 'min-h-screen'}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;