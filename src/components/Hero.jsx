import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { styles } from "../styles";
import React, { Suspense, useEffect, useState, memo } from "react";
import ComponentLoader from "./ComponentLoader";
import { CanvasLoadingState, HeroContentSkeleton } from "./LoadingSkeletons";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";
import CanvasErrorFallback from "./CanvasErrorFallback";
import useReducedMotion from "../hooks/useReducedMotion";
import { useIsLowEnd } from "../context/PerformanceContext.jsx";

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const isLowEnd = useIsLowEnd();
  const [showCanvas, setShowCanvas] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const contentId = window.setTimeout(() => {
      if (!cancelled) setContentReady(true);
    }, 120);

    const enable = () => {
      if (!cancelled) setShowCanvas(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2200 });
      return () => {
        cancelled = true;
        window.clearTimeout(contentId);
        window.cancelIdleCallback(id);
      };
    }

    const id = window.setTimeout(enable, 450);
    return () => {
      cancelled = true;
      window.clearTimeout(contentId);
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
    <section className="relative mx-auto h-[100svh] min-h-[620px] w-full overflow-hidden sm:min-h-[700px] lg:min-h-[760px]">
      <div
        className={`pointer-events-none absolute inset-x-0 top-[88px] z-10 mx-auto flex max-w-7xl flex-row items-start gap-3 sm:top-[120px] sm:gap-5 ${styles.paddingX}`}
      >
        <div className="mt-4 flex flex-col items-center justify-center sm:mt-5">
          <div className="h-4 w-4 rounded-full bg-[#915EFF] sm:h-5 sm:w-5" />
          <div className="violet-gradient h-36 w-1 xs:h-44 sm:h-72 lg:h-80" />
        </div>

        {contentReady ? (
          <div className="max-w-[calc(100vw-4rem)] transition-opacity duration-300 sm:max-w-2xl">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I&apos;m <span className="text-[#915EFF]">Khojiakbar</span>
            </h1>
            <p className={`${styles.heroSubText} mt-3 max-w-lg text-white-100`}>
              {shouldReduceMotion ? "I'm Web Full Stack Developer" : text}
              {!shouldReduceMotion && <Cursor cursorColor="#915eff" />}
            </p>
          </div>
        ) : (
          <HeroContentSkeleton />
        )}
      </div>

      <ErrorBoundary fallback={<CanvasErrorFallback />}>
        {showCanvas ? (
          <Suspense
            fallback={
              <ComponentLoader
                canvas
                className="absolute inset-0 h-full min-h-[320px] w-full"
              />
            }
          >
            <ComputersCanvas />
          </Suspense>
        ) : (
          <div
            className="pointer-events-none absolute inset-0 flex h-full min-h-[320px] w-full items-center justify-center"
            aria-hidden
          >
            <CanvasLoadingState label="Preparing scene" />
          </div>
        )}
      </ErrorBoundary>

      <div className="absolute bottom-8 z-10 flex w-full items-center justify-center sm:bottom-10">
        <a href="#about" className="flex min-h-12 min-w-12 items-center justify-center" aria-label="Scroll to about section">
          <div className="flex h-[58px] w-[32px] items-start justify-center rounded-3xl border-[3px] border-secondary p-2 sm:h-[64px] sm:w-[35px] sm:border-4">
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
