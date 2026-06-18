import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Client Faced Pages
import Home from './pages/home/Home';
import ProductListing from './pages/products/ProductListing';
import ProductDetails from './pages/products/ProductDetails';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import OrderHistory from './pages/orders/OrderHistory';
import OrderTracking from './pages/orders/OrderTracking';
import Profile from './pages/profile/Profile';

// Authentication Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Control Panel Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminOrders from './pages/admin/AdminOrders';

// Route Guards (Firewall Gates)
import AdminRoute from './components/auth/AdminRoute';

// Global Authentication State Store
import { useAuthStore } from './store/useAuthStore';

const App: React.FC = () => {
  const { initializeAuth, loading } = useAuthStore();

  // Establish persistent Firebase Auth subscription channel listener upon startup
  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [initializeAuth]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-darkBg transition-colors duration-200">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 transition-colors duration-200 dark:bg-darkBg dark:text-slate-200">
          
          {/* Global Top Navigation Header */}
          <Navbar />

          {/* Core Content Route Workspace Area */}
          <main className="flex-1">
            <Routes>
              {/* --- Public Access Client Routes --- */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* --- Authentication Gateways --- */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* --- Customer Profile & Safe Checkout Zones --- */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/order-tracking/:id" element={<OrderTracking />} />

              {/* --- Protected Admin Management Firewall Zones --- */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/products/add" 
                element={
                  <AdminRoute>
                    <AdminAddProduct />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/orders" 
                element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                } 
              />

              {/* Catch-All Fallback Redirect Gateway */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footer Area */}
          <Footer />

          {/* Application Floating Notification System */}
          <Toaster 
            position="bottom-center"
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white rounded-xl shadow-premium text-xs font-semibold',
              duration: 3000,
            }}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
      <ThemeProvider>
        <Router>
          <div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-200 dark:bg-darkBg dark:text-slate-100">
            
            {/* React Hot Toast Configuration */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#334155',
                  color: '#fff',
                  borderRadius: '12px',
                },
                success: {
                  style: {
                    background: '#10B981',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                  },
                },
              }}
            />

            {/* Application Global Shell Layout */}
            <Header onMenuToggle={toggleMenu} />
            
            <DrawerMenu isOpen={isMenuOpen} onClose={closeMenu} />

            {/* Main Content Area */}
            <main className="flex-1">
              <AppRoutes />
            </main>

            <Footer />

            {/* Bottom App Bar for Mobile Devices */}
            <MobileNavigation />
            
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
