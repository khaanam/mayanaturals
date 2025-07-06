import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product, ProductVariant } from '../types';
import { MAX_CART_ITEMS, MAX_QUANTITY_PER_ITEM, TAX_RATE } from '../config/constants';

interface CartState {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (couponCode: string) => Promise<void>;
  removeCoupon: () => void;
  calculateTotals: () => void;
  syncWithServer: () => Promise<void>;
  loadCartFromStorage: () => void;
  clearError: () => void;
}

const initialCart: Cart = {
  id: '',
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: 0,
  tax: 0,
  total: 0,
  updatedAt: new Date()
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: initialCart,
      isLoading: false,
      error: null,

      addItem: (product: Product, quantity = 1, variant?: ProductVariant) => {
        const { cart } = get();
        
        // Check if cart is full
        if (cart.items.length >= MAX_CART_ITEMS) {
          set({ error: `Maximum ${MAX_CART_ITEMS} items allowed in cart` });
          return;
        }

        // Check if product is in stock
        if (!product.isInStock || product.stock < quantity) {
          set({ error: 'Product is out of stock' });
          return;
        }

        // Check if item already exists
        const existingItemIndex = cart.items.findIndex(
          item => item.product.id === product.id && 
                   item.variant?.id === variant?.id
        );

        let updatedItems = [...cart.items];

        if (existingItemIndex !== -1) {
          // Update existing item
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + quantity;
          
          if (newQuantity > MAX_QUANTITY_PER_ITEM) {
            set({ error: `Maximum ${MAX_QUANTITY_PER_ITEM} quantity per item allowed` });
            return;
          }

          if (newQuantity > product.stock) {
            set({ error: 'Not enough stock available' });
            return;
          }

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            totalPrice: (variant?.price || product.price) * newQuantity
          };
        } else {
          // Add new item
          const newItem: CartItem = {
            id: Date.now().toString(),
            product,
            variant,
            quantity,
            price: variant?.price || product.price,
            totalPrice: (variant?.price || product.price) * quantity,
            addedAt: new Date()
          };

          updatedItems.push(newItem);
        }

        const updatedCart = {
          ...cart,
          items: updatedItems,
          updatedAt: new Date()
        };

        set({ cart: updatedCart, error: null });
        get().calculateTotals();
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const { cart } = get();
        
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        if (quantity > MAX_QUANTITY_PER_ITEM) {
          set({ error: `Maximum ${MAX_QUANTITY_PER_ITEM} quantity per item allowed` });
          return;
        }

        const updatedItems = cart.items.map(item => {
          if (item.id === itemId) {
            // Check stock availability
            if (quantity > item.product.stock) {
              set({ error: 'Not enough stock available' });
              return item;
            }

            return {
              ...item,
              quantity,
              totalPrice: item.price * quantity
            };
          }
          return item;
        });

        const updatedCart = {
          ...cart,
          items: updatedItems,
          updatedAt: new Date()
        };

        set({ cart: updatedCart, error: null });
        get().calculateTotals();
      },

      removeItem: (itemId: string) => {
        const { cart } = get();
        
        const updatedItems = cart.items.filter(item => item.id !== itemId);
        
        const updatedCart = {
          ...cart,
          items: updatedItems,
          updatedAt: new Date()
        };

        set({ cart: updatedCart, error: null });
        get().calculateTotals();
      },

      clearCart: () => {
        const clearedCart = {
          ...initialCart,
          id: get().cart.id,
          updatedAt: new Date()
        };

        set({ cart: clearedCart, error: null });
      },

      applyCoupon: async (couponCode: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement coupon validation with API
          // For now, mock implementation
          const { cart } = get();
          let discount = 0;
          
          // Mock coupon logic
          if (couponCode === 'SAVE10') {
            discount = cart.subtotal * 0.1;
          } else if (couponCode === 'SAVE20') {
            discount = cart.subtotal * 0.2;
          } else {
            throw new Error('Invalid coupon code');
          }

          const updatedCart = {
            ...cart,
            couponCode,
            discount,
            updatedAt: new Date()
          };

          set({ cart: updatedCart, isLoading: false });
          get().calculateTotals();
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to apply coupon', 
            isLoading: false 
          });
        }
      },

      removeCoupon: () => {
        const { cart } = get();
        
        const updatedCart = {
          ...cart,
          couponCode: undefined,
          discount: 0,
          updatedAt: new Date()
        };

        set({ cart: updatedCart, error: null });
        get().calculateTotals();
      },

      calculateTotals: () => {
        const { cart } = get();
        
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
        const tax = (subtotal - cart.discount) * TAX_RATE;
        const total = subtotal - cart.discount + tax;

        const updatedCart = {
          ...cart,
          totalItems,
          subtotal,
          tax,
          total,
          updatedAt: new Date()
        };

        set({ cart: updatedCart });
      },

      syncWithServer: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement server sync
          // For now, just mark as synced
          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to sync cart', 
            isLoading: false 
          });
        }
      },

      loadCartFromStorage: () => {
        // This is handled by the persist middleware
        // Calculate totals after loading
        get().calculateTotals();
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ 
        cart: state.cart 
      }),
    }
  )
);

// Auto-calculate totals on store initialization
useCartStore.getState().calculateTotals();