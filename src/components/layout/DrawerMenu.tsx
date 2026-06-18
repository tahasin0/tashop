import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, ChevronRight, Home, ShoppingBag, Info, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  // Hardcoded category slugs for presentation (will dynamically sync in Phase 5)
  const categories = [
    { name: 'গ্যাজেট ও ইলেকট্রনিক্স', slug: 'gadgets-electronics' },
    { name: 'ফ্যাশন ও লাইফস্টাইল', slug: 'fashion-lifestyle' },
    { name: 'হোম ও অ্যাপ্লায়েন্স', slug: 'home-appliances' },
    { name: 'গ্রোসারি ও ডেইলি নিডস', slug: 'grocery-daily-needs' },
  ];

  const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
      isActive
        ? 'bg-primary text-white'
        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-50 w-full max-w-xs bg-white pt-safe shadow-premium transition-transform duration-300 ease-in-out dark:bg-darkBg-paper lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4 dark:border-slate-800">
          <span className="text-lg font-bold text-primary dark:text-white">
            TA<span className="text-slate-900 dark:text-primary">SHOP</span> Menu
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 btn-touch-active"
            aria-label="Close Menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body Links */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4 no-scrollbar">
          <div className="space-y-1">
            <NavLink to="/" onClick={onClose} className={activeLinkClass}>
              <Home className="h-5 w-5" />
              <span>হোম পেজ</span>
            </NavLink>
            <NavLink to="/products" onClick={onClose} className={activeLinkClass}>
              <ShoppingBag className="h-5 w-5" />
              <span>সব প্রোডাক্ট</span>
            </NavLink>
          </div>

          {/* Categories Section */}
          <div className="mt-6">
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2 mb-2">
              <Layers className="h-3.5 w-3.5" /> ক্যাটাগরি সমূহ
            </h3>
            <div className="space-y-0.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products?category=${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="h-4 w-4 opacity-70" />
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Pages Quick Section */}
          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
            <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2 mb-2">
              <Info className="h-3.5 w-3.5" /> পলিসি ও শর্তাবলী
            </h3>
            <div className="space-y-1">
              <NavLink to="/privacy-policy" onClick={onClose} className={activeLinkClass}>
                <ShieldCheck className="h-4 w-4" />
                <span>প্রাইভেসি পলিসি</span>
              </NavLink>
              <NavLink to="/terms-conditions" onClick={onClose} className={activeLinkClass}>
                <Info className="h-4 w-4" />
                <span>টার্মস এন্ড কন্ডিশনস</span>
              </NavLink>
              <NavLink to="/refund-policy" onClick={onClose} className={activeLinkClass}>
                <RefreshCw className="h-4 w-4" />
                <span>রিফান্ড পলিসি</span>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DrawerMenu;
