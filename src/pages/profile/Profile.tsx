import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { User, Heart, LogOut, Shield, Key, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import ProductCard from '../../components/product/ProductCard';
import { Product } from '../../types';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  // Tab control management (Sync with URL search params if active)
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') === 'wishlist' ? 'wishlist' : 'account';
  const [activeTab, setActiveTab] = useState<'account' | 'wishlist'>(initialTab);

  // Sync state if URL changes externally
  useEffect(() => {
    const tab = queryParams.get('tab');
    if (tab === 'wishlist') {
      setActiveTab('wishlist');
    } else {
      setActiveTab('account');
    }
  }, [location.search]);

  // Mock Wishlist Products Snapshot (will bind with Firestore queries in later phases)
  const wishlistProducts: Product[] = [
    {
      id: 'prod-2',
      title: 'Premium Men Slim Fit Casual Cotton Shirt - Navy Blue',
      slug: 'premium-men-casual-shirt',
      description: '100% export quality cotton shirt.',
      price: 1500,
      discountPrice: 1200,
      images: [{ url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop', id: 'img-2' }],
      category: 'fashion-lifestyle',
      stock: 30,
      isFeatured: true,
      isFlashSale: false,
      rating: 4.5,
      reviewCount: 18,
      keywords: ['shirt'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('সফলভাবে লগআউট করা হয়েছে।');
      navigate('/');
    } catch (error) {
      toast.error('লগআউট করার সময় একটি ত্রুটি ঘটেছে।');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>আমার অ্যাকাউন্ট | TA Shop Premium Dashboard</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-start">
          
          {/* --- LEFT NAVIGATION NAVIGATION SIDEBAR --- */}
          <aside className="rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50 space-y-4">
            {/* Short Bio Block */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold uppercase">
                {user?.displayName ? user.displayName.charAt(0) : <User className="h-5 w-5" />}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {user?.displayName || 'সম্মানিত গ্রাহক'}
                </h2>
                <p className="truncate text-xs text-slate-400 dark:text-slate-500">{user?.email}</p>
              </div>
            </div>

            {/* Navigation Tabs Action Controls */}
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('account'); navigate('/profile'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  activeTab === 'account'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <User className="h-4 w-4" />
                <span>আমার প্রোফাইল</span>
              </button>

              <button
                onClick={() => { setActiveTab('wishlist'); navigate('/profile?tab=wishlist'); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  activeTab === 'wishlist'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                <Heart className="h-4 w-4" />
                <span>ইচ্ছা তালিকা (উইশলিস্ট)</span>
              </button>

              <button
                onClick={() => navigate('/orders')}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>অর্ডার হিস্টোরি</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-danger hover:bg-red-50 dark:hover:bg-red-950/20 transition-all btn-touch-active"
              >
                <LogOut className="h-4 w-4" />
                <span>লগআউট করুন</span>
              </button>
            </div>
          </aside>

          {/* --- RIGHT PANEL CONTENT DISPATCHER --- */}
          <section className="lg:col-span-3">
            
            {/* CASE 1: Account Information Profile Metadata */}
            {activeTab === 'account' && (
              <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50 space-y-6">
                <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800">
                  প্রোফাইল ইনফরমেশন
                </h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl dark:bg-slate-900/50">
                    <User className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">সম্পূর্ণ নাম</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user?.displayName || 'প্রদান করা হয়নি'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl dark:bg-slate-900/50">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">ইমেইল ঠিকানা</span>
                      <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-200">{user?.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl dark:bg-slate-900/50">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">মোবাইল নম্বর</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user?.phoneNumber || 'সংযুক্ত করা হয়নি'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl dark:bg-slate-900/50">
                    <Key className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">সিকিউরিটি মেথড</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Firebase Auth Token</span>
                    </div>
                  </div>
                </div>

                {/* Account Protection Notification */}
                <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-500 dark:bg-slate-900/40">
                  <Shield className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="block font-bold text-slate-800 dark:text-white">আপনার প্রোফাইল সুরক্ষিত আছে</span>
                    <p className="leading-relaxed">আপনার অ্যাকাউন্ট এবং শিপিং ডেটা ফায়ারবেস ক্লাউড আর্কিটেকচার দ্বারা সুরক্ষিত। যেকোনো সময় তথ্য হালনাগাদ করার জন্য কাস্টমার সাপোর্টে যোগাযোগ করতে পারেন।</p>
                  </div>
                </div>
              </div>
            )}

            {/* CASE 2: Wishlist Grid Feed display */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">আমার প্রিয় পণ্যসমূহ</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">আপনার সেভ করে রাখা উইশলিস্ট প্রোডাক্ট কালেকশন</p>
                  </div>
                  <span className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:text-white">
                    মোট: {wishlistProducts.length}টি
                  </span>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-premium dark:bg-darkBg-paper">
                    <Heart className="h-8 w-8 text-slate-300" />
                    <h3 className="mt-4 text-sm font-bold text-slate-800 dark:text-white">আপনার উইশলিস্ট খালি!</h3>
                    <p className="mt-1 text-xs text-slate-500 max-w-xs">কোনো পণ্য এখনো প্রিয় তালিকায় যুক্ত করা হয়নি।</p>
                    <Link to="/products" className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md">
                      পণ্য ব্রাউজ করুন
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {wishlistProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        isWishlisted={true}
                        onWishlistToggle={(id) => toast.success('উইশলিস্ট আপডেট করা হয়েছে।')}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
