import React, { Suspense } from "react";
import { BallCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";
import CanvasErrorFallback from "./CanvasErrorFallback";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  return (
    <>
      <div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My tools</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Technologies.
        </h2>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-10 mt-20">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <ErrorBoundary fallback={<CanvasErrorFallback />}>
              <Suspense fallback={null}>
                <BallCanvas icon={technology.icon} />
              </Suspense>
            </ErrorBoundary>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
