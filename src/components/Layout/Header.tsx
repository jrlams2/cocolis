import React, { useState } from 'react';
import { User, Menu, Package, Home, Settings, Shield, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import type { Language } from '../../types';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const { t, language, changeLanguage } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    onPageChange('home');
    setMobileMenuOpen(false);
  };

  const isAdmin = user?.isAdmin || user?.roles?.includes('admin');

  const navItems = [
    { key: 'home', label: t('nav.home'), icon: Home, page: 'home' },
    ...(isAuthenticated ? [
      { key: 'dashboard', label: t('nav.dashboard'), icon: Settings, page: 'dashboard' },
      ...(isAdmin ? [{ key: 'admin', label: t('nav.admin'), icon: Shield, page: 'admin' }] : [])
    ] : [])
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Harvard Style */}
            <div 
              className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-all duration-300 group"
              onClick={() => onPageChange('home')}
            >
              <div className="bg-red-600 p-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-light text-gray-900">
                  PackageTravel
                </span>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Global Transport Network</div>
              </div>
            </div>

            {/* Desktop Navigation - Clean Harvard Style */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.key}
                    onClick={() => onPageChange(item.page)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide ${
                      isActive
                        ? item.key === 'admin'
                          ? 'text-red-700 border-b-2 border-red-600'
                          : 'text-red-700 border-b-2 border-red-600'
                        : 'text-gray-700 hover:text-red-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              {/* Language Switcher - Minimal */}
              <div className="hidden sm:flex items-center space-x-1 border border-gray-300">
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className={`px-3 py-2 text-xs font-medium transition-all duration-300 uppercase tracking-wide ${
                    language === 'fr'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-2 text-xs font-medium transition-all duration-300 uppercase tracking-wide ${
                    language === 'en'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                      isAdmin 
                        ? 'bg-red-600' 
                        : 'bg-gray-600'
                    }`}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {isAdmin ? t('auth.admin') : user?.roles?.map(role => t(`auth.${role}`)).join(', ')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium px-3 py-2 hover:bg-red-50 uppercase tracking-wide"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-4">
                  <button
                    onClick={() => onPageChange('login')}
                    className="text-gray-700 hover:text-red-700 px-4 py-2 text-sm font-medium transition-colors uppercase tracking-wide"
                  >
                    {t('nav.login')}
                  </button>
                  <button
                    onClick={() => onPageChange('signup')}
                    className="bg-red-600 text-white px-6 py-3 text-sm font-medium hover:bg-red-700 transition-all duration-300 uppercase tracking-wide"
                  >
                    {t('nav.signup')}
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-light text-gray-900">PackageTravel</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.page;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        onPageChange(item.page);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-300 uppercase tracking-wide text-sm font-medium ${
                        isActive
                          ? item.key === 'admin'
                            ? 'text-red-700 bg-red-50 border-l-4 border-red-600'
                            : 'text-red-700 bg-red-50 border-l-4 border-red-600'
                          : 'text-gray-700 hover:text-red-700 hover:bg-red-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Language Switcher */}
              <div className="flex items-center border border-gray-300 mb-8">
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide ${
                    language === 'fr'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-all duration-300 uppercase tracking-wide ${
                    language === 'en'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Mobile User Menu */}
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-gray-50 p-4">
                    <div className={`w-12 h-12 flex items-center justify-center ${
                      isAdmin 
                        ? 'bg-red-600' 
                        : 'bg-gray-600'
                    }`}>
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {isAdmin ? t('auth.admin') : user?.roles?.map(role => t(`auth.${role}`)).join(', ')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-red-600 hover:text-red-700 transition-colors font-medium px-4 py-3 hover:bg-red-50 text-left uppercase tracking-wide"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      onPageChange('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-gray-700 hover:text-red-700 px-4 py-3 font-medium transition-colors hover:bg-red-50 text-left uppercase tracking-wide"
                  >
                    {t('nav.login')}
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-600 text-white px-4 py-3 font-medium hover:bg-red-700 transition-all duration-300 uppercase tracking-wide"
                  >
                    {t('nav.signup')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}