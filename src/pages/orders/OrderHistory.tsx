import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Package, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface OrderItemSummary {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  itemCount: number;
}

const OrderHistory: React.FC = () => {
  // Mock Customer Orders Snapshot (will sync dynamically with Firestore 'orders' collection query where uid == user.uid)
  const orders: OrderItemSummary[] = [
    {
      id: 'ord-10254',
      orderNumber: 'TA-2026-10254',
      createdAt: '2026-06-15',
      totalAmount: 1710,
      status: 'processing',
      paymentStatus: 'pending',
      itemCount: 1,
    },
    {
      id: 'ord-09845',
      orderNumber: 'TA-2026-09845',
      createdAt: '2026-05-10',
      totalAmount: 3200,
      status: 'delivered',
      paymentStatus: 'paid',
      itemCount: 2,
    },
  ];

  // Helper mapping for responsive status badges design
  const getStatusBadge = (status: OrderItemSummary['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
            <Clock className="h-3.5 w-3.5" /> পেন্ডিং
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
            <Package className="h-3.5 w-3.5" /> প্রসেসিং হচ্ছে
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400">
            <Package className="h-3.5 w-3.5" /> অন দ্য ওয়ে
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> ডেলিভারড
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/30 dark:text-rose-400">
            <AlertTriangle className="h-3.5 w-3.5" /> বাতিল করা হয়েছে
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>আমার অর্ডার হিস্টোরি | TA Shop</title>
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">আমার অর্ডারসমূহ</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">আপনার বর্তমান ও পূর্ববর্তী সমস্ত অর্ডারের তালিকা ও ট্র্যাকিং স্ট্যাটাস</p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-premium dark:bg-darkBg-paper">
            <div className="rounded-full bg-slate-50 p-4 dark:bg-slate-800">
              <Package className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-800 dark:text-white">এখনো কোনো অর্ডার করা হয়নি!</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-xs">আপনার কোনো কেনাকাটার রেকর্ড পাওয়া যায়নি। এখনই শপ থেকে আপনার পছন্দের পণ্য অর্ডার করুন।</p>
            <Link to="/products" className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md">
              প্রোডাক্টস ব্রাউজ করুন
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50"
              >
                {/* Order Information Block */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      #{order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>তারিখ: {new Date(order.createdAt).toLocaleDateString('bn-BD')}</span>
                    <span>পরিমাণ: {order.itemCount}টি আইটেম</span>
                    <span>পেমেন্ট: {order.paymentStatus === 'paid' ? 'পরিশোধিত' : 'ক্যাশ অন ডেলিভারি'}</span>
                  </div>
                </div>

                {/* Pricing & Tracking Action Redirect */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-slate-50 pt-3 sm:border-none sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="block text-xs text-slate-400">সর্বমোট বিল</span>
                    <span className="text-base font-extrabold text-primary dark:text-white">
                      ৳{order.totalAmount.toLocaleString('bn-BD')}
                    </span>
                  </div>

                  <Link
                    to={`/order-tracking/${order.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-dark btn-touch-active shadow-sm"
                  >
                    <span>ট্র্যাক করুন</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
