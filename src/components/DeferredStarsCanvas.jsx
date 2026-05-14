import React, { Suspense, lazy, useEffect, useState } from "react";

const StarsCanvas = lazy(() => import("./canvas/Stars"));

/**
 * Mounts the stars WebGL only when the contact section is near the viewport.
 */
const DeferredStarsCanvas = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "400px 0px", threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!active) return null;

  return (
    <Suspense fallback={null}>
      <StarsCanvas />
    </Suspense>
  );
};

export default DeferredStarsCanvas;
