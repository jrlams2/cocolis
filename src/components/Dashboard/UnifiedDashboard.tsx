import React, { useState } from 'react';
import { Plus, Package, Clock, CheckCircle, Plane, Star, DollarSign, Calendar, MapPin, Users, ToggleLeft, ToggleRight, Search } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

export function UnifiedDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeMode, setActiveMode] = useState<'traveler' | 'sender'>('sender');
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  const mockStats = {
    traveler: {
      totalTravels: 12,
      activeTravels: 3,
      completedDeliveries: 25,
      totalEarnings: 1250,
      rating: 4.8,
      nextTravel: {
        destination: 'Paris → New York',
        date: '2024-02-15',
        packages: 2
      }
    },
    sender: {
      totalPackages: 8,
      activePackages: 2,
      deliveredPackages: 5,
      totalSpent: 340,
      pendingPayments: 1,
      savedMoney: 850
    }
  };

  const mockTravels = [
    {
      id: '1',
      origin: { city: 'Paris', country: 'France' },
      destination: { city: 'New York', country: 'USA' },
      departureDate: '2024-02-15T10:00:00Z',
      status: 'active',
      availableSpace: 8,
      maxWeight: 15,
      pricePerKg: 15,
      bookings: 2
    },
    {
      id: '2',
      origin: { city: 'London', country: 'UK' },
      destination: { city: 'Tokyo', country: 'Japan' },
      departureDate: '2024-03-10T14:30:00Z',
      status: 'active',
      availableSpace: 12,
      maxWeight: 20,
      pricePerKg: 20,
      bookings: 1
    }
  ];

  const mockPackages = [
    {
      id: '1',
      description: 'Documents importants',
      weight: 0.5,
      status: 'in_transit',
      trackingNumber: 'PT2024001',
      origin: 'Paris',
      destination: 'New York',
      traveler: 'Jean Dupont',
      departureDate: '2024-02-15',
      totalPrice: 45,
      estimatedDelivery: '2024-02-16'
    },
    {
      id: '2',
      description: 'Produits artisanaux',
      weight: 2.5,
      status: 'delivered',
      trackingNumber: 'PT2024002',
      origin: 'Lyon',
      destination: 'Tokyo',
      traveler: 'Marie Martin',
      departureDate: '2024-02-10',
      totalPrice: 85,
      deliveredDate: '2024-02-11',
      rating: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return t(`package.status.${status}`) || status;
  };

  const currentStats = mockStats[activeMode];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Mode Toggle */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('dashboard.welcome')}, {user?.firstName}
              </h1>
              <p className="text-gray-600 mt-2">
                {activeMode === 'traveler' 
                  ? 'Gérez vos voyages et suivez vos gains'
                  : 'Gérez vos envois et suivez vos colis'
                }
              </p>
            </div>
            
            {/* Mode Toggle */}
            <div className="mt-4 sm:mt-0">
              <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200 flex items-center space-x-1">
                <button
                  onClick={() => setActiveMode('sender')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeMode === 'sender'
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>{t('dashboard.switchToSender')}</span>
                </button>
                <button
                  onClick={() => setActiveMode('traveler')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeMode === 'traveler'
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>{t('dashboard.switchToTraveler')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {activeMode === 'traveler' ? (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('travel.totalTravels')}</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.totalTravels}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Plane className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Livraisons</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.completedDeliveries}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gains totaux</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.totalEarnings}€</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Note moyenne</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.rating}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('package.totalPackages')}</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.totalPackages}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">En cours</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.activePackages}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Livrés</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.deliveredPackages}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('common.savings')}</p>
                    <p className="text-2xl font-bold text-gray-900">{currentStats.savedMoney}€</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.quickActions')}</h2>
          <div className="flex flex-wrap gap-4">
            {activeMode === 'traveler' ? (
              <>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>{t('travel.createTravel')}</span>
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Voir le calendrier</span>
                </button>
              </>
            ) : (
              <>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>{t('package.sendPackage')}</span>
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>{t('travel.searchTravels')}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? `border-${activeMode === 'traveler' ? 'blue' : 'green'}-600 text-${activeMode === 'traveler' ? 'blue' : 'green'}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('dashboard.overview')}
              </button>
              <button
                onClick={() => setActiveTab(activeMode === 'traveler' ? 'travels' : 'packages')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === (activeMode === 'traveler' ? 'travels' : 'packages')
                    ? `border-${activeMode === 'traveler' ? 'blue' : 'green'}-600 text-${activeMode === 'traveler' ? 'blue' : 'green'}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {activeMode === 'traveler' ? t('dashboard.myTravels') : t('dashboard.myPackages')}
              </button>
              <button
                onClick={() => setActiveTab(activeMode === 'traveler' ? 'earnings' : 'expenses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === (activeMode === 'traveler' ? 'earnings' : 'expenses')
                    ? `border-${activeMode === 'traveler' ? 'blue' : 'green'}-600 text-${activeMode === 'traveler' ? 'blue' : 'green'}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {activeMode === 'traveler' ? t('dashboard.earnings') : t('dashboard.expenses')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {activeMode === 'traveler' ? (
                  <>
                    {/* Next Travel */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Prochain voyage</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-600 p-3 rounded-lg">
                            <Plane className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{currentStats.nextTravel.destination}</p>
                            <p className="text-sm text-gray-600">{new Date(currentStats.nextTravel.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Réservations</p>
                          <p className="text-2xl font-bold text-blue-600">{currentStats.nextTravel.packages}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.recentActivity')}</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Package className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Colis livré avec succès</p>
                            <p className="text-xs text-gray-600">Paris → Londres • Il y a 2 jours</p>
                          </div>
                          <div className="text-green-600 font-medium">+25€</div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Nouvelle réservation</p>
                            <p className="text-xs text-gray-600">New York → Paris • Il y a 3 jours</p>
                          </div>
                          <div className="text-blue-600 font-medium">Nouveau</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Active Shipments */}
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Colis en cours</h3>
                      <div className="space-y-4">
                        {mockPackages.filter(pkg => pkg.status === 'in_transit').map((pkg) => (
                          <div key={pkg.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="bg-purple-100 p-2 rounded-lg">
                                <Package className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{pkg.description}</p>
                                <p className="text-sm text-gray-600">{pkg.origin} → {pkg.destination}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pkg.status)}`}>
                                {getStatusText(pkg.status)}
                              </span>
                              <p className="text-xs text-gray-600 mt-1">{pkg.trackingNumber}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Deliveries */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Livraisons récentes</h3>
                      <div className="space-y-4">
                        {mockPackages.filter(pkg => pkg.status === 'delivered').slice(0, 3).map((pkg) => (
                          <div key={pkg.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="bg-green-100 p-2 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{pkg.description}</p>
                                <p className="text-sm text-gray-600">Livré le {pkg.deliveredDate}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1">
                                {[...Array(pkg.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                                ))}
                              </div>
                              <p className="text-sm text-gray-600">{pkg.totalPrice}€</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {(activeTab === 'travels' || activeTab === 'packages') && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activeMode === 'traveler' ? 'Mes voyages' : 'Tous mes colis'}
                  </h3>
                  <button className={`${activeMode === 'traveler' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2`}>
                    <Plus className="w-4 h-4" />
                    <span>{activeMode === 'traveler' ? 'Nouveau voyage' : 'Nouveau colis'}</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {activeMode === 'traveler' ? (
                    mockTravels.map((travel) => (
                      <div key={travel.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <Plane className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {travel.origin.city} → {travel.destination.city}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {new Date(travel.departureDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {travel.status === 'active' ? 'Actif' : 'Terminé'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Espace disponible</p>
                            <p className="font-medium">{travel.availableSpace}kg</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Prix/kg</p>
                            <p className="font-medium">{travel.pricePerKg}€</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Réservations</p>
                            <p className="font-medium">{travel.bookings}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Gains estimés</p>
                            <p className="font-medium text-green-600">
                              {(travel.maxWeight - travel.availableSpace) * travel.pricePerKg * 0.85}€
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Voir détails
                          </button>
                          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                            Modifier
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    mockPackages.map((pkg) => (
                      <div key={pkg.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                              <Package className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{pkg.description}</h4>
                              <p className="text-sm text-gray-600">{pkg.origin} → {pkg.destination}</p>
                              <p className="text-xs text-gray-500 mt-1">Voyageur: {pkg.traveler}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pkg.status)}`}>
                            {getStatusText(pkg.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Poids</p>
                            <p className="font-medium">{pkg.weight}kg</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Prix total</p>
                            <p className="font-medium">{pkg.totalPrice}€</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Suivi</p>
                            <p className="font-medium text-blue-600">{pkg.trackingNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              {pkg.status === 'delivered' ? 'Livré le' : 'Livraison prévue'}
                            </p>
                            <p className="font-medium">
                              {pkg.status === 'delivered' ? pkg.deliveredDate : pkg.estimatedDelivery}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Suivre
                            </button>
                            <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                              Contacter voyageur
                            </button>
                          </div>
                          
                          {pkg.status === 'delivered' && !pkg.rating && (
                            <button className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
                              Noter le voyage
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {(activeTab === 'earnings' || activeTab === 'expenses') && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeMode === 'traveler' ? (
                    <>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('common.thisMonth')}</h4>
                        <p className="text-3xl font-bold text-green-600">425€</p>
                        <p className="text-sm text-gray-600 mt-1">+15% vs mois dernier</p>
                      </div>
                      
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">En attente</h4>
                        <p className="text-3xl font-bold text-blue-600">150€</p>
                        <p className="text-sm text-gray-600 mt-1">2 paiements en cours</p>
                      </div>
                      
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('common.total')}</h4>
                        <p className="text-3xl font-bold text-purple-600">1,250€</p>
                        <p className="text-sm text-gray-600 mt-1">25 livraisons</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('common.thisMonth')}</h4>
                        <p className="text-3xl font-bold text-blue-600">125€</p>
                        <p className="text-sm text-gray-600 mt-1">3 envois</p>
                      </div>
                      
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{t('common.savings')}</h4>
                        <p className="text-3xl font-bold text-green-600">850€</p>
                        <p className="text-sm text-gray-600 mt-1">vs envoi traditionnel</p>
                      </div>
                      
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Total dépensé</h4>
                        <p className="text-3xl font-bold text-purple-600">340€</p>
                        <p className="text-sm text-gray-600 mt-1">8 colis</p>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {activeMode === 'traveler' ? 'Historique des paiements' : 'Historique des dépenses'}
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-center">
                      {activeMode === 'traveler' ? 'Graphique des gains à venir...' : 'Graphique des dépenses à venir...'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}