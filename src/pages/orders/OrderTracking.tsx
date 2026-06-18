import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Package, Truck, CheckCircle2, MapPin, Calendar } from 'lucide-react';

interface TrackingStep {
  title: string;
  description: string;
  time: string;
  isCompleted: boolean;
  isActive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock Order Operational Meta (will fetch dynamically using dynamic doc(db, 'orders', id) in later phases)
  const orderDetails = {
    orderNumber: 'TA-2026-10254',
    createdAt: '2026-06-15',
    estDelivery: '2026-06-18',
    shippingAddress: 'বাসা নং ২৪, রোড নং ৫, ধানমন্ডি, ঢাকা',
    status: 'processing', // pending, processing, shipped, delivered
  };

  // Pipeline design for Tracking Timeline
  const steps: TrackingStep[] = [
    {
      title: 'অর্ডার প্লেস করা হয়েছে',
      description: 'আমরা আপনার অর্ডারটি পেয়েছি এবং ভেরিফাই করছি।',
      time: '১৫ জুন, ২০২৬ - ১০:৩০ AM',
      isCompleted: true,
      isActive: orderDetails.status === 'pending',
      icon: Clock,
    },
    {
      title: 'প্যাকিং ও প্রসেসিং হচ্ছে',
      description: 'পণ্যটি আমাদের কোয়ালিটি কন্ট্রোল টিম চেক করে প্যাক করছে।',
      time: '১৬ জুন, ২০২৬ - ০২:১৫ PM',
      isCompleted: orderDetails.status !== 'pending',
      isActive: orderDetails.status === 'processing',
      icon: Package,
    },
    {
      title: 'কুরিয়ারে শিপড করা হয়েছে',
      description: 'আপনার পণ্যটি আমাদের লজিস্টিকস পার্টনারের কাছে হস্তান্তর করা হয়েছে।',
      time: 'চলমান...',
      isCompleted: orderDetails.status === 'shipped' || orderDetails.status === 'delivered',
      isActive: orderDetails.status === 'shipped',
      icon: Truck,
    },
    {
      title: 'সফলভাবে ডেলিভারড',
      description: 'পণ্যটি আপনার ঠিকানায় পৌঁছে দেওয়া হয়েছে।',
      time: 'অপেক্ষমাণ',
      isCompleted: orderDetails.status === 'delivered',
      isActive: orderDetails.status === 'delivered',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>অর্ডার ট্র্যাকিং | TA Shop</title>
      </Helmet>

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="mb-6 flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> অর্ডার তালিকায় ফিরুন
        </button>

        {/* --- MAIN TRACKING INVOICE BOX --- */}
        <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-premium dark:bg-darkBg-paper space-y-6">
          
          {/* Header Block */}
          <div className="border-b border-slate-100 pb-4 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400">অর্ডার নম্বর</span>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">#{orderDetails.orderNumber}</h1>
            </div>
            <div className="rounded-xl bg-primary/5 p-3 dark:bg-primary/10 flex items-center gap-2 text-xs font-semibold text-primary dark:text-white">
              <Calendar className="h-4 w-4 text-primary" />
              <span>সম্ভাব্য ডেলিভারি: {orderDetails.estDelivery}</span>
            </div>
          </div>

          {/* Delivery Location Metadata */}
          <div className="flex gap-2.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 p-4 rounded-xl dark:bg-slate-900/50">
            <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-slate-900 dark:text-white mb-0.5">ডেলিভারি ঠিকানা:</span>
              <span>{orderDetails.shippingAddress}</span>
            </div>
          </div>

          {/* --- TIMELINE COMPONENT GRAPH --- */}
          <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="relative flex gap-4 items-start group">
                  
                  {/* Outer Check Ring */}
                  <div
                    className={`absolute -left-[21px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 z-10 ${
                      step.isCompleted
                        ? 'bg-primary border-primary text-white shadow-sm'
                        : step.isActive
                        ? 'bg-white border-primary text-primary animate-pulse dark:bg-darkBg-paper'
                        : 'bg-white border-slate-200 text-slate-300 dark:bg-darkBg-paper dark:border-slate-700'
                    }`}
                  >
                    <StepIcon className="h-3 w-3" />
                  </div>

                  {/* Text Description Box */}
                  <div className="space-y-0.5 flex-1">
                    <h3
                      className={`text-sm font-bold transition-colors ${
                        step.isActive
                          ? 'text-primary'
                          : step.isCompleted
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                    <span className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 pt-0.5">
                      {step.time}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
