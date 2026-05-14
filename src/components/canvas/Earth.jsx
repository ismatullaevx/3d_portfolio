import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      shadows={!isLowEnd}
      frameloop={isLowEnd || shouldReduceMotion || isMobile ? "demand" : "always"}
      dpr={isLowEnd || isMobile ? 1 : [1, 1.5]}
      gl={{ powerPreference: "high-performance", antialias: !isMobile }}
      camera={{ fov: isMobile ? 52 : 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={!shouldReduceMotion && !isLowEnd && !isMobile}
          enableZoom={false}
          enablePan={false}
          enableDamping={!isMobile}
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
