import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { styles } from "../styles";
import React, { Suspense, useEffect, useState, memo } from "react";
import ComponentLoader from "./ComponentLoader";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";
import CanvasErrorFallback from "./CanvasErrorFallback";
import useReducedMotion from "../hooks/useReducedMotion";
import { useIsLowEnd } from "../context/PerformanceContext.jsx";

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const isLowEnd = useIsLowEnd();
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setShowCanvas(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const id = window.setTimeout(enable, 450);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  const [text] = useTypewriter({
    words: [
      "I'm Web Full Stack Developer",
      "I'm Entrepreneur",
      "I'm Retrogamer",
      "GuyWhoLovesTea.jsx",
      "<ButLovesToCodeMore />",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className="text-[#915EFF]">Khojiakbar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-lg`}>
            {shouldReduceMotion ? "I'm Web Full Stack Developer" : text}
            {!shouldReduceMotion && <Cursor cursorColor="#915eff" />}
          </p>
        </div>
      </div>

      <ErrorBoundary fallback={<CanvasErrorFallback />}>
        {showCanvas ? (
          <Suspense fallback={<ComponentLoader />}>
            <ComputersCanvas />
          </Suspense>
        ) : (
          <div
            className="absolute inset-0 w-full h-full min-h-[320px] flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <span className="canvas-loader" />
          </div>
        )}
      </ErrorBoundary>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={
                shouldReduceMotion || isLowEnd
                  ? {}
                  : {
                      y: [0, 24, 0],
                    }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
}

const MemoizedHero = memo(Hero);
MemoizedHero.displayName = "Hero";

export default MemoizedHero;
