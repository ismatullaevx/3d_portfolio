import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { CVDuncan, MyCV, myWords } from "../constants";
import useReducedMotion from "../hooks/useReducedMotion";
import ModernImage from "./ModernImage";

const Card = ({ text, name }) => (
  <div className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full select-none">
    <p className="text-white font-black text-[48px]">&quot;</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]">{text}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
        </div>

        {/* <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        /> */}
      </div>
    </div>
  </div>
);

const CV = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-black-100 rounded-[20px]">
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={shouldReduceMotion ? {} : textVariant()}>
          <p className={styles.sectionSubText}>For employers</p>
          <h2 className={styles.sectionHeadText}>My CV.</h2>
        </motion.div>
      </div>
      <div
        className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center select-none`}
      >
        {myWords.map((myWords, index) => (
          <Card key={myWords.name} index={index} {...myWords} />
        ))}

        <div className="bg-black-200 p-10 rounded-3xl xs:w-[640px] w-full">
          <div className="flex min-[850px]:flex-row flex-col justify-around items-center">
            <ModernImage src={CVDuncan} alt="CVDuncan" className="w-[250px]" />

            <a href={MyCV} download>
              <button className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary text-[21px]">
                Download CV
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(CV, "cv");
