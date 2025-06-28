import React, { useState } from 'react';
import { Users, Package, Plane, DollarSign, TrendingUp, Activity, Shield, Settings, Search, Filter, MoreVertical, CheckCircle, XCircle, Eye, Star, Award, BookOpen } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import type { AdminStats } from '../../types';

export function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user?.isAdmin && !user?.roles?.includes('admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 font-light">You don't have permission to access this area.</p>
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
      case 'active': return 'bg-green-50 text-green-800 border border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
      case 'suspended': return 'bg-red-50 text-red-800 border border-red-200';
      case 'completed': return 'bg-blue-50 text-blue-800 border border-blue-200';
      default: return 'bg-gray-50 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - Harvard Style */}
        <div className="mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 border border-red-200 text-sm font-medium mb-6 uppercase tracking-wide">
            <Shield className="w-4 h-4 mr-2" />
            Administrative Portal
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            System
            <span className="font-normal text-red-600"> Administration</span>
          </h1>
          <p className="text-gray-600 font-light text-lg">Monitor platform performance and manage global operations</p>
        </div>

        {/* Stats Cards - Clean Harvard Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-600 p-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{t('admin.totalUsers')}</p>
                <p className="text-3xl font-light text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-xs text-green-600 font-medium">+{mockStats.monthlyGrowth}% this month</div>
          </div>

          <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-600 p-3">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Travels</p>
                <p className="text-3xl font-light text-gray-900">{mockStats.totalTravels.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-xs text-gray-600">{mockStats.totalTravelers} travelers</div>
          </div>

          <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-600 p-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total Packages</p>
                <p className="text-3xl font-light text-gray-900">{mockStats.totalPackages.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-xs text-gray-600">{mockStats.totalSenders} senders</div>
          </div>

          <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-600 p-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{t('admin.totalRevenue')}</p>
                <p className="text-3xl font-light text-gray-900">{mockStats.totalRevenue.toLocaleString()}€</p>
              </div>
            </div>
            <div className="text-xs text-gray-600">{mockStats.activeUsers} active users</div>
          </div>
        </div>

        {/* Quick Actions - Harvard Style */}
        <div className="bg-white border border-gray-200 p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Administrative Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 uppercase tracking-wide text-sm">
              <Shield className="w-5 h-5" />
              <span>Verify Users</span>
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2 uppercase tracking-wide text-sm">
              <Activity className="w-5 h-5" />
              <span>View Reports</span>
            </button>
            <button className="bg-white text-gray-700 px-6 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 border border-gray-300 uppercase tracking-wide text-sm">
              <Settings className="w-5 h-5" />
              <span>System Settings</span>
            </button>
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
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide ${
                  activeTab === 'users'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('admin.users')}
              </button>
              <button
                onClick={() => setActiveTab('travels')}
                className={`py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide ${
                  activeTab === 'travels'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('admin.travels')}
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide ${
                  activeTab === 'analytics'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* System Health - Harvard Style */}
                <div className="bg-green-50 border border-green-200 p-8">
                  <h3 className="text-xl font-light text-gray-900 mb-6 flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>{t('admin.systemHealth')}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-light text-green-600 mb-2">99.9%</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wide">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-light text-green-600 mb-2">1.2s</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wide">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-light text-green-600 mb-2">0</div>
                      <div className="text-sm text-gray-600 uppercase tracking-wide">Critical Errors</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-6 bg-gray-50 border border-gray-200">
                      <div className="bg-green-600 p-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New User Registration</p>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">pierre.durand@example.com • 5 minutes ago</p>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium uppercase tracking-wide">
                        Verify
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-6 bg-gray-50 border border-gray-200">
                      <div className="bg-gray-600 p-3">
                        <Plane className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New Travel Posted</p>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Paris → New York • 15 minutes ago</p>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium uppercase tracking-wide">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-light text-gray-900">{t('admin.userManagement')}</h3>
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-sm font-medium uppercase tracking-wide">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Activity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
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
                                <div className="h-10 w-10 bg-gray-600 flex items-center justify-center">
                                  <span className="text-sm font-medium text-white">
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
                            <span className={`inline-flex px-2 py-1 text-xs font-medium border uppercase tracking-wide ${
                              user.role === 'traveler' ? 'bg-gray-50 text-gray-800 border-gray-200' : 'bg-red-50 text-red-800 border-red-200'
                            }`}>
                              {t(`auth.${user.role}`)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium uppercase tracking-wide ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                              {user.verified && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.role === 'traveler' ? `${user.totalTravels} travels` : `${user.totalPackages} packages`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-900">{user.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-red-600 hover:text-red-900">
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
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-light text-gray-900">{t('admin.travelManagement')}</h3>
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search travels..."
                        className="pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-sm font-medium uppercase tracking-wide">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="grid gap-8">
                  {mockTravels.map((travel) => (
                    <div key={travel.id} className="border border-gray-200 p-8 bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-600 p-3">
                            <Plane className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-lg">{travel.route}</h4>
                            <p className="text-sm text-gray-600">By {travel.traveler}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{travel.date}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium uppercase tracking-wide ${getStatusColor(travel.status)}`}>
                          {travel.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Bookings</p>
                          <p className="font-medium text-lg">{travel.bookings}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Revenue</p>
                          <p className="font-medium text-green-600 text-lg">{travel.revenue}€</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Commission</p>
                          <p className="font-medium text-red-600 text-lg">{(travel.revenue * 0.15).toFixed(0)}€</p>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium uppercase tracking-wide">
                          View Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium uppercase tracking-wide">
                          Contact Traveler
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-red-50 border border-red-200 p-8 text-center">
                    <h4 className="text-xl font-light text-gray-900 mb-4">Monthly Growth</h4>
                    <p className="text-4xl font-light text-red-600 mb-2">+{mockStats.monthlyGrowth}%</p>
                    <p className="text-sm text-gray-600 uppercase tracking-wide">New Users</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-8 text-center">
                    <h4 className="text-xl font-light text-gray-900 mb-4">Monthly Revenue</h4>
                    <p className="text-4xl font-light text-gray-600 mb-2">18,750€</p>
                    <p className="text-sm text-gray-600 uppercase tracking-wide">Platform Commission</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-light text-gray-900 mb-6">Analytics Dashboard</h4>
                  <div className="bg-gray-50 border border-gray-200 p-12 text-center">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                    <p className="text-gray-600 font-light text-lg">Advanced analytics coming soon...</p>
                    <p className="text-sm text-gray-500 mt-2 uppercase tracking-wide">Integration with advanced analytics tools</p>
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