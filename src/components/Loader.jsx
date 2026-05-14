import { Html, useProgress } from "@react-three/drei";
import { CanvasLoadingState } from "./LoadingSkeletons";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center>
      <CanvasLoadingState
        compact={progress >= 98}
        label={`${Math.round(progress)}%`}
        className="min-w-[140px] min-h-[120px] rounded-2xl"
      />
    </Html>
  );
};

export default CanvasLoader;
