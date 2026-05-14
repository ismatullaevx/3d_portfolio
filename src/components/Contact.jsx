import { motion } from "framer-motion";
import React, { useRef, useState, Suspense } from "react";
/* eslint-disable react-refresh/only-export-components -- SectionWrapper HOC export */
import ComponentLoader from "./ComponentLoader";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import useReducedMotion from "../hooks/useReducedMotion";
import ErrorBoundary from "./ErrorBoundary";
import CanvasErrorFallback from "./CanvasErrorFallback";

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    emailOrPhone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!form.name.trim() || !form.emailOrPhone.trim() || !form.message.trim()) {
      setIsError(true);
      setStatusMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          emailOrPhone: form.emailOrPhone,
          message: form.message,
        }),
      });

      if (response.ok) {
        setLoading(false);
        setIsError(false);
        setStatusMessage("Thank you. I will get back to you as soon as possible.");
        setForm({
          name: "",
          emailOrPhone: "",
          message: "",
        });
      } else {
        setLoading(false);
        setIsError(true);
        setStatusMessage("Something went wrong.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setIsError(true);
      setStatusMessage("Something went wrong.");
    }
  };

  return (
    <div
      className="flex flex-col-reverse gap-8 overflow-hidden xl:mt-12 xl:flex-row xl:gap-10"
    >
      <motion.div
        variants={shouldReduceMotion ? { hidden: { x: 0, y: 0 }, show: { x: 0, y: 0 } } : slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl bg-black-100 p-5 xs:p-6 sm:p-8"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-7 lg:mt-12 lg:gap-8"
        >
          <label className="flex flex-col">
            <span className="mb-3 font-medium text-white sm:mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="min-h-12 rounded-lg border-none bg-tertiary px-4 py-3 font-medium text-white outline-none placeholder:text-secondary focus:ring-2 focus:ring-[#915EFF] sm:px-6 sm:py-4"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-3 font-medium text-white sm:mb-4">Email / Phone</span>
            <input
              type="text"
              name="emailOrPhone"
              value={form.emailOrPhone}
              onChange={handleChange}
              placeholder="What's your email or phone number?"
              className="min-h-12 rounded-lg border-none bg-tertiary px-4 py-3 font-medium text-white outline-none placeholder:text-secondary focus:ring-2 focus:ring-[#915EFF] sm:px-6 sm:py-4"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-3 font-medium text-white sm:mb-4">Your Message</span>
            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="min-h-[150px] resize-y rounded-lg border-none bg-tertiary px-4 py-3 font-medium text-white outline-none placeholder:text-secondary focus:ring-2 focus:ring-[#915EFF] sm:min-h-[190px] sm:px-6 sm:py-4"
            />
          </label>

          {statusMessage && (
            <p className={`mt-3 ${isError ? "text-red-500" : "text-green-500"} font-medium`}>
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-tertiary px-8 py-3 font-bold text-white shadow-md shadow-primary outline-none transition-colors hover:bg-[#1d163d] disabled:cursor-wait disabled:opacity-80 xs:w-fit"
          >
            {loading && <span className="button-loading-ring" aria-hidden="true" />}
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={shouldReduceMotion ? { hidden: { x: 0, y: 0 }, show: { x: 0, y: 0 } } : slideIn("right", "tween", 0.2, 1)}
        className="h-[280px] xs:h-[330px] md:h-[460px] xl:h-auto xl:flex-1"
      >
        <ErrorBoundary fallback={<CanvasErrorFallback />}>
          <Suspense
            fallback={
              <ComponentLoader canvas className="h-full rounded-2xl" />
            }
          >
            <EarthCanvas />
          </Suspense>
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
