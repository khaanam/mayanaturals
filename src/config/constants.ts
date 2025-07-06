// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 10000;

// App Configuration
export const APP_NAME = 'Hirable Beauty Products';
export const APP_DESCRIPTION = 'Premium Beauty & Cosmetics for Indian Market';
export const APP_VERSION = '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];

// Cart & Checkout
export const MAX_CART_ITEMS = 50;
export const MAX_QUANTITY_PER_ITEM = 10;
export const FREE_SHIPPING_THRESHOLD = 999; // INR
export const TAX_RATE = 0.18; // 18% GST

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 'skincare',
    name: 'Skincare',
    slug: 'skincare',
    icon: '🧴',
    subcategories: [
      { id: 'cleansers', name: 'Cleansers', slug: 'cleansers' },
      { id: 'moisturizers', name: 'Moisturizers', slug: 'moisturizers' },
      { id: 'serums', name: 'Serums', slug: 'serums' },
      { id: 'sunscreen', name: 'Sunscreen', slug: 'sunscreen' },
      { id: 'masks', name: 'Masks', slug: 'masks' },
      { id: 'toners', name: 'Toners', slug: 'toners' },
      { id: 'exfoliants', name: 'Exfoliants', slug: 'exfoliants' }
    ]
  },
  {
    id: 'makeup',
    name: 'Makeup',
    slug: 'makeup',
    icon: '💄',
    subcategories: [
      { id: 'face', name: 'Face', slug: 'face' },
      { id: 'eyes', name: 'Eyes', slug: 'eyes' },
      { id: 'lips', name: 'Lips', slug: 'lips' },
      { id: 'nails', name: 'Nails', slug: 'nails' },
      { id: 'brushes', name: 'Brushes & Tools', slug: 'brushes-tools' }
    ]
  },
  {
    id: 'haircare',
    name: 'Haircare',
    slug: 'haircare',
    icon: '🧴',
    subcategories: [
      { id: 'shampoo', name: 'Shampoo', slug: 'shampoo' },
      { id: 'conditioner', name: 'Conditioner', slug: 'conditioner' },
      { id: 'hair-oil', name: 'Hair Oil', slug: 'hair-oil' },
      { id: 'styling', name: 'Styling', slug: 'styling' },
      { id: 'treatments', name: 'Treatments', slug: 'treatments' }
    ]
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    slug: 'fragrance',
    icon: '🌸',
    subcategories: [
      { id: 'perfumes', name: 'Perfumes', slug: 'perfumes' },
      { id: 'body-mist', name: 'Body Mist', slug: 'body-mist' },
      { id: 'deodorants', name: 'Deodorants', slug: 'deodorants' }
    ]
  },
  {
    id: 'tools',
    name: 'Beauty Tools',
    slug: 'tools',
    icon: '🔧',
    subcategories: [
      { id: 'face-tools', name: 'Face Tools', slug: 'face-tools' },
      { id: 'hair-tools', name: 'Hair Tools', slug: 'hair-tools' },
      { id: 'accessories', name: 'Accessories', slug: 'accessories' }
    ]
  }
];

// Skin Types
export const SKIN_TYPES = [
  { id: 'normal', name: 'Normal', description: 'Balanced skin with few imperfections' },
  { id: 'dry', name: 'Dry', description: 'Lacks moisture, may feel tight' },
  { id: 'oily', name: 'Oily', description: 'Excess oil production, prone to shine' },
  { id: 'combination', name: 'Combination', description: 'Oily T-zone, dry cheeks' },
  { id: 'sensitive', name: 'Sensitive', description: 'Easily irritated, reactive skin' }
];

// Skin Concerns
export const SKIN_CONCERNS = [
  { id: 'acne', name: 'Acne', description: 'Breakouts and blemishes' },
  { id: 'dark-spots', name: 'Dark Spots', description: 'Hyperpigmentation and uneven tone' },
  { id: 'wrinkles', name: 'Anti-aging', description: 'Fine lines and wrinkles' },
  { id: 'dullness', name: 'Dullness', description: 'Lack of radiance and glow' },
  { id: 'pores', name: 'Large Pores', description: 'Enlarged or visible pores' },
  { id: 'redness', name: 'Redness', description: 'Inflammation and irritation' },
  { id: 'dark-circles', name: 'Dark Circles', description: 'Under-eye discoloration' }
];

// Hair Types
export const HAIR_TYPES = [
  { id: 'straight', name: 'Straight', description: 'Type 1: Straight hair' },
  { id: 'wavy', name: 'Wavy', description: 'Type 2: Wavy hair' },
  { id: 'curly', name: 'Curly', description: 'Type 3: Curly hair' },
  { id: 'coily', name: 'Coily', description: 'Type 4: Coily/Kinky hair' }
];

// Popular Brands
export const POPULAR_BRANDS = [
  { id: 'lakme', name: 'Lakmé', logo: '/brands/lakme.png' },
  { id: 'loreal', name: 'L\'Oréal', logo: '/brands/loreal.png' },
  { id: 'maybelline', name: 'Maybelline', logo: '/brands/maybelline.png' },
  { id: 'nykaa', name: 'Nykaa', logo: '/brands/nykaa.png' },
  { id: 'lotus', name: 'Lotus', logo: '/brands/lotus.png' },
  { id: 'himalaya', name: 'Himalaya', logo: '/brands/himalaya.png' },
  { id: 'biotique', name: 'Biotique', logo: '/brands/biotique.png' },
  { id: 'plum', name: 'Plum', logo: '/brands/plum.png' }
];

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'razorpay', name: 'Razorpay', icon: '💳', description: 'Cards, UPI, Net Banking' },
  { id: 'stripe', name: 'Stripe', icon: '💳', description: 'International Cards' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💰', description: 'Pay when you receive' }
];

// Order Status
export const ORDER_STATUS = [
  { id: 'pending', name: 'Pending', color: 'yellow', description: 'Order received' },
  { id: 'confirmed', name: 'Confirmed', color: 'blue', description: 'Order confirmed' },
  { id: 'processing', name: 'Processing', color: 'orange', description: 'Being prepared' },
  { id: 'shipped', name: 'Shipped', color: 'purple', description: 'Out for delivery' },
  { id: 'delivered', name: 'Delivered', color: 'green', description: 'Successfully delivered' },
  { id: 'cancelled', name: 'Cancelled', color: 'red', description: 'Order cancelled' }
];

// Chatbot Intents
export const CHATBOT_INTENTS = [
  'product_search',
  'product_recommendation',
  'ingredient_info',
  'skin_analysis',
  'routine_suggestion',
  'order_status',
  'return_policy',
  'general_inquiry'
];

// Review Ratings
export const REVIEW_RATINGS = [
  { value: 5, label: 'Excellent', color: 'green' },
  { value: 4, label: 'Good', color: 'lime' },
  { value: 3, label: 'Average', color: 'yellow' },
  { value: 2, label: 'Poor', color: 'orange' },
  { value: 1, label: 'Terrible', color: 'red' }
];

// Social Media Links
export const SOCIAL_MEDIA = [
  { id: 'facebook', name: 'Facebook', url: '#', icon: '📘' },
  { id: 'instagram', name: 'Instagram', url: '#', icon: '📷' },
  { id: 'twitter', name: 'Twitter', url: '#', icon: '🐦' },
  { id: 'youtube', name: 'YouTube', url: '#', icon: '📺' },
  { id: 'pinterest', name: 'Pinterest', url: '#', icon: '📌' }
];

// Cookie Settings
export const COOKIE_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false
};

// SEO Defaults
export const SEO_DEFAULTS = {
  title: 'Hirable Beauty Products - Premium Beauty & Cosmetics',
  description: 'Discover premium beauty products for Indian skin. Shop skincare, makeup, haircare & more from top brands. Free shipping on orders above ₹999.',
  keywords: 'beauty products, skincare, makeup, haircare, cosmetics, Indian beauty, premium beauty',
  author: 'Hirable Beauty Products',
  canonical: 'https://hirablebeauty.com'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You need to login to access this feature.',
  FORBIDDEN: 'You don\'t have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  OUT_OF_STOCK: 'This product is currently out of stock.',
  INVALID_COUPON: 'Invalid or expired coupon code.',
  CART_EMPTY: 'Your cart is empty.',
  ADDRESS_REQUIRED: 'Please add a delivery address.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  WEAK_PASSWORD: 'Password must be at least 8 characters long.',
  PASSWORDS_NOT_MATCH: 'Passwords do not match.',
  TERMS_NOT_ACCEPTED: 'Please accept the terms and conditions.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Account created successfully! Please verify your email.',
  LOGIN_SUCCESS: 'Welcome back! You have been logged in successfully.',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  PASSWORD_UPDATED: 'Your password has been updated successfully.',
  ADDRESS_ADDED: 'Address has been added successfully.',
  ADDRESS_UPDATED: 'Address has been updated successfully.',
  PRODUCT_ADDED_TO_CART: 'Product added to cart successfully.',
  CART_UPDATED: 'Cart updated successfully.',
  ORDER_PLACED: 'Your order has been placed successfully.',
  REVIEW_SUBMITTED: 'Thank you for your review!',
  WISHLIST_UPDATED: 'Wishlist updated successfully.',
  NEWSLETTER_SUBSCRIBED: 'You have been subscribed to our newsletter.',
  CONTACT_FORM_SUBMITTED: 'Your message has been sent successfully.'
};