import React, { useState } from "react";
import { SkeletonBlock } from "./LoadingSkeletons";

/**
 * Image wrapper with lazy loading and a skeleton while the file decodes.
 * Vite fingerprints imported assets, so format fallbacks must be passed as real imports
 * instead of guessed from the hashed URL.
 */
const ModernImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  style, 
  onLoad,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const shellSize =
    className?.includes("w-full") || className?.includes("h-full")
      ? "block w-full h-full"
      : "inline-block";
  const imageClassName = `${className || ""} ${loaded ? "opacity-100" : "opacity-0"}`;
  const handleLoad = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  // If the src is not a string (e.g. it's already an object or undefined), just return a standard img
  if (typeof src !== "string") {
    return (
      <span className={`modern-image-shell ${shellSize}`}>
        {!loaded && <SkeletonBlock className="absolute inset-0 rounded-inherit" />}
        <img
          src={src}
          alt={alt}
          className={imageClassName}
          loading="lazy"
          onLoad={handleLoad}
          {...props}
        />
      </span>
    );
  }

  return (
    <span className={`modern-image-shell ${shellSize}`}>
      {!loaded && <SkeletonBlock className="absolute inset-0 rounded-inherit" />}
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        onLoad={handleLoad}
        style={{
          ...style,
          contentVisibility: "auto",
        }}
        {...props}
      />
    </span>
  );
};

export default ModernImage;
