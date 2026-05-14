import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
/* eslint-disable react-refresh/only-export-components -- memo + SectionWrapper HOC */
import React, { memo } from "react";

import { styles } from "../styles";
import github from "../assets/github.webp";
import { SectionWrapper } from "../hoc";
import { myGithub, projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import useMediaQuery from "../hooks/useMediaQuery";
import useReducedMotion from "../hooks/useReducedMotion";
import ModernImage from "./ModernImage";

const ProjectCard = memo(
  ({
    index,
    name,
    description,
    tags,
    image,
    source_code_link,
    app_link,
  }) => {
  const shouldReduceMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 768px)");

  const cardVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : fadeIn("up", "spring", isCompact ? index * 0.12 : index * 0.5, isCompact ? 0.55 : 0.75);

  const tiltOptions = {
    max: shouldReduceMotion || isCompact ? 0 : 35,
    scale: 1,
    speed: shouldReduceMotion || isCompact ? 0 : 450,
  };

  return (
    <motion.div className="h-full" variants={cardVariants}>
      <Tilt
        options={tiltOptions}
        className="flex h-full w-full flex-col rounded-2xl bg-tertiary p-4 shadow-card sm:p-5"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:h-[230px] sm:aspect-auto">
          <ModernImage
            src={image}
            alt="project_image"
            className="h-full w-full rounded-2xl object-cover"
          />

          <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
            <button
              type="button"
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 shadow-lg transition duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label={`Open ${name} source code`}
            >
              <ModernImage
                src={github}
                alt="source code"
                className="block h-6 w-6 object-contain"
              />
            </button>
          </div>
        </div>

        <div
          className="mt-5 flex-1 cursor-pointer"
          onClick={() => window.open(app_link, "_blank")}
        >
          <h3 className="text-[21px] font-bold text-white sm:text-[24px]">{name}</h3>
          <p className="mt-2 text-[14px] leading-6 text-secondary">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

const Works = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.div variants={shouldReduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : textVariant()}>
        <p className={`${styles.sectionSubText}`}>MY WORK</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="flex w-full">
        <motion.p
          variants={shouldReduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : fadeIn("", "", 0.1, 1)}
          className="mt-3 max-w-3xl text-[15px] leading-7 text-secondary sm:text-[16px] sm:leading-8 lg:text-[17px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="flex w-full flex-col items-center justify-center">
        <p className="mt-16 max-w-3xl text-center text-[17px] leading-7 text-secondary sm:mt-20 sm:text-[19px] lg:mt-24 lg:text-[21px] lg:leading-[30px]">
          Did you like it? This and much more you can find in my GitHub at the
          link below.
        </p>

        <div
          className="green-pink-gradient mt-4 flex cursor-pointer select-none items-center justify-center rounded-full p-[1px]"
          onClick={() => window.open(myGithub, "_blank")}
        >
          <div className="flex min-h-12 items-center justify-center gap-3 rounded-full bg-tertiary px-5 py-2">
            <ModernImage
              src={github}
              alt="source code"
              className="block h-9 w-9 object-contain"
            />

            <p className="text-[18px] sm:text-[21px]">GitHub</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
