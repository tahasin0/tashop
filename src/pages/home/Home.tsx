import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import HomeHero from './HomeHero';
import HomeCategories from './HomeCategories';
import ProductCard from '../../components/product/ProductCard';
import { Product } from '../../types';

const Home: React.FC = () => {
  // Mock premium products for home feed demonstration (will dynamically sync via Firestore service)
  const featuredProducts: Product[] = [
    {
      id: 'prod-1',
      title: 'T500 Ultra Smart Watch with Bluetooth Calling & Premium Fitness Tracker',
      slug: 't500-ultra-smart-watch',
      description: 'High-quality premium smartwatch with sleep tracker and heart rate monitor.',
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
      keywords: ['smartwatch', 'gadgets'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'prod-2',
      title: 'Premium Men Slim Fit Casual Cotton Shirt - Navy Blue',
      slug: 'premium-men-casual-shirt',
      description: '100% export quality cotton shirt for absolute comfort.',
      price: 1500,
      discountPrice: 1200,
      images: [{ url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop', id: 'img-2' }],
      category: 'fashion-lifestyle',
      stock: 30,
      isFeatured: true,
      isFlashSale: false,
      rating: 4.5,
      reviewCount: 18,
      keywords: ['shirt', 'fashion'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'prod-3',
      title: 'Anker Soundcore Life P2 Mini True Wireless Earbuds',
      slug: 'anker-soundcore-life-p2',
      description: 'Incredible sound loved by 20 million+ people with big bass.',
      price: 3800,
      images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop', id: 'img-3' }],
      category: 'gadgets-electronics',
      stock: 8,
      isFeatured: true,
      isFlashSale: false,
      rating: 0,
      reviewCount: 0,
      keywords: ['earbuds', 'anker'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const handleWishlistToggle = (productId: string) => {
    console.log('Wishlist Toggled for:', productId);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Added to Cart:', product.title);
  };

  // Filter flash sale items dynamically
  const flashSaleProducts = featuredProducts.filter(p => p.isFlashSale);

  return (
    <div className="bg-slate-50 dark:bg-darkBg transition-colors duration-200">
      {/* Dynamic SEO Setup */}
      <Helmet>
        <title>TA Shop | বাংলাদেশের প্রিমিয়াম ই-কমার্স প্ল্যাটফর্ম</title>
        <meta name="description" content="TA Shop-এ পেয়ে যান আসল ও প্রিমিয়াম কোয়ালিটির গ্যাজেটস, ইলেকট্রনিক্স এবং ফ্যাশন আইটেম সবচেয়ে দ্রুত ডেলিভারি ও সেরা অফারে।" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-8">
        
        {/* Main Hero Slider */}
        <HomeHero />

        {/* Categories Section */}
        <HomeCategories />

        {/* Flash Sale Grid (If available) */}
        {flashSaleProducts.length > 0 && (
          <section className="rounded-2xl bg-red-50 p-4 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-danger">
                <Flame className="h-5 w-5 fill-current animate-bounce" />
                <h2 className="text-lg font-extrabold sm:text-xl">ফ্ল্যাশ সেল অফার!</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {flashSaleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onWishlistToggle={handleWishlistToggle}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* Featured Products Showcase */}
        <section className="py-2">
          <div className="flex items-center justify-between mb-6 px-1">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                আমাদের ট্রেন্ডিং প্রোডাক্টস
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                গ্রাহকদের সবচেয়ে পছন্দের সেরা কোয়ালিটির পণ্যসমূহ
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1 text-sm font-bold text-primary hover:gap-1.5 transition-all dark:text-white btn-touch-active"
            >
              <span>সব দেখুন</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Product Cards Responsive Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onWishlistToggle={handleWishlistToggle}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
