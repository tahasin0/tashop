import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Truck, CreditCard, DollarSign, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import toast from 'react-hot-toast';

interface ShippingForm {
  fullName: string;
  phone: string;
  alternativePhone?: string;
  district: string;
  address: string;
  note?: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ShippingForm>({
    fullName: '',
    phone: '',
    alternativePhone: '',
    district: 'dhaka',
    address: '',
    note: '',
  });

  const subtotal = getCartTotal();
  // Dynamic delivery charge based on district selection
  const deliveryCharge = formData.district === 'dhaka' ? 60 : 120;
  const total = subtotal + deliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Core Form Validations
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toast.error('অনুগ্রহ করে সব বাধ্যতামূলক তথ্যগুলো প্রদান করুন।');
      return;
    }

    if (formData.phone.trim().length < 11) {
      toast.error('সঠিক ১১ ডিজিটের মোবাইল নম্বরটি দিন।');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock order generation delay (will be connected to Firebase order generation cloud architecture in later phases)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!');
      clearCart();
      // Redirect to Order History dashboard view
      navigate('/orders');
    } catch (error) {
      toast.error('দুঃখিত! অর্ডার প্রসেস করার সময় কোনো ত্রুটি হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">চেকআউট করার জন্য কোনো পণ্য কার্টে নেই।</h2>
        <button onClick={() => navigate('/products')} className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white">
          পণ্য তালিকা দেখুন
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>সুরক্ষিত চেকআউট | TA Shop</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/cart')} className="mb-6 flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> কার্টে ফিরে যান
        </button>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
          
          {/* --- LEFT & CENTER: SHIPPING & PAYMENT FIELDS --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping Address Card */}
            <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-premium dark:bg-darkBg-paper">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-3 mb-5 dark:border-slate-800">
                <Truck className="h-5 w-5 text-primary" /> ১. ডেলিভারি ঠিকানা প্রদান করুন
              </h2>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">আপনার সম্পূর্ণ নাম <span className="text-danger">*</span></label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="যেমন: মোহাম্মদ আলী" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">মোবাইল নম্বর <span className="text-danger">*</span></label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="যেমন: 017XXXXXXXX" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">বিকল্প মোবাইল নম্বর (ঐচ্ছিক)</label>
                  <input type="tel" name="alternativePhone" value={formData.alternativePhone} onChange={handleInputChange} placeholder="অন্য আরেকটি নম্বর" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">জেলা/ডিভিশন <span className="text-danger">*</span></label>
                  <select name="district" value={formData.district} onChange={handleInputChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                    <option value="dhaka">ঢাকা (ঢাকার ভেতরে)</option>
                    <option value="outside">ঢাকার বাইরে (অন্যান্য জেলাসমূহ)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">সম্পূর্ণ ঠিকানা <span className="text-danger">*</span></label>
                  <textarea name="address" required rows={3} value={formData.address} onChange={handleInputChange} placeholder="বাসা নম্বর, রোড নম্বর, এলাকা এবং থানার নাম বিস্তারিত লিখুন..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white resize-none" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">অর্ডার নোট (ঐচ্ছিক)</label>
                  <input type="text" name="note" value={formData.note} onChange={handleInputChange} placeholder="ডেলিভারি নিয়ে কোনো বিশেষ নির্দেশনা থাকলে লিখতে পারেন..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
              </div>
            </div>

            {/* Payment Systems Choice Card */}
            <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-premium dark:bg-darkBg-paper">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 pb-3 mb-5 dark:border-slate-800">
                <CreditCard className="h-5 w-5 text-primary" /> ২. পেমেন্ট মেথড সিলেক্ট করুন
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Cash on Delivery Selection */}
                <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mt-1 accent-primary" />
                  <div>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-success" /> ক্যাশ অন ডেলিভারি (COD)
                    </span>
                    <span className="block text-xs text-slate-500 mt-1">পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন।</span>
                  </div>
                </label>

                {/* Online Payment / Mobile Banking Selection */}
                <label className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-all ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="mt-1 accent-primary" />
                  <div>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-primary" /> বিকাশ / রকেট / নগদ / কার্ড
                    </span>
                    <span className="block text-xs text-slate-500 mt-1">মোবাইল ব্যাংকিং বা কার্ডের মাধ্যমে পেমেন্ট করুন।</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* --- RIGHT: FINAL INVOICE & ORDER ACTION SUM --- */}
          <div className="rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper text-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800">আপনার অর্ডারসমূহ</h3>
            
            {/* Quick mini-item list display */}
            <div className="max-h-48 overflow-y-auto space-y-3 pr-1 no-scrollbar">
              {cart.map((item) => {
                const price = item.product.isFlashSale && item.product.flashSalePrice ? item.product.flashSalePrice : (item.product.discountPrice || item.product.price);
                return (
                  <div key={item.product.id} className="flex justify-between items-center gap-2 text-xs">
                    <span className="text-slate-600 dark:text-slate-400 truncate max-w-[180px]">{item.product.title} <strong className="text-slate-900 dark:text-white">x{item.quantity}</strong></span>
                    <span className="font-semibold text-slate-900 dark:text-white">৳{(price * item.quantity).toLocaleString('bn-BD')}</span>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>পণ্যের মোট মূল্য</span>
                <span className="font-semibold text-slate-900 dark:text-white">৳{subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-semibold text-slate-900 dark:text-white">৳{deliveryCharge}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 dark:border-slate-800 flex justify-between font-bold text-base text-slate-900 dark:text-white">
                <span>সর্বমোট বিল</span>
                <span className="text-primary dark:text-white">৳{total.toLocaleString('bn-BD')}</span>
              </div>
            </div>

            {/* Protected Checkout Badge */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 dark:bg-slate-900/40">
              <ShieldCheck className="h-5 w-5 text-success shrink-0" />
              <span>আপনার সমস্ত ডেটা এবং পেমেন্ট ১০০% নিরাপদ ও এন্ড-টু-এন্ড এনক্রিপ্টেড।</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark disabled:opacity-50 btn-touch-active"
            >
              {isSubmitting ? 'অর্ডার সাবমিট হচ্ছে...' : (paymentMethod === 'cod' ? 'অর্ডার সম্পন্ন করুন' : 'পেমেন্ট করুন ও অর্ডার নিশ্চিত করুন')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
