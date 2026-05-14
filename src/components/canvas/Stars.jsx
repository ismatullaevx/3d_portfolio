import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useMemo, useRef } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import useReducedMotion from "../../hooks/useReducedMotion";
import { useIsLowEnd } from "../../context/PerformanceContext.jsx";
import CanvasLoader from "../Loader";

const Stars = (props) => {
  const ref = useRef();
  const isLowEnd = useIsLowEnd();
  const shouldReduceMotion = useReducedMotion();

  const sphere = useMemo(
    () =>
      random.inSphere(new Float32Array(isLowEnd ? 1500 : 5001), {
        radius: 1.2,
      }),
    [isLowEnd]
  );

  useFrame((state, delta) => {
    if (!shouldReduceMotion) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const isLowEnd = useIsLowEnd();

  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={isLowEnd ? 1 : [1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
