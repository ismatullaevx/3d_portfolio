import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { myGithub, projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import React from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  app_link,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div variants={shouldReduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ 
          max: shouldReduceMotion ? 0 : 45, 
          scale: shouldReduceMotion ? 1 : 1, 
          speed: shouldReduceMotion ? 0 : 450 
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div
          className="mt-5 cursor-pointer"
          onClick={() => window.open(app_link, "_blank")}
        >
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
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
};

const Works = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.div variants={shouldReduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : textVariant()}>
        <p className={`${styles.sectionSubText}`}>MY WORK</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={shouldReduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <p className="mt-24 text-secondary text-[21px] max-w-3xl leading-[30px] text-center">
          Did you like it? This and much more you can find in my GitHub at the
          link below.
        </p>

        <div
          className="green-pink-gradient p-[1px] rounded-full flex justify-center items-center cursor-pointer mt-4 select-none"
          onClick={() => window.open(myGithub, "_blank")}
        >
          <div className="bg-tertiary rounded-full px-3 py-2 flex justify-evenly items-center">
            <img
              src={github}
              alt="source code"
              className="w-[40px] h-[40px] object-contain"
            />

            <p className="text-[21px]">GitHub</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
