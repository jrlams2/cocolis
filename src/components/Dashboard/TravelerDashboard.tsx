import React, { useState } from 'react';
import { Plus, Plane, Package, Star, DollarSign, Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

export function TravelerDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const mockStats = {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('nav.dashboard')} - {user?.firstName}
          </h1>
          <p className="text-gray-600 mt-2">Gérez vos voyages et suivez vos gains</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Voyages totaux</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalTravels}</p>
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
                <p className="text-2xl font-bold text-gray-900">{mockStats.completedDeliveries}</p>
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
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalEarnings}€</p>
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
                <p className="text-2xl font-bold text-gray-900">{mockStats.rating}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>{t('travel.createTravel')}</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Voir le calendrier</span>
            </button>
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
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('travels')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'travels'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Mes voyages
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'earnings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gains
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Next Travel */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prochain voyage</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-600 p-3 rounded-lg">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{mockStats.nextTravel.destination}</p>
                        <p className="text-sm text-gray-600">{new Date(mockStats.nextTravel.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Réservations</p>
                      <p className="text-2xl font-bold text-blue-600">{mockStats.nextTravel.packages}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
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
              </div>
            )}

            {activeTab === 'travels' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Mes voyages</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Nouveau voyage</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {mockTravels.map((travel) => (
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
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Ce mois</h4>
                    <p className="text-3xl font-bold text-green-600">425€</p>
                    <p className="text-sm text-gray-600 mt-1">+15% vs mois dernier</p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">En attente</h4>
                    <p className="text-3xl font-bold text-blue-600">150€</p>
                    <p className="text-sm text-gray-600 mt-1">2 paiements en cours</p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Total</h4>
                    <p className="text-3xl font-bold text-purple-600">1,250€</p>
                    <p className="text-sm text-gray-600 mt-1">25 livraisons</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Historique des paiements</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-center">Graphique des gains à venir...</p>
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