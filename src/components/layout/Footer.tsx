import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Shield, CheckCircle, RefreshCcw } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-100 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-darkBg-paper dark:text-slate-400">
      {/* Upper Footer: Value Proposition */}
      <div className="mx-auto max-w-7xl border-b border-slate-200 px-4 py-8 dark:border-slate-800 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">১০০% অরিজিনাল পণ্য</h4>
              <p className="text-xs text-slate-500">সরাসরি ব্র্যান্ড থেকে আমদানিকৃত আসল পণ্য</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <RefreshCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">সহজ রিটার্ন পলিসি</h4>
              <p className="text-xs text-slate-500">পণ্য গ্রহণে সমস্যা হলে সহজ রিটার্ন ও রিফান্ড</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">নিরাপদ পেমেন্ট গেটওয়ে</h4>
              <p className="text-xs text-slate-500">বিকাশ, রকেট, নগদ ও ক্যাশ অন ডেলিভারি</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Footer: Links & Info */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Column 1: Company About */}
          <div className="space-y-4">
            <span className="text-xl font-bold tracking-tight text-primary dark:text-white">
              TA<span className="text-slate-900 dark:text-primary">SHOP</span>
            </span>
            <p className="text-sm text-slate-500 leading-relaxed">
              বাংলাদেশের অন্যতম বিশ্বস্ত প্রিমিয়াম ই-কমার্স প্ল্যাটফর্ম। আমাদের লক্ষ্য সাশ্রয়ী মূল্যে সঠিক সময়ে গ্রাহকের দোরগোড়ায় সেরা পণ্য পৌঁছে দেওয়া।
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">জরুরি লিঙ্ক</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-primary transition-colors">সব প্রোডাক্টস</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">শপিং কার্ট</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">আমার প্রোফাইল</Link></li>
              <li><Link to="/orders" className="hover:text-primary transition-colors">অর্ডার ট্র্যাকিং</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal Pages */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">পলিসি ও শর্তাবলী</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">প্রাইভেসি পলিসি</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-primary transition-colors">টার্মস এন্ড কন্ডিশনস</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary transition-colors">রিফান্ড ও রিটার্ন পলিসি</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">যোগাযোগ</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>ধানমন্ডি, ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+৮৮০ ১২৩৪৫৬৭৮৯০</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>support@tashop.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer: Copyright and Padding for Mobile Nav */}
      <div className="bg-slate-100 py-4 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8 pb-16 lg:pb-0">
          <p>&copy; {currentYear} TA Shop. All Rights Reserved. Developed with Premium App Experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
