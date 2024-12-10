'use client'
import { Environment, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import React from "react";
import Wall from "../demo/Wall/Wall";

const CanvasComponent = () => {
  return (
    <div className="h-screen w-full">
      <Canvas className="h-full w-full" camera={[]}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <Environment background={true} preset='city' />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
          <color args={["green"]} attach="background" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <gridHelper args={[10, 10]} />
          <Wall />
        </Suspense>
      </Canvas>
      {/* <UI /> */}
    </div>
  );
};

export default CanvasComponent;