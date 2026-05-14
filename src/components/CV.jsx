import React from "react";
import { motion } from "framer-motion";
/* eslint-disable react-refresh/only-export-components -- SectionWrapper HOC export */

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { CVDuncan, MyCV, myWords } from "../constants";
import useReducedMotion from "../hooks/useReducedMotion";
import ModernImage from "./ModernImage";

const Card = ({ text, name }) => (
  <div className="w-full select-none rounded-3xl bg-black-200 p-6 xs:w-[320px] sm:p-8 lg:p-10">
    <p className="text-[40px] font-black text-white sm:text-[48px]">&quot;</p>

    <div className="mt-1">
      <p className="text-[16px] leading-7 tracking-wider text-white sm:text-[18px]">{text}</p>

      <div className="mt-7 flex items-center justify-between gap-1">
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
    <div className="rounded-[20px] bg-black-100">
      <div
        className={`rounded-2xl bg-tertiary ${styles.padding} min-h-[240px] sm:min-h-[300px]`}
      >
        <motion.div variants={shouldReduceMotion ? {} : textVariant()}>
          <p className={styles.sectionSubText}>For employers</p>
          <h2 className={styles.sectionHeadText}>My CV.</h2>
        </motion.div>
      </div>
      <div
        className={`-mt-16 flex select-none flex-wrap justify-center gap-5 pb-10 sm:-mt-20 sm:gap-7 sm:pb-14 ${styles.paddingX}`}
      >
        {myWords.map((myWords, index) => (
          <Card key={myWords.name} index={index} {...myWords} />
        ))}

        <div className="w-full rounded-3xl bg-black-200 p-6 xs:w-[640px] sm:p-8 lg:p-10">
          <div className="flex flex-col items-center justify-around gap-6 min-[850px]:flex-row">
            <ModernImage src={CVDuncan} alt="CVDuncan" className="w-[190px] sm:w-[250px]" />

            <a href={MyCV} download className="w-full xs:w-auto">
              <button className="min-h-12 w-full rounded-xl bg-tertiary px-8 py-3 text-[18px] font-bold text-white shadow-md shadow-primary outline-none transition-colors hover:bg-[#1d163d] sm:text-[21px] xs:w-fit">
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
