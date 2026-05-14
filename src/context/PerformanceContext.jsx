import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PerformanceContext = createContext({
  isLowEnd: false,
});

export function PerformanceProvider({ children }) {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 8;
    const isMobile = window.innerWidth < 768;
    const dpr = window.devicePixelRatio || 1;

    let lowEnd = cores < 4 || memory < 4 || (isMobile && dpr > 2.5);
    setIsLowEnd(lowEnd);

    let frameCount = 0;
    let startTime = performance.now();
    let animationFrameId;

    const measureFPS = (currentTime) => {
      frameCount++;

      if (frameCount >= 20) {
        const duration = currentTime - startTime;
        const avgFrameTime = duration / frameCount;
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

  const value = useMemo(() => ({ isLowEnd }), [isLowEnd]);

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useIsLowEnd() {
  return useContext(PerformanceContext).isLowEnd;
}
