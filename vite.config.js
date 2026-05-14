import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "motion-vendor";
          if (
            id.includes("three") ||
            id.includes("@react-three") ||
            id.includes("maath")
          ) {
            return "three-vendor";
          }
          if (
            id.includes("react-dom") ||
            id.includes("/react/") ||
            id.includes("react-router")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
