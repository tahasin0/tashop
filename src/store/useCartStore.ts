import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

/**
 * Zustand Global Cart Store
 * Persists the customer shopping cart items directly inside localStorage.
 * Handles dynamic calculation of total price (taking discount/flash sale pricing into account).
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);

        if (existingItemIndex > -1) {
          // If item already exists, validate stock limits before increasing quantity
          const updatedCart = [...cart];
          const newQuantity = updatedCart[existingItemIndex].quantity + quantity;
          
          if (newQuantity <= product.stock) {
            updatedCart[existingItemIndex].quantity = newQuantity;
            set({ cart: updatedCart });
          }
        } else {
          // If item is new, add it to the cart
          if (quantity <= product.stock) {
            set({ cart: [...cart, { product, quantity }] });
          }
        }
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.product.id === productId) {
            // Guarantee quantity stays within 1 and the maximum available stock
            const verifiedQuantity = Math.max(1, Math.min(quantity, item.product.stock));
            return { ...item, quantity: verifiedQuantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
          const product = item.product;
          // Determine active operational price
          const activePrice = product.isFlashSale && product.flashSalePrice 
            ? product.flashSalePrice 
            : (product.discountPrice || product.price);
          
          return total + activePrice * item.quantity;
        }, 0);
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'tashop-cart-storage', // Key name in LocalStorage
    }
  )
);
