import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/layout/Header';
import DrawerMenu from './components/layout/DrawerMenu';
import MobileNavigation from './components/layout/MobileNavigation';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const loading = useAuthStore((state) => state.loading);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize Firebase Auth Listener on App Mount
  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-darkBg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <HelmetProvider>
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
