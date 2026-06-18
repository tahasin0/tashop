import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, LogIn, ArrowRight, Chrome } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithEmail, loginWithGoogle } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to original targeted protected page or default to profile dashboard
  const from = (location.state as any)?.from?.pathname || '/profile';

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দুটিই প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
      toast.success('সফলভাবে লগইন করা হয়েছে!');
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error(error);
      toast.error('লগইন ব্যর্থ হয়েছে! অনুগ্রহ করে সঠিক ইমেইল ও পাসওয়ার্ড দিন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('গুগল অ্যাকাউন্ট দিয়ে সফলভাবে লগইন করা হয়েছে!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('গুগল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-darkBg transition-colors duration-200">
      <Helmet>
        <title>লগইন করুন | TA Shop Premium Access</title>
      </Helmet>

      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">স্বাগতম আবার!</h1>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">আপনার অ্যাকাউন্টে লগইন করে কেনাকাটা ও অর্ডার ট্র্যাক করুন</p>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
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
                placeholder="******"
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark disabled:opacity-50 btn-touch-active"
          >
            <LogIn className="h-4 w-4" />
            {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        {/* Divider Setup */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute w-full border-t border-slate-100 dark:border-slate-800" />
          <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider dark:bg-darkBg-paper">অথবা</span>
        </div>

        {/* OAuth Social Login buttons */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 btn-touch-active"
        >
          <Chrome className="h-4 w-4 text-danger fill-current" />
          <span>গুগল অ্যাকাউন্ট দিয়ে সাইন-ইন করুন</span>
        </button>

        {/* Link Redirect to Registration Gate */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          নতুন গ্রাহক?{' '}
          <Link to="/register" state={{ from: location.state?.from }} className="inline-flex items-center gap-0.5 font-bold text-primary dark:text-white hover:underline">
            নতুন অ্যাকাউন্ট তৈরি করুন
            <ArrowRight className="h-3 w-3" />
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
