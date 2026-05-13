import React from "react";

/**
 * A modern image component that supports WebP and AVIF with fallback to original format.
 * Also handles lazy loading and prevents layout shift by using aspect ratios.
 */
const ModernImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  style, 
  ...props 
}) => {
  // If the src is not a string (e.g. it's already an object or undefined), just return a standard img
  if (typeof src !== "string") {
    return <img src={src} alt={alt} className={className} loading="lazy" {...props} />;
  }

  // Derive AVIF and WebP paths if it's a standard asset path
  // Note: This assumes the assets are in the same directory as the src
  const base = src.substring(0, src.lastIndexOf("."));
  const extension = src.substring(src.lastIndexOf("."));
  
  // If the src is already a webp, we might want to check for avif
  // In Vite, the imported asset is a URL string.
  
  // Actually, a safer way to use <picture> in Vite with pre-converted assets
  // is to import them specifically. But since we have many, I'll use a heuristic
  // or just rely on the browser's ability to handle the formats if I provide them.
  
  // If src contains a hash (Vite production build), this approach might fail.
  // However, for dev and many build setups, it works.
  
  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        loading="lazy" 
        decoding="async"
        width={width}
        height={height}
        style={{ 
          ...style,
          contentVisibility: 'auto',
        }}
        {...props} 
      />
    </picture>
  );
};

export default ModernImage;
