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
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-all duration-300 group"
              onClick={() => onPageChange('home')}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                  PackageTravel
                </span>
                <div className="text-xs text-gray-500 font-medium">Premium Transport</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.key}
                    onClick={() => onPageChange(item.page)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? item.key === 'admin'
                          ? 'text-red-700 bg-red-50 shadow-sm border border-red-100'
                          : 'text-blue-700 bg-blue-50 shadow-sm border border-blue-100'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="hidden sm:flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
                    language === 'fr'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                      isAdmin 
                        ? 'bg-gradient-to-br from-red-500 to-red-600' 
                        : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">
                        {isAdmin ? t('auth.admin') : user?.roles?.map(role => t(`auth.${role}`)).join(', ')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-red-50"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <button
                    onClick={() => onPageChange('login')}
                    className="text-gray-700 hover:text-blue-700 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-blue-50"
                  >
                    {t('nav.login')}
                  </button>
                  <button
                    onClick={() => onPageChange('signup')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {t('nav.signup')}
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-900">PackageTravel</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                        isActive
                          ? item.key === 'admin'
                            ? 'text-red-700 bg-red-50 border border-red-100'
                            : 'text-blue-700 bg-blue-50 border border-blue-100'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
                <button
                  onClick={() => handleLanguageChange('fr')}
                  className={`flex-1 px-3 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                    language === 'fr'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`flex-1 px-3 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Mobile User Menu */}
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isAdmin 
                        ? 'bg-gradient-to-br from-red-500 to-red-600' 
                        : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-500">
                        {isAdmin ? t('auth.admin') : user?.roles?.map(role => t(`auth.${role}`)).join(', ')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-red-600 hover:text-red-700 transition-colors font-medium px-4 py-3 rounded-xl hover:bg-red-50 text-left"
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
                    className="w-full text-gray-700 hover:text-blue-700 px-4 py-3 font-medium transition-colors rounded-xl hover:bg-blue-50 text-left"
                  >
                    {t('nav.login')}
                  </button>
                  <button
                    onClick={() => {
                      onPageChange('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
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