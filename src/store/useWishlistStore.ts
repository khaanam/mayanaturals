import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  loadWishlistFromStorage: () => void;
  clearError: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      addItem: (product: Product) => {
        const { items } = get();
        
        // Check if item already exists
        const existingItem = items.find(item => item.product.id === product.id);
        if (existingItem) {
          set({ error: 'Product is already in wishlist' });
          return;
        }

        const newItem: WishlistItem = {
          id: Date.now().toString(),
          product,
          addedAt: new Date()
        };

        set({ 
          items: [...items, newItem],
          error: null 
        });
        
        toast.success('Added to wishlist');
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.product.id !== productId);
        
        set({ 
          items: updatedItems,
          error: null 
        });
        
        toast.success('Removed from wishlist');
      },

      clearWishlist: () => {
        set({ 
          items: [],
          error: null 
        });
        
        toast.success('Wishlist cleared');
      },

      isInWishlist: (productId: string) => {
        const { items } = get();
        return items.some(item => item.product.id === productId);
      },

      toggleWishlist: (product: Product) => {
        const { isInWishlist, addItem, removeItem } = get();
        
        if (isInWishlist(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      loadWishlistFromStorage: () => {
        // This is handled by the persist middleware
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'wishlist-store',
      partialize: (state) => ({ 
        items: state.items 
      }),
    }
  )
);