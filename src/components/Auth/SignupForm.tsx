import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, Package, ArrowLeft, Plane } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

interface SignupFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
  onBackToHome: () => void;
}

export function SignupForm({ onSuccess, onSwitchToLogin, onBackToHome }: SignupFormProps) {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'sender' as 'traveler' | 'sender'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signup({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      phone: formData.phone
    });
    
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Signup failed');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      {/* Header Banner */}
      <div className="relative bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity text-white group"
              onClick={onBackToHome}
            >
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 group-hover:bg-white/20 transition-colors">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">PackageTravel</span>
                <div className="text-xs text-white/70">Premium Transport</div>
              </div>
            </div>
            
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('auth.backToHome')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="relative flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-full text-sm font-medium mb-6">
              <User className="w-4 h-4 mr-2" />
              Rejoignez la communauté
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('auth.signupTitle')}
            </h2>
            <p className="text-blue-200">
              Créez votre compte et commencez à économiser dès aujourd'hui
            </p>
          </div>
          
          <form className="mt-8 space-y-6 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">
                  {t('auth.role')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'sender' }))}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.role === 'sender'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span className="font-medium">{t('auth.sender')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'traveler' }))}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.role === 'traveler'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <Plane className="w-5 h-5" />
                    <span className="font-medium">{t('auth.traveler')}</span>
                  </button>
                </div>
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                    {t('auth.firstName')}
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-4 py-3 pl-11 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Jean"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                    {t('auth.lastName')}
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-4 py-3 pl-11 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Dupont"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-4 pl-12 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="votre@email.com"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  {t('auth.phone')} <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-4 pl-12 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="+33 6 12 34 56 78"
                  />
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password fields */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-4 pl-12 pr-12 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-4 pl-12 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t('common.loading')}</span>
                  </div>
                ) : (
                  <span>{t('auth.signUp')}</span>
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {t('auth.alreadyHaveAccount')}{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-bold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {t('auth.signIn')}
                </button>
              </span>
            </div>

            {/* Terms */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                En créant un compte, vous acceptez nos{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Conditions d'utilisation</a>
                {' '}et notre{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Politique de confidentialité</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}