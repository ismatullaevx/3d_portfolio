/**
 * Barrel limited to above-the-fold shell to preserve code splitting
 * for sections imported via React.lazy in App.jsx.
 */
import Hero from "./Hero";
import Navbar from "./Navbar";
import ComponentLoader from "./ComponentLoader";
import ErrorBoundary from "./ErrorBoundary";
import CanvasErrorFallback from "./CanvasErrorFallback";

export {
  Hero,
  Navbar,
  ComponentLoader,
  ErrorBoundary,
  CanvasErrorFallback,
};
