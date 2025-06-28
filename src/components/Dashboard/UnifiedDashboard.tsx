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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 font-light">Please log in to access your dashboard.</p>
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
      description: 'Important documents',
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
      description: 'Artisan products',
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
      case 'pending': return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
      case 'accepted': return 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'in_transit': return 'bg-gray-50 text-gray-800 border border-gray-200';
      case 'delivered': return 'bg-green-50 text-green-800 border border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-800 border border-red-200';
      case 'active': return 'bg-green-50 text-green-800 border border-green-200';
      default: return 'bg-gray-50 text-gray-800 border border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return t(`package.status.${status}`) || status;
  };

  const currentStats = mockStats[activeMode];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Mode Toggle - Harvard Style */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 border border-gray-200 text-sm font-medium mb-6 uppercase tracking-wide">
                <Users className="w-4 h-4 mr-2" />
                Personal Dashboard
              </div>
              <h1 className="text-4xl font-light text-gray-900 mb-4">
                Welcome,
                <span className="font-normal text-red-600"> {user?.firstName}</span>
              </h1>
              <p className="text-gray-600 font-light text-lg">
                {activeMode === 'traveler' 
                  ? 'Manage your travels and track your earnings'
                  : 'Manage your shipments and track your packages'
                }
              </p>
            </div>
            
            {/* Mode Toggle - Clean Harvard Style */}
            <div className="mt-6 sm:mt-0">
              <div className="bg-white border border-gray-300 flex items-center">
                <button
                  onClick={() => setActiveMode('sender')}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all uppercase tracking-wide ${
                    activeMode === 'sender'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>{t('dashboard.switchToSender')}</span>
                </button>
                <button
                  onClick={() => setActiveMode('traveler')}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all uppercase tracking-wide ${
                    activeMode === 'traveler'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>{t('dashboard.switchToTraveler')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Harvard Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {activeMode === 'traveler' ? (
            <>
              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-600 p-3">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{t('travel.totalTravels')}</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.totalTravels}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-600 p-3">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Deliveries</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.completedDeliveries}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-600 p-3">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total Earnings</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.totalEarnings}€</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-600 p-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Average Rating</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.rating}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-600 p-3">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{t('package.totalPackages')}</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.totalPackages}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-600 p-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">In Transit</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.activePackages}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-600 p-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Delivered</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.deliveredPackages}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-600 p-3">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{t('common.savings')}</p>
                    <p className="text-3xl font-light text-gray-900">{currentStats.savedMoney}€</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions - Harvard Style */}
        <div className="bg-white border border-gray-200 p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-6">{t('dashboard.quickActions')}</h2>
          <div className="flex flex-wrap gap-4">
            {activeMode === 'traveler' ? (
              <>
                <button className="bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 uppercase tracking-wide text-sm">
                  <Plus className="w-5 h-5" />
                  <span>{t('travel.createTravel')}</span>
                </button>
                <button className="bg-white text-gray-700 px-6 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 border border-gray-300 uppercase tracking-wide text-sm">
                  <Calendar className="w-5 h-5" />
                  <span>View Calendar</span>
                </button>
              </>
            ) : (
              <>
                <button className="bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 uppercase tracking-wide text-sm">
                  <Plus className="w-5 h-5" />
                  <span>{t('package.sendPackage')}</span>
                </button>
                <button className="bg-white text-gray-700 px-6 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 border border-gray-300 uppercase tracking-wide text-sm">
                  <Search className="w-5 h-5" />
                  <span>{t('travel.searchTravels')}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation Tabs - Harvard Style */}
        <div className="bg-white border border-gray-200 mb-8 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide ${
                  activeTab === 'overview'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('dashboard.overview')}
              </button>
              <button
                onClick={() => setActiveTab(activeMode === 'traveler' ? 'travels' : 'packages')}
                className={`py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide ${
                  activeTab === (activeMode === 'traveler' ? 'travels' : 'packages')
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {activeMode === 'traveler' ? t('dashboard.myTravels') : t('dashboard.myPackages')}
              </button>
              <button
                onClick={() => setActiveTab(activeMode === 'traveler' ? 'earnings' : 'expenses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide ${
                  activeTab === (activeMode === 'traveler' ? 'earnings' : 'expenses')
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {activeMode === 'traveler' ? t('dashboard.earnings') : t('dashboard.expenses')}
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {activeMode === 'traveler' ? (
                  <>
                    {/* Next Travel */}
                    <div className="bg-red-50 border border-red-200 p-8">
                      <h3 className="text-xl font-light text-gray-900 mb-6">Next Travel</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-red-600 p-3">
                            <Plane className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{currentStats.nextTravel.destination}</p>
                            <p className="text-sm text-gray-600 uppercase tracking-wide">{new Date(currentStats.nextTravel.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 uppercase tracking-wide">Bookings</p>
                          <p className="text-3xl font-light text-red-600">{currentStats.nextTravel.packages}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-xl font-light text-gray-900 mb-6">{t('dashboard.recentActivity')}</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-6 bg-gray-50 border border-gray-200">
                          <div className="bg-green-600 p-3">
                            <Package className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Package delivered successfully</p>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">Paris → London • 2 days ago</p>
                          </div>
                          <div className="text-green-600 font-medium">+25€</div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-6 bg-gray-50 border border-gray-200">
                          <div className="bg-gray-600 p-3">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">New booking received</p>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">New York → Paris • 3 days ago</p>
                          </div>
                          <div className="text-red-600 font-medium uppercase tracking-wide text-xs">New</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Active Shipments */}
                    <div className="bg-gray-50 border border-gray-200 p-8">
                      <h3 className="text-xl font-light text-gray-900 mb-6">Packages in Transit</h3>
                      <div className="space-y-4">
                        {mockPackages.filter(pkg => pkg.status === 'in_transit').map((pkg) => (
                          <div key={pkg.id} className="flex items-center justify-between bg-white p-6 border border-gray-200">
                            <div className="flex items-center space-x-4">
                              <div className="bg-gray-600 p-3">
                                <Package className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{pkg.description}</p>
                                <p className="text-sm text-gray-600">{pkg.origin} → {pkg.destination}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 text-sm font-medium uppercase tracking-wide ${getStatusColor(pkg.status)}`}>
                                {getStatusText(pkg.status)}
                              </span>
                              <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">{pkg.trackingNumber}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Deliveries */}
                    <div>
                      <h3 className="text-xl font-light text-gray-900 mb-6">Recent Deliveries</h3>
                      <div className="space-y-4">
                        {mockPackages.filter(pkg => pkg.status === 'delivered').slice(0, 3).map((pkg) => (
                          <div key={pkg.id} className="flex items-center justify-between p-6 bg-gray-50 border border-gray-200">
                            <div className="flex items-center space-x-4">
                              <div className="bg-green-600 p-3">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{pkg.description}</p>
                                <p className="text-sm text-gray-600 uppercase tracking-wide">Delivered on {pkg.deliveredDate}</p>
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

            {/* Additional tabs content would follow the same Harvard design pattern */}
          </div>
        </div>
      </div>
    </div>
  );
}