import { useState, useEffect } from "react";

const usePerformance = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // 1. Initial heuristic check
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 8; // Default to 8 if not supported
    const isMobile = window.innerWidth < 768;
    const dpr = window.devicePixelRatio || 1;

    // Heuristic for low-end: 
    // - Less than 4 cores
    // - Less than 4GB RAM
    // - Mobile with very high pixel ratio (hard on GPU)
    let lowEnd = cores < 4 || memory < 4 || (isMobile && dpr > 2.5);

    setIsLowEnd(lowEnd);

    // 2. Dynamic FPS check to refine the detection
    let frameCount = 0;
    let startTime = performance.now();
    let animationFrameId;

    const measureFPS = (currentTime) => {
      frameCount++;
      
      if (frameCount >= 20) { // Measure over 20 frames for better accuracy
        const duration = currentTime - startTime;
        const avgFrameTime = duration / frameCount;
        
        // If average frame time is > 25ms (less than ~40 FPS), mark as low-end
        // We use 25ms as a buffer to avoid false positives from one-off lags
        if (avgFrameTime > 25) {
          setIsLowEnd(true);
        }
        return;
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return isLowEnd;
};

export default usePerformance;
