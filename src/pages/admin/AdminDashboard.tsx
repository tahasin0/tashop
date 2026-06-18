import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowRight, 
  TrendingUp, 
  PlusCircle, 
  Sliders 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon: Icon, iconBg }) => (
  <div className="rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{value}</h3>
      </div>
      <div className={`rounded-xl p-3 text-white ${iconBg}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-1 text-xs">
      <span className={`font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
        {change}
      </span>
      <span className="text-slate-400 dark:text-slate-500">গত মাস থেকে</span>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  // Mock Statistical Aggregations (will bind with real-time snapshot listeners in later integration phases)
  const stats = [
    { title: 'মোট বিক্রয় (Revenue)', value: '৳২,৪৫,৮০০', change: '+১২.৫%', isPositive: true, icon: DollarSign, iconBg: 'bg-emerald-500' },
    { title: 'মোট অর্ডার (Orders)', value: '১২৪টি', change: '+৮.২%', isPositive: true, icon: ShoppingBag, iconBg: 'bg-blue-500' },
    { title: 'মোট কাস্টমার (Users)', value: '৮৬ জন', change: '+৫.১%', isPositive: true, icon: Users, iconBg: 'bg-purple-500' },
    { title: 'চলতি স্টক (Products)', value: '৪2 আইটেম', change: '-২টি', isPositive: false, icon: Package, iconBg: 'bg-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>এডমিন কন্ট্রোল ড্যাশবোর্ড | TA Shop</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Upper Welcoming Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">এডমিন ওভারভিউ ড্যাশবোর্ড</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">আপনার ব্যবসার রিয়েল-টাইম সেলস ডাটা, প্রোডাক্ট ইনভেন্টরি ও অর্ডার ট্র্যাকিং হাব</p>
          </div>
          
          {/* Quick Shortcuts Cluster */}
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/products/add"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-primary-dark btn-touch-active"
            >
              <PlusCircle className="h-4 w-4" />
              <span>নতুন প্রোডাক্ট যুক্ত করুন</span>
            </Link>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 btn-touch-active"
            >
              <Sliders className="h-4 w-4" />
              <span>অর্ডার ম্যানেজ করুন</span>
            </Link>
          </div>
        </div>

        {/* Statistical Counter Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Dynamic Section: Recent Active Pipelines */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Left Large Column: Recent Orders Overview */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-primary" /> সাম্প্রতিক অর্ডারসমূহ
              </h3>
              <Link to="/admin/orders" className="text-xs font-bold text-primary dark:text-white hover:underline flex items-center gap-0.5">
                <span>সব দেখুন</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Concise Mini Table Layout */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-50 text-slate-400 dark:border-slate-800 font-bold uppercase tracking-wider">
                    <th className="py-2.5">অর্ডার আইডি</th>
                    <th>গ্রাহকের নাম</th>
                    <th>টাকা</th>
                    <th>স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                  <tr>
                    <td className="py-3 font-bold text-slate-900 dark:text-white">#TA-10254</td>
                    <td>মোহাম্মদ আলী</td>
                    <td>৳১,৭১০</td>
                    <td>
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-950/40">প্রসেসিং</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-slate-900 dark:text-white">#TA-09845</td>
                    <td>সাদিয়া রহমান</td>
                    <td>৳৩,২০০</td>
                    <td>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/40">ডেলিভারড</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Small Column: Short Action Prompt Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-premium flex flex-col justify-between dark:from-slate-950 dark:to-slate-900">
            <div className="space-y-2">
              <h3 className="text-base font-extrabold">দ্রুত কুপন তৈরি করুন</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার স্টোরের বেচাকেনা বৃদ্ধি করতে গ্রাহকদের জন্য কাস্টম ডিসকাউন্ট বা ফ্ল্যাট অফার কোড জেনারেট করুন।
              </p>
            </div>
            <button 
              onClick={() => toast.success('কুপন সিস্টেমটি পরবর্তী ফেজে Firestore ক্লাউডের সাথে ইন্টিগ্রেট হবে।')} 
              className="mt-6 w-full rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-primary-dark btn-touch-active"
            >
              নতুন কুপন কোড জেনারেট করুন
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
