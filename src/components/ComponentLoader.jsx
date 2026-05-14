import React from "react";
import { CanvasLoadingState, SectionSkeleton } from "./LoadingSkeletons";

const ComponentLoader = ({ variant = "default", canvas = false, className = "" }) =>
  canvas ? (
    <CanvasLoadingState className={className} />
  ) : (
    <SectionSkeleton variant={variant} />
  );

export default ComponentLoader;
