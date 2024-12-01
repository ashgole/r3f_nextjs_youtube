'use client'
import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import React from "react";
import Player from "../player/Player";

const CanvasComponent = () => {
  return (
    <div className="h-screen w-full">
      <Canvas className="h-full w-full">
        <Suspense fallback={<Html>Loading...</Html>}>
          <Environment background={true} preset='city' />
          <color args={["green"]} attach="background" />
          <OrbitControls enableZoom={true} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <Player />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasComponent;