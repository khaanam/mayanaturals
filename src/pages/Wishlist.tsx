import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  TrashIcon,
  StarIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/formatters';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    isInStock: boolean;
    slug: string;
  };
  addedAt: Date;
}

const Wishlist: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock wishlist data
  const mockWishlistItems: WishlistItem[] = [
    {
      id: '1',
      product: {
        id: '1',
        name: 'Hydrating Face Serum',
        brand: 'Lakme',
        price: 899,
        originalPrice: 1299,
        rating: 4.5,
        reviewCount: 234,
        image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        category: 'skincare',
        isInStock: true,
        slug: 'hydrating-face-serum'
      },
      addedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      product: {
        id: '2',
        name: 'Matte Lipstick - Red Romance',
        brand: 'Maybelline',
        price: 549,
        originalPrice: 699,
        rating: 4.7,
        reviewCount: 892,
        image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        category: 'makeup',
        isInStock: true,
        slug: 'matte-lipstick-red-romance'
      },
      addedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      product: {
        id: '3',
        name: 'Vitamin C Face Wash',
        brand: 'Plum',
        price: 425,
        originalPrice: 499,
        rating: 4.4,
        reviewCount: 567,
        image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        category: 'skincare',
        isInStock: false,
        slug: 'vitamin-c-face-wash'
      },
      addedAt: new Date('2024-01-05')
    },
    {
      id: '4',
      product: {
        id: '4',
        name: 'Foundation - Medium',
        brand: 'Nykaa',
        price: 799,
        originalPrice: 999,
        rating: 4.6,
        reviewCount: 345,
        image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        category: 'makeup',
        isInStock: true,
        slug: 'foundation-medium'
      },
      addedAt: new Date('2024-01-01')
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    // Simulate loading wishlist data
    setTimeout(() => {
      setWishlistItems(mockWishlistItems);
      setIsLoading(false);
    }, 1000);
  }, [isAuthenticated]);

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product: any) => {
    if (!product.isInStock) {
      toast.error('Product is out of stock');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toast.success(`Added ${product.name} to cart`);
  };

  const handleMoveToCart = (item: WishlistItem) => {
    handleAddToCart(item.product);
    handleRemoveFromWishlist(item.id);
  };

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const filteredItems = wishlistItems.filter(item => {
    if (filterCategory === 'all') return true;
    return item.product.category === filterCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.product.price - b.product.price;
      case 'price-high':
        return b.product.price - a.product.price;
      case 'rating':
        return b.product.rating - a.product.rating;
      case 'oldest':
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      default: // newest
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your wishlist</h2>
          <p className="text-gray-600 mb-8">Save your favorite products and never lose track of them</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
          
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding products you love to keep track of them</p>
            <Link to="/products">
              <Button size="lg">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Categories</option>
              <option value="skincare">Skincare</option>
              <option value="makeup">Makeup</option>
              <option value="haircare">Haircare</option>
              <option value="fragrance">Fragrance</option>
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
          </div>
        </div>

        {/* Wishlist Items */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                <Link to={`/products/${item.product.slug}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={`object-cover ${
                      viewMode === 'list' ? 'w-full h-48' : 'w-full h-48'
                    } hover:scale-105 transition-transform duration-300`}
                  />
                </Link>
                
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                </button>
                
                {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {calculateDiscount(item.product.originalPrice, item.product.price)}% OFF
                  </div>
                )}
                
                {!item.product.isInStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <p className="text-sm text-gray-600 mb-1">{item.product.brand}</p>
                <Link to={`/products/${item.product.slug}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-pink-600 transition-colors">
                    {item.product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {item.product.rating} ({item.product.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(item.product.price)}
                  </span>
                  {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(item.product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}>
                  <Button
                    onClick={() => handleMoveToCart(item)}
                    disabled={!item.product.isInStock}
                    size="sm"
                    className="flex-1 flex items-center justify-center"
                  >
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    {item.product.isInStock ? 'Move to Cart' : 'Out of Stock'}
                  </Button>
                  
                  <Button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
                
                {viewMode === 'list' && (
                  <p className="text-sm text-gray-500 mt-2">
                    Added on {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                const inStockItems = wishlistItems.filter(item => item.product.isInStock);
                inStockItems.forEach(item => handleAddToCart(item.product));
                toast.success(`Added ${inStockItems.length} items to cart`);
              }}
              className="flex-1"
            >
              Add All Available to Cart
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setWishlistItems([]);
                toast.success('Wishlist cleared');
              }}
              className="flex-1"
            >
              Clear Wishlist
            </Button>
            
            <Link to="/products" className="flex-1">
              <Button variant="outline" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;