import React from "react";
import { motion } from "framer-motion";

const CanvasErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] p-6 text-center bg-black-100/20 backdrop-blur-sm rounded-2xl border border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mx-auto opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-white text-[18px] font-medium mb-2">
          3D experience unavailable
        </h3>
        <p className="text-secondary text-[14px] max-w-[250px] mx-auto leading-relaxed">
          This feature might be restricted by your device settings or hardware
          capabilities.
        </p>
      </motion.div>
    </div>
  );
};

export default CanvasErrorFallback;
