/**
 * TA Shop - Global TypeScript Type Definitions
 * Covers Users, Products, Categories, Orders, Cart, Payments, and Coupons.
 */

// --- USER TYPES ---
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  title: string; // e.g., Home, Office
  receiverName: string;
  phoneNumber: string;
  district: string;
  city: string;
  area: string;
  fullAddress: string;
  isDefault: boolean;
}

// --- PRODUCT & CATEGORY TYPES ---
export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
}

export interface ProductImage {
  url: string;
  id: string; // Cloudinary public_id
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string; // Rich text standard string
  price: number;
  discountPrice?: number;
  images: ProductImage[];
  category: string; // Category slug or ID
  stock: number;
  isFeatured: boolean;
  isFlashSale: boolean;
  flashSalePrice?: number;
  rating: number;
  reviewCount: number;
  keywords: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// --- CART & WISHLIST TYPES ---
export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

// --- COUPON TYPES ---
export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  expiryDate: string;
  isActive: boolean;
}

// --- ORDER & PAYMENT TYPES ---
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'approved' | 'rejected';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  payableAmount: number;
  shippingAddress: Omit<Address, 'id' | 'isDefault'>;
  paymentMethod: 'bKash' | 'Nagad' | 'COD';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  transactionId?: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

// --- LEGAL PAGES TYPES ---
export interface LegalPage {
  id: 'privacy-policy' | 'terms-conditions' | 'refund-policy';
  title: string;
  content: string; // HTML Content from Rich Text Editor
  updatedAt: string;
}

// --- BANNER TYPES ---
export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkTo: string; // Route link when clicked
  isActive: boolean;
}
