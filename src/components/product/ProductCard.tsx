import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
  onAddToCart,
  isWishlisted = false,
}) => {
  const {
    title,
    slug,
    price,
    discountPrice,
    images,
    rating,
    reviewCount,
    isFlashSale,
    flashSalePrice,
  } = product;

  // Determine the final active price and discount percentage
  const displayPrice = isFlashSale && flashSalePrice ? flashSalePrice : (discountPrice || price);
  const originalPrice = isFlashSale && flashSalePrice ? price : (discountPrice ? price : null);
  
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) 
    : 0;

  const thumbnail = images && images.length > 0 ? images[0].url : 'https://via.placeholder.com/300';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg dark:bg-slate-800">
      
      {/* Badges (Discount & Flash Sale) */}
      <div className="absolute left-5 top-5 z-10 flex flex-col gap-1.5">
        {isFlashSale && (
          <span className="rounded-md bg-danger px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Flash Sale
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="rounded-md bg-success px-2 py-0.5 text-[10px] font-bold text-white">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (onWishlistToggle) onWishlistToggle(product.id);
        }}
        className={`absolute right-5 top-5 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 btn-touch-active shadow-sm`}
        aria-label="Add to wishlist"
      >
        <Heart
          className={`h-4 w-4 ${
            isWishlisted ? 'fill-danger text-danger' : 'text-slate-400 dark:text-slate-500'
          }`}
        />
      </button>

      {/* Product Image Clickable Link */}
      <Link to={`/product/${slug}`} className="aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product Meta Info */}
      <div className="mt-3 flex flex-col flex-1">
        <Link to={`/product/${slug}`} className="flex-1">
          <h3 className="line-clamp-2 text-sm font-medium text-slate-800 hover:text-primary dark:text-slate-200 dark:hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          
          {/* Rating Summary */}
          <div className="mt-1.5 flex items-center gap-1">
            <div className="flex items-center text-warning">
              <Star className="h-3 w-3 fill-current" />
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {rating > 0 ? rating.toFixed(1) : 'নতুন'}
            </span>
            {reviewCount > 0 && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                ({reviewCount})
              </span>
            )}
          </div>
        </Link>

        {/* Pricing and Action Footer */}
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-50 pt-2 dark:border-slate-700/50">
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              ৳{displayPrice.toLocaleString('bn-BD')}
            </span>
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through dark:text-slate-500">
                ৳{originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
          </div>

          {/* Quick Add to Cart Action */}
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onAddToCart) onAddToCart(product);
            }}
            className="rounded-xl bg-primary p-2.5 text-white shadow-sm transition-colors hover:bg-primary-dark btn-touch-active"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
