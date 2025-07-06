import { format } from 'date-fns';

// Currency Formatter
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Number Formatter
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Date Formatter
export const formatDate = (date: Date | string, pattern: string = 'dd MMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, pattern);
};

// Relative Time Formatter
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateObj);
  }
};

// Phone Number Formatter
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// Text Truncation
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Slug Generator
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// File Size Formatter
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Percentage Formatter
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return Math.round((value / total) * 100) + '%';
};

// Rating Formatter
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Discount Formatter
export const formatDiscount = (originalPrice: number, currentPrice: number): string => {
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount) + '% OFF';
};

// Order Number Generator
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `HB${timestamp.slice(-8)}${random}`;
};

// Color Code Formatter
export const formatColorCode = (hex: string): string => {
  return hex.toUpperCase().replace('#', '');
};

// URL Formatter
export const formatUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
};

// Social Media Handle Formatter
export const formatSocialHandle = (handle: string): string => {
  return handle.replace('@', '').toLowerCase();
};

// Search Query Formatter
export const formatSearchQuery = (query: string): string => {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
};

// Product SKU Generator
export const generateSKU = (category: string, brand: string, productName: string): string => {
  const categoryCode = category.slice(0, 3).toUpperCase();
  const brandCode = brand.slice(0, 3).toUpperCase();
  const productCode = productName.slice(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  
  return `${categoryCode}${brandCode}${productCode}${timestamp}`;
};

// Review Summary Formatter
export const formatReviewSummary = (reviews: any[]): string => {
  if (reviews.length === 0) return 'No reviews yet';
  if (reviews.length === 1) return '1 review';
  return `${reviews.length} reviews`;
};

// Delivery Time Formatter
export const formatDeliveryTime = (days: number): string => {
  if (days === 0) return 'Same day delivery';
  if (days === 1) return 'Next day delivery';
  return `${days} days delivery`;
};

// Stock Status Formatter
export const formatStockStatus = (stock: number): string => {
  if (stock === 0) return 'Out of stock';
  if (stock <= 5) return 'Low stock';
  return 'In stock';
};

// Age Group Formatter
export const formatAgeGroup = (age: number): string => {
  if (age < 18) return 'Under 18';
  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  return '55+';
};

// Ingredient List Formatter
export const formatIngredientList = (ingredients: string[]): string => {
  if (ingredients.length === 0) return 'No ingredients listed';
  if (ingredients.length <= 3) return ingredients.join(', ');
  return ingredients.slice(0, 3).join(', ') + ` and ${ingredients.length - 3} more`;
};

// Error Message Formatter
export const formatErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return 'An unexpected error occurred';
};

// Validation Message Formatter
export const formatValidationMessage = (field: string, rule: string): string => {
  const messages: { [key: string]: string } = {
    required: `${field} is required`,
    email: 'Please enter a valid email address',
    min: `${field} must be at least {min} characters`,
    max: `${field} must be at most {max} characters`,
    pattern: `${field} format is invalid`
  };
  
  return messages[rule] || `${field} is invalid`;
};