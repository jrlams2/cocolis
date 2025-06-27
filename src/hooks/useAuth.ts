import { useState, useEffect } from 'react';
import type { User, AuthState } from '../types';

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'voyageur@example.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    roles: ['traveler', 'sender'],
    verified: true,
    rating: 4.8,
    totalDeliveries: 15,
    totalTravels: 12,
    phone: '+33123456789'
  },
  {
    id: '2',
    email: 'expediteur@example.com',
    firstName: 'Marie',
    lastName: 'Martin',
    roles: ['sender'],
    verified: true,
    rating: 4.9,
    totalDeliveries: 8,
    totalTravels: 0,
    phone: '+33987654321'
  },
  {
    id: '3',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'System',
    roles: ['admin'],
    verified: true,
    rating: 5.0,
    totalDeliveries: 0,
    totalTravels: 0,
    isAdmin: true,
    phone: '+33000000000'
  }
];

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            loading: false
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            loading: false
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password') {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'traveler' | 'sender';
    phone?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
        roles: [userData.role],
        verified: false,
        rating: 0,
        totalDeliveries: 0,
        totalTravels: 0
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        loading: false
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  };

  return {
    ...authState,
    login,
    signup,
    logout
  };
}