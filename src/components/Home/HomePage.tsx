import React from 'react';
import { Plane, Package, Shield, DollarSign, Clock, Star, ArrowRight, CheckCircle, Globe, Users, Award, TrendingUp } from 'lucide-react';
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
      {/* Hero Section - Luxury Travel Inspired */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-8">
              <Award className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-white/90">Plateforme de transport premium</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Voyagez Léger,
              </span>
              <br />
              <span className="text-white">Transportez Plus</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Découvrez une nouvelle façon de voyager et d'expédier vos colis. 
              Rejoignez notre communauté exclusive de voyageurs et expéditeurs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => handleCTAClick('traveler')}
                className="group bg-white text-slate-900 px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center space-x-3 min-w-[280px]"
              >
                <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Je suis voyageur</div>
                  <div className="text-sm text-gray-600">Gagnez en transportant</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => handleCTAClick('sender')}
                className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center space-x-3 min-w-[280px]"
              >
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold">J'expédie un colis</div>
                  <div className="text-sm text-emerald-100">Économisez jusqu'à 70%</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors">10k+</div>
                <div className="text-blue-200 text-sm">Voyages réalisés</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors">25k+</div>
                <div className="text-blue-200 text-sm">Colis livrés</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors flex items-center justify-center">
                  4.9 <Star className="w-5 h-5 fill-current text-yellow-400 ml-1" />
                </div>
                <div className="text-blue-200 text-sm">Note moyenne</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors">99.8%</div>
                <div className="text-blue-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Premium Cards */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Pourquoi nous choisir
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Une expérience de transport
              <span className="block text-blue-600">révolutionnaire</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les avantages d'une plateforme pensée pour votre sécurité, 
              vos économies et votre tranquillité d'esprit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Sécurité Maximale
              </h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6">
                Vérification d'identité rigoureuse, paiement sécurisé avec protection complète 
                et suivi en temps réel de vos colis.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Identité vérifiée</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>Paiement protégé</span>
                </div>
              </div>
            </div>
            
            <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Économies Exceptionnelles
              </h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6">
                Réduisez vos coûts d'expédition jusqu'à 70% par rapport aux services 
                traditionnels tout en bénéficiant d'un service premium.
              </p>
              <div className="text-center">
                <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Jusqu'à 70% d'économies
                </div>
              </div>
            </div>
            
            <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Livraison Express
              </h3>
              <p className="text-gray-600 leading-relaxed text-center mb-6">
                Profitez des vols existants pour une livraison rapide et fiable. 
                Vos colis voyagent avec des personnes de confiance.
              </p>
              <div className="text-center">
                <div className="inline-flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Plane className="w-4 h-4 mr-2" />
                  Livraison même jour possible
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Elegant Process */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Comment ça marche
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Sécurisé,
              <span className="block text-blue-400">Efficace</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20">
            {/* For Travelers */}
            <div className="space-y-8">
              <div className="flex items-center mb-12">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl mr-6">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Pour les voyageurs</h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">1</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3 text-white">Publiez votre voyage</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Renseignez votre itinéraire, dates de voyage et l'espace disponible 
                      dans vos bagages. C'est gratuit et prend moins de 2 minutes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">2</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3 text-white">Recevez des demandes</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Les expéditeurs vous contactent pour leurs colis. Vous choisissez 
                      ceux qui correspondent à vos critères et votre itinéraire.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">3</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3 text-white">Gagnez de l'argent</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Soyez rémunéré après chaque livraison réussie. Transformez 
                      vos voyages en source de revenus complémentaires.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* For Senders */}
            <div className="space-y-8">
              <div className="flex items-center mb-12">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl mr-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Pour les expéditeurs</h3>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">1</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3 text-white">Trouvez un voyageur</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Recherchez parmi des centaines de trajets qui correspondent 
                      à votre destination. Comparez les prix et les profils.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">2</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3 text-white">Réservez et payez</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Paiement 100% sécurisé avec notre système de protection. 
                      Votre argent est protégé jusqu'à la livraison confirmée.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">3</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-bold mb-3 text-white">Suivez votre colis</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Recevez des notifications en temps réel et communiquez 
                      directement avec votre voyageur via notre messagerie sécurisée.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Notre communauté
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Rejoignez une communauté
              <span className="block text-blue-600">de confiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Pays desservis</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-emerald-600 mb-2">50k+</div>
              <div className="text-gray-600">Membres actifs</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support client</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Sécurisé</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span>Rejoignez l'excellence</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Prêt à révolutionner
            <span className="block text-blue-400">vos voyages ?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Rejoignez des milliers d'utilisateurs qui ont déjà fait confiance à notre plateforme 
            pour leurs voyages et expéditions. L'aventure commence maintenant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={() => handleCTAClick('traveler')}
              className="group bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 min-w-[280px]"
            >
              <Plane className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
              <span>Commencer comme voyageur</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => handleCTAClick('sender')}
              className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-500 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 min-w-[280px]"
            >
              <Package className="w-6 h-6" />
              <span>Envoyer un colis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center text-blue-200">
            <p className="text-sm">✨ Inscription gratuite • Sans engagement • Support 24/7</p>
          </div>
        </div>
      </section>
    </div>
  );
}