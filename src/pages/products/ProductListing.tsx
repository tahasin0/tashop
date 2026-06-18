import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, Grid, List, X, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import ProductCard from '../../components/product/ProductCard';
import { Product } from '../../types';

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // URL parameters sync
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  // Active filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<number>(10000);

  // Sync state with URL if it changes externally
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Static Categories Mock for Filter Sidebar
  const filterCategories = [
    { name: 'সব পণ্য', slug: '' },
    { name: 'গ্যাজেট ও ইলেকট্রনিক্স', slug: 'gadgets-electronics' },
    { name: 'ফ্যাশন ও লাইফস্টাইল', slug: 'fashion-lifestyle' },
    { name: 'হোম ও অ্যাপ্লায়েন্স', slug: 'home-appliances' },
    { name: 'গ্রোসারি ও DAILY NEEDS', slug: 'grocery-daily-needs' },
  ];

  // Mock Products list for catalog lookup (will bind with Firestore query snapshots)
  const allProducts: Product[] = [
    {
      id: 'prod-1',
      title: 'T500 Ultra Smart Watch with Bluetooth Calling & Premium Fitness Tracker',
      slug: 't500-ultra-smart-watch',
      description: 'High-quality premium smartwatch.',
      price: 2500,
      discountPrice: 1850,
      images: [{ url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400&auto=format&fit=crop', id: 'img-1' }],
      category: 'gadgets-electronics',
      stock: 15,
      isFeatured: true,
      isFlashSale: true,
      flashSalePrice: 1650,
      rating: 4.8,
      reviewCount: 42,
      keywords: ['smartwatch'],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01'
    },
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
      createdAt: '2026-02-01',
      updatedAt: '2026-02-01'
    }
  ];

  // Live client-side processing for filters & sorting
  const filteredProducts = allProducts
    .filter((product) => {
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchSearch = searchParam ? product.title.toLowerCase().includes(searchParam.toLowerCase()) : true;
      const matchPrice = (product.discountPrice || product.price) <= priceRange;
      return matchCategory && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      const pA = a.discountPrice || a.price;
      const pB = b.discountPrice || b.price;
      if (sortBy === 'price-low') return pA - pB;
      if (sortBy === 'price-high') return pB - pA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default
    });

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200">
      <Helmet>
        <title>পণ্য তালিকা | TA Shop Premium Catalog</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          
          {/* --- DESKTOP SIDEBAR FILTER --- */}
          <aside className="hidden w-64 shrink-0 lg:block space-y-6">
            <div className="rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">ক্যাটাগরি</h3>
              <div className="space-y-1">
                {filterCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-primary text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">সর্বোচ্চ বাজেট</h3>
              <div className="text-sm font-bold text-primary mb-2">৳{priceRange.toLocaleString('bn-BD')}</div>
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
              />
            </div>
          </aside>

          {/* --- MAIN CATALOG SHELF --- */}
          <section className="flex-1">
            {/* Header Toolbar controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-premium dark:bg-darkBg-paper mb-6">
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">সার্চ রেজাল্ট</p>
                <h1 className="text-base font-bold text-slate-800 dark:text-white">
                  {searchParam ? `"${searchParam}" এর জন্য ` : ''}{filteredProducts.length}টি পণ্য পাওয়া গেছে
                </h1>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 btn-touch-active"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  ফিল্টার
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <option value="default">ডিফল্ট সর্টিং</option>
                  <option value="price-low">মূল্য: কম থেকে বেশি</option>
                  <option value="price-high">মূল্য: বেশি থেকে কম</option>
                  <option value="rating">রেটিং: উচ্চ থেকে নিম্ন</option>
                </select>
              </div>
            </div>

            {/* Products Grid output */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-premium text-center dark:bg-darkBg-paper">
                <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">আপনার ফিল্টার বা সার্চ ম্যাচিং কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* --- MOBILE FILTER BACKDROP OVERLAY & DRAWERS --- */}
      {isMobileFilterOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-premium-lg dark:bg-darkBg-paper lg:hidden animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
              <h2 className="text-base font-bold dark:text-white">ফিল্টার সেটিংস</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="space-y-6 pb-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ক্যাটাগরি</h3>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => { handleCategorySelect(cat.slug); setIsMobileFilterOpen(false); }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                        selectedCategory === cat.slug
                          ? 'bg-primary border-primary text-white'
                          : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">সর্বোচ্চ বাজেট (৳{priceRange})</h3>
                <input
                  type="range"
                  min="100"
                  max="20000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;
