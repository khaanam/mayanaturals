import { apiService } from './api';
import { User, LoginForm, RegisterForm } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthResponse {}
export interface RegisterResponse extends AuthResponse {}

class AuthService {
  // Login user
  async login(credentials: LoginForm): Promise<LoginResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      apiService.setToken(response.data.token);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }
    
    throw new Error(response.message || 'Login failed');
  }

  // Register user
  async register(userData: RegisterForm): Promise<RegisterResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', userData);
    
    if (response.success && response.data) {
      apiService.setToken(response.data.token);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }
    
    throw new Error(response.message || 'Registration failed');
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiService.clearToken();
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  // Refresh token
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<{ token: string }>('/auth/refresh', {
      refreshToken
    });

    if (response.success && response.data) {
      apiService.setToken(response.data.token);
      return response.data.token;
    }

    throw new Error(response.message || 'Token refresh failed');
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    const response = await apiService.post('/auth/verify-email', { token });
    
    if (!response.success) {
      throw new Error(response.message || 'Email verification failed');
    }
  }

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<void> {
    const response = await apiService.post('/auth/resend-verification', { email });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to resend verification email');
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    const response = await apiService.post('/auth/forgot-password', { email });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset password email');
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiService.post('/auth/reset-password', {
      token,
      password: newPassword
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Password reset failed');
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await apiService.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Password change failed');
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/auth/me');
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to get user data');
  }

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', userData);
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    
    throw new Error(response.message || 'Profile update failed');
  }

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiService.upload<{ avatarUrl: string }>('/auth/upload-avatar', formData);
    
    if (response.success && response.data) {
      return response.data.avatarUrl;
    }
    
    throw new Error(response.message || 'Avatar upload failed');
  }

  // OAuth login
  async oauthLogin(provider: 'google' | 'facebook', code: string): Promise<LoginResponse> {
    const response = await apiService.post<AuthResponse>(`/auth/oauth/${provider}`, { code });
    
    if (response.success && response.data) {
      apiService.setToken(response.data.token);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }
    
    throw new Error(response.message || 'OAuth login failed');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  // Get stored user
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
      }
    }
    return null;
  }

  // Clear stored data
  clearStoredData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  // Check token expiration
  isTokenExpired(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Auto refresh token
  async autoRefreshToken(): Promise<void> {
    if (this.isTokenExpired()) {
      try {
        await this.refreshToken();
      } catch (error) {
        console.error('Auto refresh failed:', error);
        this.clearStoredData();
        window.location.href = '/login';
      }
    }
  }
}

export const authService = new AuthService();
export default authService;