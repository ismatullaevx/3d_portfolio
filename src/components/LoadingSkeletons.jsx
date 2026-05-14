import React from "react";

const lineWidths = ["w-28", "w-64 max-w-full", "w-full", "w-5/6"];

export const SkeletonBlock = ({ className = "" }) => (
  <div className={`skeleton-shimmer ${className}`} aria-hidden="true" />
);

export const CanvasLoadingState = ({
  className = "",
  label = "Loading scene",
  compact = false,
}) => (
  <div
    className={`canvas-loading-state ${className}`}
    role="status"
    aria-live="polite"
  >
    <span className="canvas-loading-ring" aria-hidden="true" />
    {!compact && <span className="canvas-loading-label">{label}</span>}
  </div>
);

export const ProjectCardSkeleton = () => (
  <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full shadow-card">
    <SkeletonBlock className="w-full h-[230px] rounded-2xl" />
    <div className="mt-5 space-y-3">
      <SkeletonBlock className="h-7 w-3/5 rounded-md" />
      <SkeletonBlock className="h-4 w-full rounded-md" />
      <SkeletonBlock className="h-4 w-11/12 rounded-md" />
      <SkeletonBlock className="h-4 w-4/5 rounded-md" />
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      <SkeletonBlock className="h-5 w-16 rounded-full" />
      <SkeletonBlock className="h-5 w-20 rounded-full" />
      <SkeletonBlock className="h-5 w-14 rounded-full" />
    </div>
  </div>
);

export const TechBallSkeleton = () => (
  <div className="w-28 h-28 rounded-full bg-tertiary/80 shadow-card flex items-center justify-center">
    <SkeletonBlock className="w-20 h-20 rounded-full" />
  </div>
);

export const HeroContentSkeleton = () => (
  <div className="space-y-4" aria-hidden="true">
    <SkeletonBlock className="h-16 sm:h-20 lg:h-24 w-[min(620px,80vw)] rounded-xl" />
    <SkeletonBlock className="h-8 sm:h-10 w-[min(500px,72vw)] rounded-lg" />
  </div>
);

const SectionHeaderSkeleton = ({ centered = false }) => (
  <div className={centered ? "flex flex-col items-center" : ""}>
    <SkeletonBlock className="h-5 w-32 rounded-md" />
    <SkeletonBlock className="mt-3 h-12 sm:h-16 w-72 max-w-full rounded-xl" />
  </div>
);

const TextSkeleton = ({ lines = 4 }) => (
  <div className="mt-5 space-y-3 max-w-3xl">
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonBlock
        key={index}
        className={`h-4 rounded-md ${lineWidths[index % lineWidths.length]}`}
      />
    ))}
  </div>
);

export const SectionSkeleton = ({ variant = "default" }) => {
  if (variant === "tech") {
    return (
      <section className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto min-h-[420px]">
        <SectionHeaderSkeleton centered />
        <div className="flex flex-row flex-wrap justify-center gap-10 mt-20">
          {Array.from({ length: 8 }).map((_, index) => (
            <TechBallSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (variant === "projects") {
    return (
      <section className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto min-h-[760px]">
        <SectionHeaderSkeleton />
        <TextSkeleton lines={4} />
        <div className="mt-20 flex flex-wrap gap-7 justify-center">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (variant === "contact") {
    return (
      <section className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto min-h-[650px]">
        <div className="xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
          <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
            <SectionHeaderSkeleton />
            <div className="mt-12 flex flex-col gap-8">
              <SkeletonBlock className="h-[58px] rounded-lg" />
              <SkeletonBlock className="h-[58px] rounded-lg" />
              <SkeletonBlock className="h-[190px] rounded-lg" />
              <SkeletonBlock className="h-12 w-32 rounded-xl" />
            </div>
          </div>
          <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
            <CanvasLoadingState className="h-full rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto min-h-[480px]">
      <SectionHeaderSkeleton />
      <div className="mt-10 grid min-[1000px]:grid-cols-[1fr_320px] gap-10 items-center">
        <TextSkeleton lines={7} />
        <SkeletonBlock className="xs:w-[280px] w-full h-[280px] rounded-[20px]" />
      </div>
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock
            key={index}
            className="xs:w-[250px] w-full h-[280px] rounded-[20px]"
          />
        ))}
      </div>
    </section>
  );
};
