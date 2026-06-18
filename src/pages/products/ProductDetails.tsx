import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Mock Single Product Fetch Snapshot (will sync via Firestore dynamic query in later phases)
  const product: Product = {
    id: 'prod-1',
    title: 'T500 Ultra Smart Watch with Bluetooth Calling & Premium Fitness Tracker',
    slug: 't500-ultra-smart-watch',
    description: 'এটি একটি প্রিমিয়াম কোয়ালিটির আল্ট্রা স্মার্টওয়াচ, যাতে রয়েছে ব্লুটুথ কলিং সিস্টেম, হার্ট রেট মনিটর, স্লিপ ট্র্যাকিং এবং আইপি৬৭ ওয়াটারপ্রুফ প্রোটেকশন। মেটাল বডি এবং প্রিমিয়াম সিলিকন স্ট্র্যাপের সমন্বয়ে এটি তৈরি করা হয়েছে যা দীর্ঘস্থায়ী এবং আরামদায়ক ব্যবহারের নিশ্চয়তা দেয়। স্পোর্টস মোড এবং ২৪ ঘন্টা হেলথ ট্র্যাকিং ফিচার আপনার দৈনিক লাইফস্টাইলকে করবে আরও স্মার্ট।',
    price: 2500,
    discountPrice: 1850,
    images: [
      { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop', id: 'img-1' },
      { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop', id: 'img-2' }
    ],
    category: 'gadgets-electronics',
    stock: 15,
    isFeatured: true,
    isFlashSale: true,
    flashSalePrice: 1650,
    rating: 4.8,
    reviewCount: 42,
    keywords: ['smartwatch', 'calling watch'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const displayPrice = product.isFlashSale && product.flashSalePrice ? product.flashSalePrice : (product.discountPrice || product.price);
  const originalPrice = product.isFlashSale && product.flashSalePrice ? product.price : (product.discountPrice ? product.price : null);

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc' && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else if (type === 'dec' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
    // Will be integrated with useCartStore in later phase
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>{product.title} | TA Shop Premium</title>
        <meta name="description" content={product.description.substring(0, 150)} />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-4 sm:p-8 shadow-premium dark:bg-darkBg-paper grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* --- LEFT: GALLERY ELEMENT --- */}
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <img
                src={product.images?.[activeImageIndex]?.url}
                alt={product.title}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {product.images?.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 transition-all ${
                    idx === activeImageIndex ? 'border-primary' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img.url} alt="thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: PRODUCT META INFO --- */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl leading-snug">
                {product.title}
              </h1>

              {/* Rating Summary */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center text-warning">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">|</span>
                <span className="text-xs font-semibold text-primary">
                  {product.reviewCount} টি কাস্টমার রিভিউ
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">|</span>
                <span className={`text-xs font-bold ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
                  {product.stock > 0 ? `স্টক আছে (${product.stock}টি)` : 'আউট অফ স্টক'}
                </span>
              </div>

              {/* Price Tag Box */}
              <div className="mt-4 flex items-baseline gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/50">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ৳{displayPrice.toLocaleString('bn-BD')}
                </span>
                {originalPrice && (
                  <span className="text-sm font-medium text-slate-400 line-through dark:text-slate-500">
                    ৳{originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
                {product.isFlashSale && (
                  <span className="ml-auto rounded-md bg-danger px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white animate-pulse">
                    Flash Sale Price
                  </span>
                )}
              </div>

              {/* Description Brief */}
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">প্রোডাক্ট বিবরণী</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Counter */}
              {product.stock > 0 && (
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">পরিমাণ:</span>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
                    <button
                      onClick={() => handleQuantityChange('dec')}
                      className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 btn-touch-active"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-slate-800 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('inc')}
                      className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 btn-touch-active"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons & Policy Box */}
            <div className="mt-8 space-y-6">
              {product.stock > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white py-3.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5 dark:bg-transparent dark:text-white dark:border-slate-700 btn-touch-active"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    কার্টে যুক্ত করুন
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark btn-touch-active"
                  >
                    এখনই কিনুন
                  </button>
                </div>
              ) : (
                <button disabled className="w-full rounded-xl bg-slate-200 py-3.5 text-sm font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed">
                  পণ্যটি স্টক আউট রয়েছে
                </button>
              )}

              {/* Service Badges */}
              <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span>সারা বাংলাদেশে ফাস্ট ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-primary shrink-0" />
                  <span>৭ দিনের সহজ রিটার্ন পলিসি</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>১০০% অথেন্টিক প্রিমিয়াম কোয়ালিটি</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
