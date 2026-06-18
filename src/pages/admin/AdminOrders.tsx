import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Sliders, Eye, CheckCircle, Truck, XCircle, Clock, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminOrderSummary {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  district: string;
}

const AdminOrders: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock Master Orders Pipeline Snapshot (will bind with active realtime collection snapshot listeners in later integration phases)
  const [orders, setOrders] = useState<AdminOrderSummary[]>([
    {
      id: 'ord-10254',
      orderNumber: 'TA-2026-10254',
      customerName: 'মোহাম্মদ আলী',
      phone: '01712345678',
      totalAmount: 1710,
      status: 'processing',
      createdAt: '2026-06-15',
      district: 'dhaka',
    },
    {
      id: 'ord-09845',
      orderNumber: 'TA-2026-09845',
      customerName: 'সাদিয়া রহমান',
      phone: '01987654321',
      totalAmount: 3200,
      status: 'delivered',
      createdAt: '2026-05-10',
      district: 'outside',
    },
    {
      id: 'ord-10312',
      orderNumber: 'TA-2026-10312',
      customerName: 'কামরুল হাসান',
      phone: '01555444333',
      totalAmount: 950,
      status: 'pending',
      createdAt: '2026-06-18',
      district: 'dhaka',
    }
  ]);

  const handleUpdateStatus = (orderId: string, newStatus: AdminOrderSummary['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    toast.success('অর্ডারের স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।');
  };

  // Filter & Search Logic Execution Block
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' ? true : order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>অর্ডার ম্যানেজমেন্ট প্যানেল | এডমিন কন্ট্রোল</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation back anchor */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-6 flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> ড্যাশবোর্ডে ফিরে যান
        </button>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl flex items-center gap-2">
            <Sliders className="h-6 w-6 text-primary" /> কাস্টমার অর্ডার ম্যানেজমেন্ট
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">আগত সমস্ত অর্ডারের বিবরণী দেখুন এবং শিপিং লাইফসাইকেল আপডেট করুন</p>
        </div>

        {/* --- CONTROL BLOCK: SEARCH & FILTERS --- */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-2xl bg-white p-4 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="অর্ডার আইডি, নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">সব অর্ডার স্ট্যাটাস</option>
              <option value="pending">পেন্ডিং (Pending)</option>
              <option value="processing">প্রসেসিং (Processing)</option>
              <option value="shipped">শিপড (Shipped)</option>
              <option value="delivered">ডেলিভারড (Delivered)</option>
              <option value="cancelled">বাতিলকৃত (Cancelled)</option>
            </select>
          </div>
        </div>

        {/* --- MAIN PIPELINE PIPELINE DATA DISPLAY TABLE --- */}
        <div className="rounded-2xl bg-white p-4 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50 overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 dark:border-slate-800 font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">অর্ডার আইডি</th>
                  <th>গ্রাহকের বিবরণী</th>
                  <th>তারিখ ও লোকেশন</th>
                  <th>মোট বিল</th>
                  <th>বর্তমান স্ট্যাটাস</th>
                  <th className="text-right px-2">অ্যাকশন কন্ট্রোল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400">কোনো অর্ডারের রেকর্ড খুঁজে পাওয়া যায়নি।</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      {/* Order Number column */}
                      <td className="py-4 px-2 font-bold text-slate-900 dark:text-white">
                        #{order.orderNumber}
                      </td>
                      
                      {/* Customer context */}
                      <td>
                        <div className="space-y-0.5">
                          <span className="block font-bold text-slate-800 dark:text-slate-200">{order.customerName}</span>
                          <span className="block text-slate-400 font-mono text-[11px]">{order.phone}</span>
                        </div>
                      </td>

                      {/* Timeline / District matrix */}
                      <td>
                        <div className="space-y-0.5">
                          <span>{new Date(order.createdAt).toLocaleDateString('bn-BD')}</span>
                          <span className="block text-[10px] text-slate-400">
                            {order.district === 'dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}
                          </span>
                        </div>
                      </td>

                      {/* Pricing sum display */}
                      <td className="font-extrabold text-slate-900 dark:text-white text-sm">
                        ৳{order.totalAmount.toLocaleString('bn-BD')}
                      </td>

                      {/* Reactive State indicator bubble */}
                      <td>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40' :
                          order.status === 'processing' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40' :
                          order.status === 'shipped' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40' :
                          order.status === 'cancelled' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40' :
                          'bg-amber-50 text-amber-600 dark:bg-amber-950/40'
                        }`}>
                          {order.status === 'pending' && 'পেন্ডিং'}
                          {order.status === 'processing' && 'প্রসেসিং'}
                          {order.status === 'shipped' && 'অন দ্য ওয়ে'}
                          {order.status === 'delivered' && 'ডেলিভারড'}
                          {order.status === 'cancelled' && 'বাতিল করা হয়েছে'}
                        </span>
                      </td>

                      {/* Action trigger selections */}
                      <td className="text-right px-2">
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status === 'pending' && (
                            <button onClick={() => handleUpdateStatus(order.id, 'processing')} className="rounded-lg p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400" title="অর্ডার কনফার্ম করুন">
                              <Clock className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {order.status === 'processing' && (
                            <button onClick={() => handleUpdateStatus(order.id, 'shipped')} className="rounded-lg p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400" title="কুরিয়ারে পাঠান">
                              <Truck className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <button onClick={() => handleUpdateStatus(order.id, 'delivered')} className="rounded-lg p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400" title="ডেলিভারি সম্পন্ন">
                              <CheckCircle className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <button onClick={() => handleUpdateStatus(order.id, 'cancelled')} className="rounded-lg p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400" title="অর্ডার বাতিল">
                              <XCircle className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOrders;
