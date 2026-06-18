import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Lock, UserPlus, ArrowRight, Chrome } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerWithEmail, loginWithGoogle } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect configuration based on original gate request location
  const from = (location.state as any)?.from?.pathname || '/profile';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations validation schema core
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error('অনুগ্রহ করে সমস্ত ফিল্ড সঠিকভাবে পূরণ করুন।');
      return;
    }

    if (password.length < 6) {
      toast.error('নিরাপত্তার স্বার্থে পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড দুটি মেলেনি! আবার চেষ্টা করুন।');
      return;
    }

    setIsSubmitting(true);
    try {
      await registerWithEmail(email, password, name);
      toast.success('অ্যাকাউন্ট তৈরি সফল হয়েছে!');
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('এই ইমেইলটি দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে।');
      } else {
        toast.error('অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-darkBg transition-colors duration-200">
      <Helmet>
        <title>নতুন অ্যাকাউন্ট তৈরি | TA Shop Premium Registration</title>
      </Helmet>

      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50 space-y-6">
        
        {/* Header Block */}
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">আমাদের প্রিমিয়াম মেম্বারশিপ এবং অফারগুলো উপভোগ করতে যোগ দিন</p>
        </div>

        {/* Traditional Registration Form HTML */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">আপনার সম্পূর্ণ নাম</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="মোহাম্মদ আলী"
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">ইমেইল ঠিকানা</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="সর্বনিম্ন ৬ ডিজিট"
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">পাসওয়ার্ড নিশ্চিত করুন</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="আবারও পাসওয়ার্ডটি লিখুন"
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark disabled:opacity-50 btn-touch-active"
          >
            <UserPlus className="h-4 w-4" />
            {isSubmitting ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'রেজিস্ট্রেশন সম্পন্ন করুন'}
          </button>
        </form>

        {/* Divider Setup */}
        <div className="relative flex items-center justify-center py-1">
          <div className="absolute w-full border-t border-slate-100 dark:border-slate-800" />
          <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider dark:bg-darkBg-paper">অথবা</span>
        </div>

        {/* OAuth Social Authentication integration shortcut */}
        <button
          type="button"
          onClick={async () => {
            try {
              await loginWithGoogle();
              toast.success('গুগল দিয়ে সফলভাবে সাইন-আপ সম্পন্ন হয়েছে!');
              navigate(from, { replace: true });
            } catch (err) {
              toast.error('গুগল সাইন-আপ ব্যর্থ হয়েছে।');
            }
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 btn-touch-active"
        >
          <Chrome className="h-4 w-4 text-danger fill-current" />
          <span>গুগল অ্যাকাউন্ট দিয়ে সরাসরি যুক্ত হোন</span>
        </button>

        {/* Redirect toggle to login view */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link to="/login" state={{ from: location.state?.from }} className="inline-flex items-center gap-0.5 font-bold text-primary dark:text-white hover:underline">
            লগইন করুন
            <ArrowRight className="h-3 w-3" />
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
