import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuthStore();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fallback counts for UI layout (will be connected to Zustand stores in later phases)
  const cartCount = 0;
  const wishlistCount = 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-premium dark:bg-darkBg-paper transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={onMenuToggle}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden btn-touch-active"
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-primary dark:text-white">
                TA<span className="text-slate-900 dark:text-primary">SHOP</span>
              </span>
            </Link>
          </div>

          {/* Center: Sticky Desktop Search Bar */}
          <form 
            onSubmit={handleSearch} 
            className="hidden max-w-md flex-1 items-center lg:flex relative"
          >
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-sm outline-none transition-all focus:border-primary focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary"
            />
            <button 
              type="submit" 
              className="absolute right-3 text-slate-400 hover:text-primary dark:text-slate-500"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Right: Actions & Theme Control */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 btn-touch-active"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/profile"
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 btn-touch-active"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 btn-touch-active"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile Menu Dropdown */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-1 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800 btn-touch-active"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsProfileOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white p-1 shadow-premium-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 z-50 animate-fade-in">
                        <div className="px-3 py-2 text-xs border-b border-slate-100 dark:border-slate-700">
                          <p className="font-medium text-slate-900 dark:text-white truncate">{user.displayName}</p>
                          <p className="text-slate-500 truncate">{user.email}</p>
                        </div>
                        
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            অ্যাডমিন ড্যাশবোর্ড
                          </Link>
                        )}
                        
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                          আমার প্রোফাইল
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsProfileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                          অর্ডার হিস্টোরি
                        </Link>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <LogOut className="h-4 w-4" />
                          লগআউট
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 btn-touch-active flex items-center justify-center"
                  aria-label="Login"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
