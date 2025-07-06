import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { PRODUCT_CATEGORIES, SKIN_TYPES, SKIN_CONCERNS } from '../config/constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  // Mock products data
  const mockProducts = [
    {
      id: '1',
      name: 'Hydrating Face Serum',
      brand: 'Lakme',
      price: 899,
      originalPrice: 1299,
      rating: 4.5,
      reviewCount: 234,
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      category: 'skincare',
      skinType: ['dry', 'normal'],
      concerns: ['dullness', 'fine-lines'],
      isNew: true,
      isBestSeller: false
    },
    {
      id: '2',
      name: 'Matte Lipstick - Red Romance',
      brand: 'Maybelline',
      price: 549,
      originalPrice: 699,
      rating: 4.7,
      reviewCount: 892,
      image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      category: 'makeup',
      skinType: ['all'],
      concerns: [],
      isNew: false,
      isBestSeller: true
    },
    {
      id: '3',
      name: 'Nourishing Hair Oil',
      brand: 'Himalaya',
      price: 299,
      originalPrice: 399,
      rating: 4.3,
      reviewCount: 156,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      category: 'haircare',
      skinType: ['all'],
      concerns: [],
      isNew: false,
      isBestSeller: false
    },
    {
      id: '4',
      name: 'Vitamin C Face Wash',
      brand: 'Plum',
      price: 425,
      originalPrice: 499,
      rating: 4.4,
      reviewCount: 567,
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      category: 'skincare',
      skinType: ['oily', 'combination'],
      concerns: ['acne', 'dark-spots'],
      isNew: true,
      isBestSeller: false
    },
    {
      id: '5',
      name: 'Floral Perfume',
      brand: 'Engage',
      price: 699,
      originalPrice: 899,
      rating: 4.2,
      reviewCount: 89,
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      category: 'fragrance',
      skinType: ['all'],
      concerns: [],
      isNew: false,
      isBestSeller: false
    },
    {
      id: '6',
      name: 'Foundation - Medium',
      brand: 'Nykaa',
      price: 799,
      originalPrice: 999,
      rating: 4.6,
      reviewCount: 345,
      image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      category: 'makeup',
      skinType: ['all'],
      concerns: [],
      isNew: false,
      isBestSeller: true
    }
  ];

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    brand: searchParams.getAll('brand') || [],
    skinType: searchParams.getAll('skinType') || [],
    concerns: searchParams.getAll('concerns') || [],
    priceRange: {
      min: parseInt(searchParams.get('minPrice') || '0'),
      max: parseInt(searchParams.get('maxPrice') || '5000')
    },
    sortBy: searchParams.get('sortBy') || 'popular'
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateFilters = (newFilters: any) => {
    setFilters(newFilters);
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          params.append(`${key}${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`, subValue.toString());
        });
      } else if (value) {
        params.append(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
    if (filters.skinType.length > 0 && !filters.skinType.some(type => product.skinType.includes(type))) return false;
    if (filters.concerns.length > 0 && !filters.concerns.some(concern => product.concerns.includes(concern))) return false;
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return a.isNew ? -1 : 1;
      default:
        return b.isBestSeller ? -1 : 1;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {filters.category ? 
                  PRODUCT_CATEGORIES.find(cat => cat.slug === filters.category)?.name || 'Products' : 
                  'All Products'
                }
              </h1>
              <p className="text-gray-600 mt-1">
                {sortedProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ ...filters, sortBy: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-600'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-600'}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="md:hidden"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:block ${isFiltersOpen ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {PRODUCT_CATEGORIES.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.slug}
                        checked={filters.category === category.slug}
                        onChange={(e) => updateFilters({ ...filters, category: e.target.value })}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => updateFilters({
                        ...filters,
                        priceRange: { ...filters.priceRange, min: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => updateFilters({
                        ...filters,
                        priceRange: { ...filters.priceRange, max: parseInt(e.target.value) || 5000 }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Skin Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Skin Type</h3>
                <div className="space-y-2">
                  {SKIN_TYPES.map(type => (
                    <label key={type.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={type.id}
                        checked={filters.skinType.includes(type.id)}
                        onChange={(e) => {
                          const newSkinType = e.target.checked
                            ? [...filters.skinType, type.id]
                            : filters.skinType.filter(t => t !== type.id);
                          updateFilters({ ...filters, skinType: newSkinType });
                        }}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skin Concerns Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Skin Concerns</h3>
                <div className="space-y-2">
                  {SKIN_CONCERNS.map(concern => (
                    <label key={concern.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={concern.id}
                        checked={filters.concerns.includes(concern.id)}
                        onChange={(e) => {
                          const newConcerns = e.target.checked
                            ? [...filters.concerns, concern.id]
                            : filters.concerns.filter(c => c !== concern.id);
                          updateFilters({ ...filters, concerns: newConcerns });
                        }}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{concern.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setFilters({
                    category: '',
                    search: '',
                    brand: [],
                    skinType: [],
                    concerns: [],
                    priceRange: { min: 0, max: 5000 },
                    sortBy: 'popular'
                  });
                  setSearchParams(new URLSearchParams());
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      category: '',
                      search: '',
                      brand: [],
                      skinType: [],
                      concerns: [],
                      priceRange: { min: 0, max: 5000 },
                      sortBy: 'popular'
                    });
                    setSearchParams(new URLSearchParams());
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 space-y-1">
                        {product.isNew && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Best Seller
                          </span>
                        )}
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {calculateDiscount(product.originalPrice, product.price)}% OFF
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          {product.rating} ({product.reviewCount} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          Add to Cart
                        </Button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;