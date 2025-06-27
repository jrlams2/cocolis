import React from 'react';
import { Plane, Package, Shield, DollarSign, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();

  const handleCTAClick = (type: 'traveler' | 'sender') => {
    if (!isAuthenticated) {
      onPageChange('signup');
    } else if (user?.role === 'traveler') {
      onPageChange('travels');
    } else {
      onPageChange('packages');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => handleCTAClick('traveler')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3"
              >
                <Plane className="w-6 h-6" />
                <span>{t('home.hero.ctaTraveler')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => handleCTAClick('sender')}
                className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3"
              >
                <Package className="w-6 h-6" />
                <span>{t('home.hero.ctaSender')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {t('home.features.security.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.security.description')}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <DollarSign className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {t('home.features.savings.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.savings.description')}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                <Clock className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {t('home.features.speed.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.features.speed.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* For Travelers */}
            <div>
              <div className="flex items-center mb-8">
                <Plane className="w-8 h-8 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Pour les voyageurs</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Publiez votre voyage</h4>
                    <p className="text-gray-600">Renseignez votre itinéraire, dates et espace disponible</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recevez des demandes</h4>
                    <p className="text-gray-600">Les expéditeurs vous contactent pour leurs colis</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Gagnez de l'argent</h4>
                    <p className="text-gray-600">Soyez payé après chaque livraison réussie</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* For Senders */}
            <div>
              <div className="flex items-center mb-8">
                <Package className="w-8 h-8 text-green-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Pour les expéditeurs</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Trouvez un voyageur</h4>
                    <p className="text-gray-600">Recherchez des trajets qui correspondent à votre envoi</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Réservez et payez</h4>
                    <p className="text-gray-600">Paiement sécurisé avec protection complète</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Suivez votre colis</h4>
                    <p className="text-gray-600">Recevez des mises à jour en temps réel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-200">Voyages réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25k+</div>
              <div className="text-blue-200">Colis livrés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-blue-200 flex items-center justify-center">
                <Star className="w-5 h-5 fill-current mr-1" />
                Note moyenne
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-blue-200">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Rejoignez des milliers d'utilisateurs qui font confiance à notre plateforme
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => handleCTAClick('traveler')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Commencer comme voyageur
            </button>
            <button
              onClick={() => handleCTAClick('sender')}
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Envoyer un colis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}