import React, { Suspense, lazy, useEffect, useState } from "react";
import { CanvasLoadingState } from "./LoadingSkeletons";
import { useIsLowEnd } from "../context/PerformanceContext.jsx";

const StarsCanvas = lazy(() => import("./canvas/Stars"));

/**
 * Mounts the stars WebGL only when the contact section is near the viewport.
 */
const DeferredStarsCanvas = () => {
  const [active, setActive] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const isLowEnd = useIsLowEnd();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const update = () => setIsSmallScreen(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isSmallScreen || isLowEnd) return undefined;

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
  }, [isLowEnd, isSmallScreen]);

  if (!active || isSmallScreen || isLowEnd) return null;

  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 z-[-1] h-full w-full">
          <CanvasLoadingState compact className="h-full opacity-50" />
        </div>
      }
    >
      <StarsCanvas />
    </Suspense>
  );
};

export default DeferredStarsCanvas;
