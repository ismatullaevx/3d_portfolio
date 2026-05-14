/* eslint-disable react-refresh/only-export-components -- SectionWrapper HOC export */
import { motion } from "framer-motion";
import React, { Suspense, memo } from "react";

import { BallCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";
import CanvasErrorFallback from "./CanvasErrorFallback";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { TechBallSkeleton } from "./LoadingSkeletons";

function TechBall({ icon }) {
  return (
    <div className="h-20 w-20 xs:h-24 xs:w-24 sm:h-28 sm:w-28">
      <ErrorBoundary fallback={<CanvasErrorFallback />}>
        <Suspense fallback={<TechBallSkeleton />}>
          <BallCanvas icon={icon} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

const MemoizedTechBall = memo(TechBall);
MemoizedTechBall.displayName = "TechBall";

function Tech() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My tools</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Technologies.
        </h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-3 justify-items-center gap-5 xs:grid-cols-4 sm:mt-16 sm:gap-8 md:grid-cols-5 lg:mt-20 lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10">
        {technologies.map((technology) => (
          <MemoizedTechBall key={technology.name} icon={technology.icon} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Tech, "");
