import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UnifiedDashboard } from './UnifiedDashboard';
import { AdminDashboard } from '../Admin/AdminDashboard';

export function Dashboard() {
  const { user } = useAuth();

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

  // Show admin dashboard for admin users
  if (user.isAdmin || user.roles?.includes('admin')) {
    return <AdminDashboard />;
  }

  // Show unified dashboard for regular users
  return <UnifiedDashboard />;
}