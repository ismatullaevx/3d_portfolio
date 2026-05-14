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

function TechBall({ icon }) {
  return (
    <div className="w-28 h-28">
      <ErrorBoundary fallback={<CanvasErrorFallback />}>
        <Suspense fallback={null}>
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

      <div className="flex flex-row flex-wrap justify-center gap-10 mt-20">
        {technologies.map((technology) => (
          <MemoizedTechBall key={technology.name} icon={technology.icon} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Tech, "");
