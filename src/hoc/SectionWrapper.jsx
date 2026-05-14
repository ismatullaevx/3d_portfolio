import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
import useReducedMotion from "../hooks/useReducedMotion";

const SECTION_VIEWPORT = { once: true, amount: 0.1 };

const SectionWrapper = (Component, idName) =>
  function HOC() {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.section
        variants={shouldReduceMotion ? {} : staggerContainer()}
        initial={shouldReduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={SECTION_VIEWPORT}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
