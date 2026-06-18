import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  // Fallback counts for UI badge indicator (will sync with Zustand stores)
  const cartCount = 0;

  // Active link styling helper
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-0.5 w-full h-full text-xs font-medium transition-colors duration-200 ${
      isActive
        ? 'text-primary dark:text-white'
        : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
    }`;

  // Hide bottom navigation if user is in admin dashboard area
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-slate-100 bg-white/90 backdrop-blur-md pb-safe dark:border-slate-800 dark:bg-darkBg-paper/90 lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="grid h-full grid-cols-5 items-center justify-items-center px-2">
        
        {/* Home Link */}
        <NavLink to="/" className={navLinkClass}>
          <Home className="h-5 w-5 btn-touch-active" />
          <span>হোম</span>
        </NavLink>

        {/* Categories / Products Listing Link */}
        <NavLink to="/products" className={navLinkClass}>
          <Grid className="h-5 w-5 btn-touch-active" />
          <span>শপ</span>
        </NavLink>

        {/* Floating Cart Link with Badge Counter */}
        <NavLink to="/cart" className={`${navLinkClass({ isActive: location.pathname === '/cart' })} relative`}>
          <div className="relative p-1">
            <ShoppingCart className="h-5 w-5 btn-touch-active" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[9px] font-bold text-white animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span>কার্ট</span>
        </NavLink>

        {/* Wishlist Redirect within Profile Area */}
        <NavLink to="/profile?tab=wishlist" className={navLinkClass}>
          <Heart className="h-5 w-5 btn-touch-active" />
          <span>ইচ্ছা তালিকা</span>
        </NavLink>

        {/* Profile / Account Dashboard Link */}
        <NavLink to="/profile" className={navLinkClass}>
          <User className="h-5 w-5 btn-touch-active" />
          <span>প্রোফাইল</span>
        </NavLink>

      </div>
    </nav>
  );
};

export default MobileNavigation;
