import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import CanvasLoader from "../Loader";
import useReducedMotion from "../../hooks/useReducedMotion";
import { useIsLowEnd } from "../../context/PerformanceContext.jsx";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const shouldReduceMotion = useReducedMotion();
  const isLowEnd = useIsLowEnd();

  return (
    <Canvas
      shadows={!isLowEnd}
      frameloop="demand"
      dpr={isLowEnd ? 1 : [1, 1.5]}
      gl={{ powerPreference: "high-performance" }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={!shouldReduceMotion}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
