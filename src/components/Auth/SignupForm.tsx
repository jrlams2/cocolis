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
    <div className="min-h-screen bg-white">
      {/* Header Banner - Harvard Style */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity group"
              onClick={onBackToHome}
            >
              <div className="bg-red-600 p-3 group-hover:bg-red-700 transition-colors">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-light">PackageTravel</span>
                <div className="text-xs text-gray-300 uppercase tracking-wide">Global Transport Network</div>
              </div>
            </div>
            
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-4 py-2 hover:bg-white/10 uppercase tracking-wide text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('auth.backToHome')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 border border-gray-200 text-sm font-medium mb-8 uppercase tracking-wide">
              <User className="w-4 h-4 mr-2" />
              Join Our Community
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              {t('auth.signupTitle')}
            </h2>
            <p className="text-gray-600 font-light">
              Create your account and start saving today
            </p>
          </div>
          
          <form className="mt-8 space-y-6 bg-white p-8 shadow-lg border border-gray-200" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500"></div>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  {t('auth.role')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'sender' }))}
                    className={`flex items-center justify-center space-x-2 p-4 border-2 transition-all duration-300 ${
                      formData.role === 'sender'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span className="font-medium uppercase tracking-wide text-sm">{t('auth.sender')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'traveler' }))}
                    className={`flex items-center justify-center space-x-2 p-4 border-2 transition-all duration-300 ${
                      formData.role === 'traveler'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    <Plane className="w-5 h-5" />
                    <span className="font-medium uppercase tracking-wide text-sm">{t('auth.traveler')}</span>
                  </button>
                </div>
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
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
                      className="appearance-none relative block w-full px-4 py-3 pl-11 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-300"
                      placeholder="John"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
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
                      className="appearance-none relative block w-full px-4 py-3 pl-11 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-300"
                      placeholder="Doe"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
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
                    className="appearance-none relative block w-full px-4 py-4 pl-12 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  {t('auth.phone')} <span className="text-gray-400 font-normal normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-4 pl-12 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password fields */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
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
                    className="appearance-none relative block w-full px-4 py-4 pl-12 pr-12 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-300"
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
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
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
                    className="appearance-none relative block w-full px-4 py-4 pl-12 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-all duration-300"
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
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wide"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin"></div>
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
                  className="font-medium text-red-600 hover:text-red-500 transition-colors uppercase tracking-wide"
                >
                  {t('auth.signIn')}
                </button>
              </span>
            </div>

            {/* Terms */}
            <div className="text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-red-600 hover:text-red-500 font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-red-600 hover:text-red-500 font-medium">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}