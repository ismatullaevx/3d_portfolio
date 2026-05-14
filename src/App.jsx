import { BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";

import { Navbar, Hero, ErrorBoundary, ComponentLoader, CanvasErrorFallback } from "./components";
import DeferredStarsCanvas from "./components/DeferredStarsCanvas.jsx";
import SEO from "./components/SEO.jsx";

const About = lazy(() => import("./components/About"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const CV = lazy(() => import("./components/CV"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => {
  return (
    <BrowserRouter>
      <SEO />
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
              <Suspense fallback={<ComponentLoader variant="about" />}>
                <About />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader variant="tech" />}>
                <Tech />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader variant="projects" />}>
                <Works />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<ComponentLoader variant="cv" />}>
                <CV />
              </Suspense>
            </ErrorBoundary>

            <div className="relative z-0">
              <ErrorBoundary>
                <Suspense fallback={<ComponentLoader variant="contact" />}>
                  <Contact />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary fallback={<CanvasErrorFallback />}>
                <DeferredStarsCanvas />
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
