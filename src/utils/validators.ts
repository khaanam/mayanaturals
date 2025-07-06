import * as yup from 'yup';

// Common validation schemas
export const emailSchema = yup
  .string()
  .email('Please enter a valid email address')
  .required('Email is required');

export const phoneSchema = yup
  .string()
  .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number')
  .required('Phone number is required');

export const passwordSchema = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
  .required('Password is required');

export const nameSchema = yup
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be at most 50 characters')
  .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
  .required('Name is required');

export const pincodeSchema = yup
  .string()
  .matches(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit pincode')
  .required('Pincode is required');

// Form validation schemas
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean()
});

export const registerSchema = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: phoneSchema.optional(),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions')
});

export const addressSchema = yup.object().shape({
  type: yup.string().oneOf(['home', 'work', 'other']).required('Address type is required'),
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema,
  addressLine1: yup
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be at most 100 characters')
    .required('Address is required'),
  addressLine2: yup
    .string()
    .max(100, 'Address must be at most 100 characters')
    .optional(),
  city: yup
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be at most 50 characters')
    .required('City is required'),
  state: yup
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be at most 50 characters')
    .required('State is required'),
  pincode: pincodeSchema,
  country: yup.string().default('India').required('Country is required'),
  isDefault: yup.boolean().default(false)
});

export const profileSchema = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema.optional(),
  dateOfBirth: yup.date().max(new Date(), 'Date of birth cannot be in the future').optional(),
  gender: yup.string().oneOf(['male', 'female', 'other']).optional(),
  skinType: yup.string().oneOf(['normal', 'dry', 'oily', 'combination', 'sensitive']).optional(),
  skinTone: yup.string().oneOf(['fair', 'medium', 'olive', 'brown', 'dark']).optional(),
  hairType: yup.string().oneOf(['straight', 'wavy', 'curly', 'coily']).optional()
});

export const reviewSchema = yup.object().shape({
  rating: yup
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  title: yup
    .string()
    .min(5, 'Review title must be at least 5 characters')
    .max(100, 'Review title must be at most 100 characters')
    .required('Review title is required'),
  comment: yup
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be at most 1000 characters')
    .required('Review comment is required'),
  pros: yup.array().of(yup.string()).optional(),
  cons: yup.array().of(yup.string()).optional(),
  wouldRecommend: yup.boolean().required('Please specify if you would recommend this product')
});

export const contactSchema = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be at most 100 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be at most 1000 characters')
    .required('Message is required')
});

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must be at most 100 characters')
    .required('Product name is required'),
  description: yup
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be at most 2000 characters')
    .required('Description is required'),
  shortDescription: yup
    .string()
    .min(5, 'Short description must be at least 5 characters')
    .max(200, 'Short description must be at most 200 characters')
    .required('Short description is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Price is required'),
  originalPrice: yup
    .number()
    .positive('Original price must be positive')
    .optional(),
  stock: yup
    .number()
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  brandId: yup.string().required('Brand is required'),
  categoryId: yup.string().required('Category is required'),
  subcategoryId: yup.string().optional(),
  skinType: yup.array().of(yup.string()).optional(),
  concerns: yup.array().of(yup.string()).optional(),
  ingredients: yup.array().of(yup.string()).optional(),
  benefits: yup.array().of(yup.string()).optional(),
  usage: yup.string().max(500, 'Usage instructions must be at most 500 characters').optional(),
  tags: yup.array().of(yup.string()).optional()
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password')
});

export const forgotPasswordSchema = yup.object().shape({
  email: emailSchema
});

export const resetPasswordSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

export const couponSchema = yup.object().shape({
  code: yup
    .string()
    .min(3, 'Coupon code must be at least 3 characters')
    .max(20, 'Coupon code must be at most 20 characters')
    .matches(/^[A-Z0-9]+$/, 'Coupon code can only contain uppercase letters and numbers')
    .required('Coupon code is required')
});

export const newsletterSchema = yup.object().shape({
  email: emailSchema
});

export const searchSchema = yup.object().shape({
  query: yup
    .string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must be at most 100 characters')
    .required('Search query is required')
});

// Utility functions for validation
export const validateEmail = (email: string): boolean => {
  return emailSchema.isValidSync(email);
};

export const validatePhone = (phone: string): boolean => {
  return phoneSchema.isValidSync(phone);
};

export const validatePassword = (password: string): boolean => {
  return passwordSchema.isValidSync(password);
};

export const validatePincode = (pincode: string): boolean => {
  return pincodeSchema.isValidSync(pincode);
};

export const validateForm = async (schema: yup.ObjectSchema<any>, data: any): Promise<{ isValid: boolean; errors: any }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: any = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};

export const getFieldError = (errors: any, field: string): string | undefined => {
  return errors?.[field];
};

export const hasFieldError = (errors: any, field: string): boolean => {
  return Boolean(errors?.[field]);
};

// Custom validation rules
export const customValidations = {
  isAdult: (date: Date): boolean => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  },
  
  isValidIndianState: (state: string): boolean => {
    const indianStates = [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
      'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
      'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
      'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
      'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
      'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ];
    return indianStates.includes(state);
  },
  
  isValidProductCode: (code: string): boolean => {
    return /^[A-Z]{2,3}[0-9]{4,8}$/.test(code);
  },
  
  isValidColorCode: (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  },
  
  isStrongPassword: (password: string): boolean => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    
    return hasLower && hasUpper && hasNumber && hasSpecial && hasMinLength;
  }
};