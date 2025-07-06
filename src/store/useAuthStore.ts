import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService } from '../services/auth';

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
            error: error.message || 'Login failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (userData: any) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register(userData);
          
          set({ 
            user: response.user, 
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
          const updatedUser = await authService.updateProfile(userData);
          
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