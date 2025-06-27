import React, { useState } from 'react';
import { Users, Package, Plane, DollarSign, TrendingUp, Activity, Shield, Settings, Search, Filter, MoreVertical, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import type { AdminStats } from '../../types';

export function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user?.isAdmin && !user?.roles?.includes('admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  const mockStats: AdminStats = {
    totalUsers: 2847,
    totalTravelers: 1523,
    totalSenders: 1324,
    totalTravels: 4521,
    totalPackages: 8934,
    totalRevenue: 125430,
    monthlyGrowth: 15.3,
    activeUsers: 1247
  };

  const mockUsers = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'traveler',
      verified: true,
      joinDate: '2024-01-15',
      totalTravels: 12,
      rating: 4.8,
      status: 'active'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      role: 'sender',
      verified: true,
      joinDate: '2024-01-20',
      totalPackages: 8,
      rating: 4.9,
      status: 'active'
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      role: 'traveler',
      verified: false,
      joinDate: '2024-02-01',
      totalTravels: 0,
      rating: 0,
      status: 'pending'
    }
  ];

  const mockTravels = [
    {
      id: '1',
      traveler: 'Jean Dupont',
      route: 'Paris → New York',
      date: '2024-02-15',
      status: 'active',
      bookings: 3,
      revenue: 180
    },
    {
      id: '2',
      traveler: 'Sophie Laurent',
      route: 'London → Tokyo',
      date: '2024-02-20',
      status: 'completed',
      bookings: 5,
      revenue: 320
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Shield className="w-8 h-8 text-red-600" />
            <span>{t('admin.dashboard')}</span>
          </h1>
          <p className="text-gray-600 mt-2">Gérez la plateforme et surveillez les performances</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.totalUsers')}</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+{mockStats.monthlyGrowth}% ce mois</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Voyages totaux</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalTravels.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">{mockStats.totalTravelers} voyageurs</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Plane className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Colis totaux</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalPackages.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">{mockStats.totalSenders} expéditeurs</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('admin.totalRevenue')}</p>
                <p className="text-2xl font-bold text-gray-900">{mockStats.totalRevenue.toLocaleString()}€</p>
                <p className="text-xs text-yellow-600 mt-1">{mockStats.activeUsers} actifs</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Vérifier les utilisateurs</span>
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Voir les rapports</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Paramètres système</span>
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
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('admin.users')}
              </button>
              <button
                onClick={() => setActiveTab('travels')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'travels'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('admin.travels')}
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analyses
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* System Health */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>{t('admin.systemHealth')}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <div className="text-sm text-gray-600">Disponibilité</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">1.2s</div>
                      <div className="text-sm text-gray-600">Temps de réponse</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <div className="text-sm text-gray-600">Erreurs critiques</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Nouvel utilisateur inscrit</p>
                        <p className="text-xs text-gray-600">pierre.durand@example.com • Il y a 5 minutes</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Vérifier
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Plane className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Nouveau voyage publié</p>
                        <p className="text-xs text-gray-600">Paris → New York • Il y a 15 minutes</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{t('admin.userManagement')}</h3>
                  <div className="flex space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher un utilisateur..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filtrer</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Activité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Note
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'traveler' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {t(`auth.${user.role}`)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                              {user.verified && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.role === 'traveler' ? `${user.totalTravels} voyages` : `${user.totalPackages} colis`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-900">{user.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <XCircle className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'travels' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{t('admin.travelManagement')}</h3>
                  <div className="flex space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher un voyage..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filtrer</span>
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {mockTravels.map((travel) => (
                    <div key={travel.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <Plane className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{travel.route}</h4>
                            <p className="text-sm text-gray-600">Par {travel.traveler}</p>
                            <p className="text-xs text-gray-500">{travel.date}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(travel.status)}`}>
                          {travel.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Réservations</p>
                          <p className="font-medium">{travel.bookings}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Revenus</p>
                          <p className="font-medium text-green-600">{travel.revenue}€</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Commission</p>
                          <p className="font-medium text-blue-600">{(travel.revenue * 0.15).toFixed(0)}€</p>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Voir détails
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                          Contacter voyageur
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
                    <h4 className="text-lg font-semibold mb-2">Croissance mensuelle</h4>
                    <p className="text-3xl font-bold">+{mockStats.monthlyGrowth}%</p>
                    <p className="text-blue-100 mt-1">Nouveaux utilisateurs</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg text-white">
                    <h4 className="text-lg font-semibold mb-2">Revenus ce mois</h4>
                    <p className="text-3xl font-bold">18,750€</p>
                    <p className="text-green-100 mt-1">Commission plateforme</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Graphiques analytiques</h4>
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Graphiques détaillés à venir...</p>
                    <p className="text-sm text-gray-500 mt-2">Intégration avec des outils d'analyse avancés</p>
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