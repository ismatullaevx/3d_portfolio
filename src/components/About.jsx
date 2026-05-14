import { motion } from "framer-motion";
import React from "react";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import mrKhojiakbar from "../assets/mrKhojiakbar.webp";
import useMediaQuery from "../hooks/useMediaQuery";
import useReducedMotion from "../hooks/useReducedMotion";
import ModernImage from "./ModernImage";

const ServiceCard = ({ index, title, icon }) => {
  const shouldReduceMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 768px)");

  const cardVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : fadeIn(isCompact ? "up" : "right", "spring", isCompact ? index * 0.12 : 0.5 * index, isCompact ? 0.55 : 0.75);

  const tiltOptions = {
    max: shouldReduceMotion || isCompact ? 0 : 35,
    scale: 1,
    speed: shouldReduceMotion || isCompact ? 0 : 450,
  };

  return (
    <motion.div
      variants={cardVariants}
      className="w-full xs:w-[250px]"
    >
      <Tilt 
        options={tiltOptions}
        className="w-full"
      >
        <div className="green-pink-gradient w-full rounded-[20px] p-[1px] shadow-card">
          <div
            className="flex min-h-[220px] flex-col items-center justify-evenly rounded-[20px] bg-tertiary px-6 py-5 sm:min-h-[260px] sm:px-10 lg:min-h-[280px] lg:px-12"
          >
            {typeof icon === "string" ? (
              <ModernImage src={icon} alt={title} className="h-16 w-16 object-contain" />
            ) : (
              <div className="text-[60px] text-white">
                {React.createElement(icon)}
              </div>
            )}
            <h3 className="text-center text-[18px] font-bold text-white sm:text-[20px]">
              {title}
            </h3>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 768px)");

  const tiltOptions = {
    max: shouldReduceMotion || isCompact ? 0 : 35,
    scale: 1,
    speed: shouldReduceMotion || isCompact ? 0 : 450,
  };

  return (
    <>
      <motion.div variants={shouldReduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.div
        variants={shouldReduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : fadeIn("", "", 0.1, 1)}
        className="flex flex-col-reverse items-center gap-8 min-[1000px]:flex-row min-[1000px]:gap-12"
      >
        <p className="mt-2 w-full text-[15px] leading-7 text-secondary sm:mt-4 sm:text-[16px] sm:leading-8 min-[1000px]:max-w-xl lg:text-[17px]">
          Hey! I&apos;m Khojiakbar. I&apos;m 18 years old and I&apos;m from Namangan,
          Uzbekistan. I have been actively engaged in web development for almost
          1 year and constantly study new technologies and try to apply them.
          I&apos;m skilled web full stack developer with experience in React, Vue,
          Symfony and PHP. I can and love to work in a team. I can organize
          myself for remote work. The experience gained is not just in the
          treasury of skills, but is actively used in product development. I
          like to learn from more experienced colleagues, in addition to
          self-study.
        </p>

        <Tilt 
          className="m-auto h-auto w-full max-w-[320px] xs:max-w-[350px]"
          options={tiltOptions}
        >
          <div className="green-pink-gradient mx-auto w-full max-w-[280px] rounded-[20px] p-[1px] shadow-card">
            <div className="flex aspect-square min-h-[220px] flex-col items-center justify-evenly overflow-hidden rounded-[20px] bg-tertiary">
              <ModernImage
                src={mrKhojiakbar}
                alt="MyPhoto"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </Tilt>
      </motion.div>
      <div className="mt-12 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:mt-16 sm:gap-7 lg:mt-20 lg:flex lg:flex-wrap lg:justify-center lg:gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");

export default AboutSection;
