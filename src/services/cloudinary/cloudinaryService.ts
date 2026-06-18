/**
 * Cloudinary Service for TA Shop
 * Handles secure image uploads directly to Cloudinary using Signed/Unsigned Upload Presets
 * Strict Rule Compliance: No Firebase Storage used.
 */

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Uploads a single file to Cloudinary and returns the optimized secure URL.
 * @param file The image file to upload
 * @param folder Optional subfolder path inside Cloudinary (e.g., 'products', 'banners', 'profiles')
 */
export const uploadImageToCloudinary = async (
  file: File,
  folder: 'products' | 'banners' | 'profiles' | 'categories' = 'products'
): Promise<string> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration is missing in environment variables.');
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', `ta-shop/${folder}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
    }

    const data: CloudinaryResponse = await response.json();
    
    // Return optimized URL (applying auto format and quality transformations)
    return getOptimizedImageUrl(data.secure_url);
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};

/**
 * Uploads multiple images at once (useful for product gallery)
 */
export const uploadMultipleImagesToCloudinary = async (
  files: File[],
  folder: 'products' | 'banners' = 'products'
): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadImageToCloudinary(file, folder));
  return Promise.all(uploadPromises);
};

/**
 * Automatically injects Cloudinary optimization parameters into the image URL
 * Transforms format to 'auto' (e.g. webp/avif) and quality to 'auto' for blazing fast loading.
 */
export const getOptimizedImageUrl = (url: string): string => {
  if (!url.includes('res.cloudinary.com')) return url;
  
  // Splits after '/image/upload/' to insert transformation parameters
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/f_auto,q_auto/${parts[1]}`;
  }
  
  return url;
};
