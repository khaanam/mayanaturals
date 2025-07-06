import { apiService } from './api';
import { Product, ProductFilters, PaginatedResponse } from '../types';

export interface ProductSearchParams extends ProductFilters {
  page?: number;
  limit?: number;
  query?: string;
}

class ProductService {
  // Get all products with filters
  async getProducts(params: ProductSearchParams = {}): Promise<PaginatedResponse<Product>> {
    const response = await apiService.get<PaginatedResponse<Product>>('/products', {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        category: params.category,
        subcategory: params.subcategory,
        brand: params.brand?.join(','),
        priceMin: params.priceRange?.min,
        priceMax: params.priceRange?.max,
        rating: params.rating,
        skinType: params.skinType?.join(','),
        concerns: params.concerns?.join(','),
        ingredients: params.ingredients?.join(','),
        inStock: params.inStock,
        discount: params.discount,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        query: params.query
      }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch products');
  }

  // Get single product by ID
  async getProduct(id: string): Promise<Product> {
    const response = await apiService.get<Product>(`/products/${id}`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Product not found');
  }

  // Get product by slug
  async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiService.get<Product>(`/products/slug/${slug}`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Product not found');
  }

  // Search products
  async searchProducts(query: string, filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...filters, query });
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/featured', {
      params: { limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch featured products');
  }

  // Get new arrivals
  async getNewArrivals(limit: number = 10): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/new-arrivals', {
      params: { limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch new arrivals');
  }

  // Get best sellers
  async getBestSellers(limit: number = 10): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/best-sellers', {
      params: { limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch best sellers');
  }

  // Get products by category
  async getProductsByCategory(categorySlug: string, params: ProductSearchParams = {}): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...params, category: categorySlug });
  }

  // Get products by brand
  async getProductsByBrand(brandSlug: string, params: ProductSearchParams = {}): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...params, brand: [brandSlug] });
  }

  // Get related products
  async getRelatedProducts(productId: string, limit: number = 6): Promise<Product[]> {
    const response = await apiService.get<Product[]>(`/products/${productId}/related`, {
      params: { limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch related products');
  }

  // Get product recommendations
  async getRecommendations(userId?: string, limit: number = 10): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/recommendations', {
      params: { userId, limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch recommendations');
  }

  // Get product reviews
  async getProductReviews(productId: string, page: number = 1, limit: number = 10) {
    const response = await apiService.get(`/products/${productId}/reviews`, {
      params: { page, limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch reviews');
  }

  // Add product review
  async addProductReview(productId: string, reviewData: any) {
    const response = await apiService.post(`/products/${productId}/reviews`, reviewData);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to add review');
  }

  // Check product availability
  async checkAvailability(productId: string, quantity: number = 1): Promise<boolean> {
    const response = await apiService.get<{ available: boolean }>(`/products/${productId}/availability`, {
      params: { quantity }
    });

    if (response.success && response.data) {
      return response.data.available;
    }

    throw new Error(response.message || 'Failed to check availability');
  }

  // Get product variants
  async getProductVariants(productId: string) {
    const response = await apiService.get(`/products/${productId}/variants`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch variants');
  }

  // Get product ingredients
  async getProductIngredients(productId: string) {
    const response = await apiService.get(`/products/${productId}/ingredients`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch ingredients');
  }

  // Get price history
  async getPriceHistory(productId: string, days: number = 30) {
    const response = await apiService.get(`/products/${productId}/price-history`, {
      params: { days }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch price history');
  }

  // Track product view
  async trackProductView(productId: string): Promise<void> {
    try {
      await apiService.post(`/products/${productId}/track-view`);
    } catch (error) {
      console.error('Failed to track product view:', error);
    }
  }

  // Get product analytics
  async getProductAnalytics(productId: string) {
    const response = await apiService.get(`/products/${productId}/analytics`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch analytics');
  }

  // Compare products
  async compareProducts(productIds: string[]) {
    const response = await apiService.post('/products/compare', { productIds });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to compare products');
  }

  // Get product search suggestions
  async getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
    const response = await apiService.get<string[]>('/products/search-suggestions', {
      params: { query, limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch suggestions');
  }

  // Get trending products
  async getTrendingProducts(limit: number = 10): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/trending', {
      params: { limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch trending products');
  }

  // Get products on sale
  async getProductsOnSale(limit: number = 20): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/on-sale', {
      params: { limit }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch sale products');
  }

  // Get product filters
  async getProductFilters(category?: string) {
    const response = await apiService.get('/products/filters', {
      params: { category }
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch filters');
  }

  // Get product categories
  async getCategories() {
    const response = await apiService.get('/categories');

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch categories');
  }

  // Get product brands
  async getBrands() {
    const response = await apiService.get('/brands');

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to fetch brands');
  }
}

export const productService = new ProductService();
export default productService;