import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, PlusCircle, Image, UploadCloud, X, Percent } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductFormInput {
  title: string;
  category: string;
  price: number;
  discountPrice: number;
  stock: number;
  isFlashSale: boolean;
  flashSalePrice: number;
  description: string;
  keywords: string;
}

const AdminAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const [form, setForm] = useState<ProductFormInput>({
    title: '',
    category: 'gadgets-electronics',
    price: 0,
    discountPrice: 0,
    stock: 10,
    isFlashSale: false,
    flashSalePrice: 0,
    description: '',
    keywords: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentImageUrl.trim()) return;
    
    if (!currentImageUrl.startsWith('http://') && !currentImageUrl.startsWith('https://')) {
      toast.error('অনুগ্রহ করে একটি সঠিক ইমেজ URL প্রদান করুন।');
      return;
    }

    setImageUrls((prev) => [...prev, currentImageUrl.trim()]);
    setCurrentImageUrl('');
    toast.success('ইমেজ ইউআরএল যুক্ত হয়েছে।');
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations Core Checklist
    if (!form.title.trim() || form.price <= 0 || !form.description.trim()) {
      toast.error('প্রোডাক্টের নাম, সঠিক মূল্য এবং বিবরণী দেওয়া বাধ্যতামূলক।');
      return;
    }

    if (imageUrls.length === 0) {
      toast.error('অনুগ্রহ করে প্রোডাক্টের অন্তত একটি ইমেজ যুক্ত করুন।');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock network upload stream processing delay (Firestore + Storage payload sync in later integration phase)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Formatting keywords context string directly to string array layout
      const keywordsArray = form.keywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);

      const finalizedPayload = {
        ...form,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        flashSalePrice: form.flashSalePrice ? Number(form.flashSalePrice) : undefined,
        stock: Number(form.stock),
        images: imageUrls.map((url, i) => ({ id: `img-${Date.now()}-${i}`, url })),
        keywords: keywordsArray,
        slug: form.title.toLowerCase().replace(/[^a-z0-9\u0980-\u09FF]+/g, '-').replace(/(^-|-$)/g, ''),
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Successfully generated complete Product Document payload:', finalizedPayload);
      toast.success('নতুন প্রোডাক্টটি ডাটাবেজে সফলভাবে যুক্ত করা হয়েছে!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('প্রোডাক্ট আপলোড করার সময় সিস্টেম ইরর হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-200 py-6">
      <Helmet>
        <title>নতুন প্রোডাক্ট আপলোড | এডমিন প্যানেল</title>
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Navigation back anchor */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-6 flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> ড্যাশবোর্ডে ফিরে যান
        </button>

        <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-premium dark:bg-darkBg-paper border border-slate-50 dark:border-slate-800/50">
          <div className="border-b border-slate-100 pb-4 dark:border-slate-800 mb-6">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl flex items-center gap-2">
              <PlusCircle className="h-6 w-6 text-primary" /> ইনভেন্টরিতে নতুন পণ্য যুক্ত করুন
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">পণ্য সংক্রান্ত তথ্য ও প্রাইসিং সেটিংস নিখুঁতভাবে পূরণ করুন</p>
          </div>

          <form onSubmit={handleSubmitProduct} className="space-y-6">
            
            {/* 1. Title Form Row */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">প্রোডাক্টের নাম (Title) <span className="text-danger">*</span></label>
              <input type="text" name="title" required value={form.title} onChange={handleInputChange} placeholder="যেমন: T500 Ultra Smart Watch with Bluetooth Calling" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>

            {/* 2. Category & Stock Settings Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">ক্যাটাগরি সিলেক্ট করুন <span className="text-danger">*</span></label>
                <select name="category" value={form.category} onChange={handleInputChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option value="gadgets-electronics">গ্যাজেট ও ইলেকট্রনিক্স</option>
                  <option value="fashion-lifestyle">ফ্যাশন ও লাইফস্টাইল</option>
                  <option value="home-appliances">হোম ও অ্যাপ্লায়েন্স</option>
                  <option value="grocery-daily-needs">গ্রোসারি ও Daily Needs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">স্টক পরিমাণ (Stock Quantity) <span className="text-danger">*</span></label>
                <input type="number" min="0" name="stock" required value={form.stock} onChange={handleInputChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
            </div>

            {/* 3. Pricing Matrix Section Wrapper */}
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 sm:p-5 grid grid-cols-1 gap-4 sm:grid-cols-3 border border-slate-100 dark:border-slate-800/60">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">আসল মূল্য (Regular Price) ৳ <span className="text-danger">*</span></label>
                <input type="number" min="0" name="price" required value={form.price || ''} onChange={handleInputChange} placeholder="2500" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">ডিসকাউন্ট মূল্য (Discount BDT) ৳</label>
                <input type="number" min="0" name="discountPrice" value={form.discountPrice || ''} onChange={handleInputChange} placeholder="1850" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>

              <div className="flex flex-col justify-end pb-1.5 sm:pl-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 select-none">
                  <input type="checkbox" name="isFlashSale" checked={form.isFlashSale} onChange={handleInputChange} className="accent-primary h-4 w-4 rounded" />
                  <span>এটি ফ্ল্যাশ সেল পণ্য</span>
                </label>
              </div>

              {form.isFlashSale && (
                <div className="sm:col-span-3 border-t border-slate-200 dark:border-slate-800 pt-3 animate-fade-in">
                  <label className="block text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5 flex items-center gap-1"><Percent className="h-3.5 w-3.5" /> ফ্ল্যাশ সেল স্পেশাল অফার প্রাইজ (Flash Sale Price) ৳</label>
                  <input type="number" min="0" name="flashSalePrice" required={form.isFlashSale} value={form.flashSalePrice || ''} onChange={handleInputChange} placeholder="1650" className="w-full max-w-xs rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-500 dark:border-red-900/60 dark:bg-slate-800 dark:text-white" />
                </div>
              )}
            </div>

            {/* 4. Image Pipeline Builder Row */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">প্রোডাক্ট ইমেজ কালেকশন (Web URLs) <span className="text-danger">*</span></label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Image className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input type="text" value={currentImageUrl} onChange={(e) => setCurrentImageUrl(e.target.value)} placeholder="https://images.unsplash.com/photo-..." className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <button type="button" onClick={handleAddImageUrl} className="rounded-xl bg-slate-900 px-4 text-xs font-bold text-white hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-dark transition-colors btn-touch-active">যুক্ত করুন</button>
              </div>

              {/* Render loaded preview bubbles */}
              {imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/40">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative h-16 w-16 overflow-hidden rounded-xl bg-white border border-slate-200 dark:border-slate-700 shadow-sm">
                      <img src={url} alt="preview" className="h-full w-full object-cover" />
                      <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -right-1 -top-1 rounded-full bg-danger p-0.5 text-white hover:scale-105 transition-transform"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Product Description Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">বিস্তারিত বিবরণী (Detailed Description) <span className="text-danger">*</span></label>
              <textarea name="description" required rows={5} value={form.description} onChange={handleInputChange} placeholder="প্রোডাক্টের গুণাবলী, সাইজ, ওয়ারেন্টি বা স্পেসিফিকেশন বিস্তারিত এখানে লিখুন..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white resize-none" />
            </div>

            {/* 6. SEO Keywords Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">এসইও কিওয়ার্ডস (SEO Keywords)</label>
              <input type="text" name="keywords" value={form.keywords} onChange={handleInputChange} placeholder="কমা দিয়ে লিখুন, যেমন: watch, smartwatch, fitness tracker" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              <p className="text-[10px] text-slate-400 mt-1">প্রোডাক্ট সার্চ অপ্টিমাইজেশন বৃদ্ধিতে প্রতিটি কিওয়ার্ডের মাঝে কমা (,) ব্যবহার করুন।</p>
            </div>

            {/* Submit Action Block */}
            <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-dark disabled:opacity-50 btn-touch-active"
              >
                <UploadCloud className="h-4 w-4" />
                {isSubmitting ? 'প্রোডাক্ট আপলোড হচ্ছে...' : 'ডাটাবেজে প্রোডাক্ট আপলোড নিশ্চিত করুন'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
