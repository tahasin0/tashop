import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Ticket } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal > 0 ? (subtotal >= 5000 ? 0 : 60) : 0; // Free delivery over 5000 BDT
  const total = subtotal + deliveryCharge - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    // Hardcoded mock coupon for Phase 6 presentation (will dynamically sync with Firestore coupons in later phases)
    if (couponCode.toUpperCase() === 'TASHOP20') {
      const calculatedDiscount = Math.round(subtotal * 0.2); // 20% Discount
      setDiscount(calculatedDiscount);
      toast.success('কুপন সফলভাবে সক্রিয় হয়েছে! ২০% ছাড় দেওয়া হয়েছে।');
    } else {
      toast.error('দুঃখিত! কুপনটি সঠিক নয় বা এর মেয়াদ শেষ।');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 p-4 text-center dark:bg-darkBg transition-colors duration-200">
        <Helmet>
          <title>শপিং কার্ট | TA Shop</title>
        </Helmet>
        <div className="rounded-full bg-white p-6 shadow-premium dark:bg-slate-800">
          <ShoppingBag className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="mt-6 text-lg font-bold text-slate-800 dark:text-white">আপনার কার্টটি সম্পূর্ণ খালি!</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-xs">কার্টে কোনো পণ্য যুক্ত করা হয়নি। আমাদের চমৎকার অফারগুলো দেখতে শপ পেজে ভিজিট করুন।</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark btn-touch-active"
        >
          কেনাকাটা শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>শপিং কার্ট ({cart.length}) | TA Shop</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl mb-6">আপনার শপিং কার্ট</h1>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
          {/* --- LEFT: CART ITEMS LIST --- */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const product = item.product;
              const activePrice = product.isFlashSale && product.flashSalePrice 
                ? product.flashSalePrice 
                : (product.discountPrice || product.price);
              const thumbnail = product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/150';

              return (
                <div 
                  key={product.id} 
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50"
                >
                  {/* Thumbnail Image */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900">
                    <img src={thumbnail} alt={product.title} className="h-full w-full object-cover" />
                  </div>

                  {/* Product Title and Price Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.slug}`} className="block">
                      <h3 className="truncate text-sm font-bold text-slate-800 hover:text-primary dark:text-slate-200 dark:hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white">
                      ৳{activePrice.toLocaleString('bn-BD')}
                    </p>
                  </div>

                  {/* Quantity Control Counter & Remove Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center rounded-xl border border-slate-100 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
                      <button
                        onClick={() => updateQuantity(product.id, item.quantity - 1)}
                        className="rounded-lg p-1 text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 btn-touch-active"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, item.quantity + 1)}
                        className="rounded-lg p-1 text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 btn-touch-active"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(product.id);
                        toast.success('পণ্যটি কার্ট থেকে বাদ দেওয়া হয়েছে।');
                      }}
                      className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-danger dark:text-slate-500 dark:hover:bg-red-950/30 transition-colors btn-touch-active"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- RIGHT: ORDER SUMMARY PANEL --- */}
          <div className="space-y-4">
            {/* Coupon Code Panel */}
            <div className="rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Ticket className="h-4 w-4 text-primary" /> কুপন কোড ব্যবহার করুন
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="যেমন: TASHOP20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-dark btn-touch-active"
                >
                  প্রয়োগ
                </button>
              </form>
            </div>

            {/* Total Pricing Receipt Panel */}
            <div className="rounded-2xl bg-white p-5 shadow-premium dark:bg-darkBg-paper text-sm space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-2 dark:border-slate-800">অর্ডার সামারি</h3>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>সাবটোটাল</span>
                <span className="font-semibold text-slate-900 dark:text-white">৳{subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {deliveryCharge === 0 ? <span className="text-success font-bold">ফ্রি</span> : `৳${deliveryCharge}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success font-medium">
                  <span>ডিসকাউন্ট (-)</span>
                  <span>৳{discount.toLocaleString('bn-BD')}</span>
                </div>
              )}
              <div className="border-t border-slate-100 pt-3 dark:border-slate-800 flex justify-between font-bold text-base text-slate-900 dark:text-white">
                <span>সর্বমোট মূল্য</span>
                <span className="text-primary dark:text-white">৳{total.toLocaleString('bn-BD')}</span>
              </div>

              <button
                onClick={() => navigate('/checkout', { state: { couponApplied: discount > 0 ? couponCode : '' } })}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark btn-touch-active"
              >
                চেকআউট পেজে যান
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
