import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";
import useReducedMotion from "../../hooks/useReducedMotion";
import ModernImage from "../ModernImage";
import { useIsLowEnd } from "../../context/PerformanceContext.jsx";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Float
      speed={shouldReduceMotion ? 0 : 1.75}
      rotationIntensity={shouldReduceMotion ? 0 : 1}
      floatIntensity={shouldReduceMotion ? 0 : 2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);
  const isLowEnd = useIsLowEnd();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  const shouldReduceMotion = useReducedMotion();

  if (isMobile || shouldReduceMotion || isLowEnd) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#fff8eb] shadow-card">
        <ModernImage src={icon} alt="ball" className="h-12 w-12 object-contain xs:h-14 xs:w-14 sm:h-16 sm:w-16" />
      </div>
    );
  }

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance", antialias: false }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
