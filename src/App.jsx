import { BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";

import { Navbar, Hero, ErrorBoundary, ComponentLoader, CanvasErrorFallback } from "./components";

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
      <ErrorBoundary>
        <MotionConfig reducedMotion="user">
          <div className="relative z-0 bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Navbar />
              <ErrorBoundary>
                <Hero />
              </ErrorBoundary>
            </div>
            
            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader />}>
                <About />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader />}>
                <Tech />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader />}>
                <Works />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader />}>
                <CV />
              </Suspense>
            </ErrorBoundary>

            <div className="relative z-0">
              <ErrorBoundary>
                <Suspense fallback={<ComponentLoader />}>
                  <Contact />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary fallback={<CanvasErrorFallback />}>
                <Suspense fallback={null}>
                  <StarsCanvas />
                </Suspense>
              </ErrorBoundary>
            </div>

            <ErrorBoundary>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </ErrorBoundary>
          </div>
        </MotionConfig>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
