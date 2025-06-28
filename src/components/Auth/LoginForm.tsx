import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Package, ArrowLeft, Shield } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
  onBackToHome: () => void;
  isAdmin?: boolean;
}

export function LoginForm({ onSuccess, onSwitchToSignup, onBackToHome, isAdmin = false }: LoginFormProps) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      {/* Login Form */}
      <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 border text-sm font-medium mb-8 uppercase tracking-wide ${
              isAdmin 
                ? 'bg-red-100 text-red-800 border-red-200' 
                : 'bg-gray-100 text-gray-800 border-gray-200'
            }`}>
              {isAdmin ? <Shield className="w-4 h-4 mr-2" /> : <Package className="w-4 h-4 mr-2" />}
              {isAdmin ? 'Administrative Access' : 'Secure Login'}
            </div>
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              {isAdmin ? t('auth.adminLoginTitle') : t('auth.loginTitle')}
            </h2>
            <p className="text-gray-600 font-light">
              {isAdmin ? 'Access reserved for administrators' : 'Access your personal account'}
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
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
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-500 font-medium transition-colors uppercase tracking-wide"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide ${
                  isAdmin 
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                    : 'bg-gray-900 hover:bg-gray-800 focus:ring-gray-500'
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin"></div>
                    <span>{t('common.loading')}</span>
                  </div>
                ) : (
                  <span>{t('auth.signIn')}</span>
                )}
              </button>
            </div>

            {!isAdmin && (
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {t('auth.noAccount')}{' '}
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="font-medium text-red-600 hover:text-red-500 transition-colors uppercase tracking-wide"
                  >
                    {t('auth.signUp')}
                  </button>
                </span>
              </div>
            )}

            {/* Demo credentials */}
            <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-3 uppercase tracking-wide">
                Demo Accounts
              </p>
              <div className="space-y-2 text-xs text-gray-600">
                <p><span className="font-medium">User:</span> voyageur@example.com / password</p>
                <p><span className="font-medium">Sender:</span> expediteur@example.com / password</p>
                {isAdmin && (
                  <p><span className="font-medium text-red-600">Admin:</span> admin@example.com / password</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}