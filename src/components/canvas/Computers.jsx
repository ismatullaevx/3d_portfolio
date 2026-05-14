import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import useReducedMotion from "../../hooks/useReducedMotion";
import { useIsLowEnd } from "../../context/PerformanceContext.jsx";

useGLTF.preload("./desktop_pc/scene.gltf");

const Computers = ({ isMobile, isTablet }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const isLowEnd = useIsLowEnd();
  const scale = isMobile ? 0.52 : isTablet ? 0.62 : 0.75;
  const position = isMobile
    ? [0, -3.05, -2.7]
    : isTablet
      ? [0, -3.15, -2.05]
      : [0, -3.25, -1.5];

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow={!isLowEnd}
        shadow-mapSize={isLowEnd ? 256 : 1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.4, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isLowEnd = useIsLowEnd();

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const tabletQuery = window.matchMedia("(max-width: 1024px)");

    const update = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
    };

    update();
    mobileQuery.addEventListener("change", update);
    tabletQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      tabletQuery.removeEventListener("change", update);
    };
  }, []);

  const frameloop =
    isLowEnd || shouldReduceMotion || isMobile ? "demand" : "always";

  return (
    <Canvas
      frameloop={frameloop}
      shadows={!isLowEnd}
      dpr={isLowEnd || isMobile ? 1 : [1, 1.5]}
      camera={{ position: isMobile ? [18, 3, 6] : [20, 3, 5], fov: isMobile ? 31 : 25 }}
      gl={{ powerPreference: "high-performance", antialias: !isMobile }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={!shouldReduceMotion && !isLowEnd && !isMobile}
          autoRotateSpeed={isTablet ? 0.35 : 0.5}
          enableZoom={false}
          enablePan={false}
          enableDamping={!isMobile}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} isTablet={isTablet} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
