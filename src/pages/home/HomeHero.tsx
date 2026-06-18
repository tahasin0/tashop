import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkTo: string;
  buttonText: string;
  badge?: string;
}

const HomeHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback premium banners data (will sync with Firestore ManageBanners in later phases)
  const banners: HeroBanner[] = [
    {
      id: 'banner-1',
      title: 'প্রিমিয়াম গ্যাজেট কালেকশন',
      subtitle: 'স্মার্ট লাইফস্টাইলের জন্য সেরা ও লেটেস্ট সব স্মার্টওয়াচ এবং ইয়ারবাডসে আকর্ষণীয় ডিসকাউন্ট!',
      imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop',
      linkTo: '/products?category=gadgets-electronics',
      buttonText: 'এখনই কিনুন',
      badge: 'সীমিত সময়ের অফার',
    },
    {
      id: 'banner-2',
      title: 'ট্রেন্ডি ফ্যাশন ও লাইফস্টাইল',
      subtitle: 'নিজেকে সাজিয়ে তুলুন একদম নতুন ডিজাইনের প্রিমিয়াম ফেব্রিকস এবং এক্সক্লুসিভ কালেকশন দিয়ে।',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
      linkTo: '/products?category=fashion-lifestyle',
      buttonText: 'কালেকশন দেখুন',
      badge: 'নতুন আগমন',
    },
  ];

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 : 0 : prev + 1));
  };

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-900 sm:rounded-2xl shadow-premium">
      {/* Slider Wrapper */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className="w-full shrink-0 relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] flex items-center min-h-[260px] sm:min-h-[340px]"
          >
            {/* Background Image with Dark Overlay Gradient */}
            <div className="absolute inset-0 z-0">
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent dark:from-slate-950/90 dark:via-slate-950/60" />
            </div>

            {/* Banner Text Content */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-16 text-white max-w-xl md:max-w-2xl">
              {banner.badge && (
                <span className="inline-block rounded-md bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white mb-2 sm:mb-3">
                  {banner.badge}
                </span>
              )}
              <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {banner.title}
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 sm:line-clamp-none max-w-md sm:max-w-lg">
                {banner.subtitle}
              </p>
              <div className="mt-4 sm:mt-6">
                <Link
                  to={banner.linkTo}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-primary hover:text-white btn-touch-active"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrow Buttons (Hidden on Small Mobile Touch Screens) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-colors hover:bg-white/40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-colors hover:bg-white/40"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Bullet Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeHero;
