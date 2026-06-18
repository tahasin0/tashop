import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  count?: number;
}

const HomeCategories: React.FC = () => {
  // Static Premium Categories mapping (will sync dynamically with Firestore in Phase 5)
  const categories: CategoryItem[] = [
    {
      id: 'cat-1',
      name: 'গ্যাজেট ও ইলেকট্রনিক্স',
      slug: 'gadgets-electronics',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop',
      count: 24,
    },
    {
      id: 'cat-2',
      name: 'ফ্যাশন ও লাইফস্টাইল',
      slug: 'fashion-lifestyle',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b830c6038?q=80&w=400&auto=format&fit=crop',
      count: 18,
    },
    {
      id: 'cat-3',
      name: 'হোম ও অ্যাপ্লায়েন্স',
      slug: 'home-appliances',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop',
      count: 12,
    },
    {
      id: 'cat-4',
      name: 'গ্রোসারি ও ডেইলি নিডস',
      slug: 'grocery-daily-needs',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop',
      count: 35,
    },
  ];

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            টপ ক্যাটাগরি সমূহ
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            আপনার পছন্দের ক্যাটাগরি সিলেক্ট করে পণ্য ব্রাউজ করুন
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

      {/* Grid List Layout */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-white p-3 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg dark:bg-slate-800 flex flex-col items-center text-center"
          >
            {/* Round/Square Image Wrap */}
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900">
              <img
                src={category.imageUrl}
                alt={category.name}
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Meta Content */}
            <div className="mt-3">
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-primary dark:text-slate-200 dark:group-hover:text-primary transition-colors line-clamp-1">
                {category.name}
              </h3>
              {category.count !== undefined && (
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 block">
                  {category.count}টি পণ্য
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
