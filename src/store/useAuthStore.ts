import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService } from '../services/auth';
import { TEMP_CREDENTIALS } from '../config/constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
  loadUserFromStorage: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string, rememberMe = false) => {
        set({ isLoading: true, error: null });
        
        try {
          // Check temporary credentials
          if (email === TEMP_CREDENTIALS.admin.email && password === TEMP_CREDENTIALS.admin.password) {
            const adminUser: User = {
              id: 'admin-1',
              email: TEMP_CREDENTIALS.admin.email,
              firstName: 'Admin',
              lastName: 'User',
              phone: '+91 98765 43210',
              avatar: undefined,
              dateOfBirth: undefined,
              gender: undefined,
              skinType: undefined,
              skinTone: undefined,
              hairType: undefined,
              beautyProfile: undefined,
              preferences: undefined,
              addresses: [],
              orders: [],
              wishlist: [],
              loyaltyPoints: 0,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            
            set({ 
              user: adminUser, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return;
          }
          
          if (email === TEMP_CREDENTIALS.user.email && password === TEMP_CREDENTIALS.user.password) {
            const regularUser: User = {
              id: 'user-1',
              email: TEMP_CREDENTIALS.user.email,
              firstName: 'Maya',
              lastName: 'Customer',
              phone: '+91 87654 32109',
              avatar: undefined,
              dateOfBirth: new Date('1990-01-01'),
              gender: 'female',
              skinType: 'combination',
              skinTone: 'medium',
              hairType: 'wavy',
              beautyProfile: {
                skinConcerns: ['acne', 'dark-spots'],
                favoriteCategories: ['skincare', 'haircare'],
                allergies: [],
                preferredBrands: ['maya-naturals', 'himalaya'],
                budgetRange: { min: 500, max: 2000 },
                previousPurchases: []
              },
              preferences: {
                language: 'en',
                currency: 'INR',
                notifications: {
                  email: true,
                  sms: false,
                  push: true
                },
                privacy: {
                  profileVisible: true,
                  reviewsVisible: true,
                  wishlistVisible: false
                }
              },
              addresses: [],
              orders: [],
              wishlist: [],
              loyaltyPoints: 150,
              createdAt: new Date(),
              updatedAt: new Date()
            };
            
            set({ 
              user: regularUser, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return;
          }
          
          // If not temp credentials, try actual API
          const response = await authService.login({ 
            email, 
            password, 
            rememberMe 
          });
          
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Invalid email or password', 
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (userData: any) => {
        set({ isLoading: true, error: null });
        
        try {
          // For demo purposes, create a mock user
          const newUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            avatar: undefined,
            dateOfBirth: undefined,
            gender: undefined,
            skinType: undefined,
            skinTone: undefined,
            hairType: undefined,
            beautyProfile: undefined,
            preferences: {
              language: 'en',
              currency: 'INR',
              notifications: {
                email: true,
                sms: false,
                push: true
              },
              privacy: {
                profileVisible: true,
                reviewsVisible: true,
                wishlistVisible: false
              }
            },
            addresses: [],
            orders: [],
            wishlist: [],
            loyaltyPoints: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Registration failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: null 
          });
        } catch (error: any) {
          console.error('Logout error:', error);
          // Still clear the local state even if API call fails
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: null 
          });
        }
      },

      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        try {
          const { user } = get();
          if (!user) throw new Error('No user found');
          
          const updatedUser = { ...user, ...userData, updatedAt: new Date() };
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Profile update failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      loadUserFromStorage: () => {
        const user = authService.getStoredUser();
        const isAuthenticated = authService.isAuthenticated();
        
        set({ 
          user, 
          isAuthenticated 
        });
      },

      checkAuth: async () => {
        if (!authService.isAuthenticated()) {
          set({ 
            user: null, 
            isAuthenticated: false 
          });
          return;
        }

        if (authService.isTokenExpired()) {
          try {
            await authService.autoRefreshToken();
            const user = await authService.getCurrentUser();
            set({ 
              user, 
              isAuthenticated: true 
            });
          } catch (error) {
            console.error('Auto refresh failed:', error);
            set({ 
              user: null, 
              isAuthenticated: false 
            });
          }
        } else {
          // Token is valid, load user data
          const user = authService.getStoredUser();
          set({ 
            user, 
            isAuthenticated: true 
          });
        }
      }
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Auto-load user on store initialization
useAuthStore.getState().loadUserFromStorage();