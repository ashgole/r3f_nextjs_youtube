'use client'
import { Environment, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import React from "react";
import Player from "../player/Player";
import UI from "../UI/UI";

const CanvasComponent = () => {
  return (
    <div className="h-screen w-full">
      <Canvas className="h-full w-full" camera={[]}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <PerspectiveCamera makeDefault position={[0, 1.4, 1.5]} fov={45} />
          <Environment background={true} preset='city' />
          <color args={["green"]} attach="background" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <Player />
          {/* fixed bottom-2 left-1/2 transform -translate-x-1/2 */}
        </Suspense>
      </Canvas>
      <UI />
    </div>
  );
};

export default CanvasComponent;