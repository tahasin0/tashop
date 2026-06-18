import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// --- LAZY LOADED PAGES FOR OPTIMAL PERFORMANCE ---
// Auth Pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));

// Public & Customer Pages
const Home = lazy(() => import('../pages/home/Home'));
const ProductDetails = lazy(() => import('../pages/products/ProductDetails'));
const ProductListing = lazy(() => import('../pages/products/ProductListing'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const Checkout = lazy(() => import('../pages/checkout/Checkout'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const OrderHistory = lazy(() => import('../pages/orders/OrderHistory'));
const OrderTracking = lazy(() => import('../pages/orders/OrderTracking'));

// Legal Pages
const PrivacyPolicy = lazy(() => import('../pages/legal/PrivacyPolicy'));
const TermsConditions = lazy(() => import('../pages/legal/TermsConditions'));
const RefundPolicy = lazy(() => import('../pages/legal/RefundPolicy'));

// Admin Dashboard Pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const ManageProducts = lazy(() => import('../pages/admin/ManageProducts'));
const ManageCategories = lazy(() => import('../pages/admin/ManageCategories'));
const ManageOrders = lazy(() => import('../pages/admin/ManageOrders'));
const ManageCoupons = lazy(() => import('../pages/admin/ManageCoupons'));
const ManageBanners = lazy(() => import('../pages/admin/ManageBanners'));
const LegalSettings = lazy(() => import('../pages/admin/LegalSettings'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-white dark:bg-darkBg">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Legal Static/Dynamic Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* --- CUSTOMER PROTECTED ROUTES --- */}
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/order-tracking/:id" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />

        {/* --- ADMIN ONLY PROTECTED ROUTES --- */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><ManageProducts /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><ManageCategories /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />
        <Route path="/admin/coupons" element={<AdminRoute><ManageCoupons /></AdminRoute>} />
        <Route path="/admin/banners" element={<AdminRoute><ManageBanners /></AdminRoute>} />
        <Route path="/admin/legal" element={<AdminRoute><LegalSettings /></AdminRoute>} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

// Quick Helper to fix Navigate type missing import
import { Navigate } from 'react-router-dom';

export default AppRoutes;
