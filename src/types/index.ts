// Core Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  skinType?: 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal';
  skinTone?: 'fair' | 'medium' | 'olive' | 'brown' | 'dark';
  hairType?: 'straight' | 'wavy' | 'curly' | 'coily';
  beautyProfile?: BeautyProfile;
  preferences?: UserPreferences;
  addresses?: Address[];
  orders?: Order[];
  wishlist?: Product[];
  loyaltyPoints?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BeautyProfile {
  skinConcerns: string[];
  favoriteCategories: string[];
  allergies: string[];
  preferredBrands: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  previousPurchases: string[];
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    profileVisible: boolean;
    reviewsVisible: boolean;
    wishlistVisible: boolean;
  };
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  sku: string;
  brand: Brand;
  category: Category;
  subcategory?: Subcategory;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: ProductImage[];
  variants?: ProductVariant[];
  ingredients: Ingredient[];
  benefits: string[];
  usage: string;
  skinType: string[];
  hairType?: string[];
  concerns: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isInStock: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock?: number;
  image?: string;
  sku?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  concerns: string[];
  isActive: boolean;
  allergenInfo?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  parentId?: string;
  order: number;
  isActive: boolean;
  subcategories?: Subcategory[];
  createdAt: Date;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  categoryId: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
  totalPrice: number;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
  verified: boolean;
  helpful: number;
  images?: string[];
  videos?: string[];
  skinType?: string;
  ageGroup?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  type: 'user' | 'bot';
  message: string;
  context?: {
    intent: string;
    entities: any[];
    confidence: number;
  };
  suggestions?: string[];
  products?: Product[];
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  language: string;
  context: {
    currentFlow: string;
    userPreferences: any;
    previousProducts: string[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter Types
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  skinType?: string[];
  concerns?: string[];
  ingredients?: string[];
  inStock?: boolean;
  discount?: boolean;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchFilters extends ProductFilters {
  query: string;
}

// Language Support
export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  currency: string;
  dateFormat: string;
}

export interface TranslationContent {
  [key: string]: string | TranslationContent;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'moderator' | 'editor';
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
  topSellingProducts: Product[];
  recentOrders: Order[];
  userGrowth: {
    month: string;
    users: number;
  }[];
  revenueGrowth: {
    month: string;
    revenue: number;
  }[];
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface CheckoutForm {
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  notes?: string;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}