import { BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";

import { Navbar, Hero } from "./components";
import ComponentLoader from "./components/ComponentLoader";

const About = lazy(() => import("./components/About"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const CV = lazy(() => import("./components/CV"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          
          <Suspense fallback={<ComponentLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<ComponentLoader />}>
            <Tech />
          </Suspense>

          <Suspense fallback={<ComponentLoader />}>
            <Works />
          </Suspense>

          <Suspense fallback={<ComponentLoader />}>
            <CV />
          </Suspense>

          <div className="relative z-0">
            <Suspense fallback={<ComponentLoader />}>
              <Contact />
            </Suspense>
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
          </div>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
};

export default App;
