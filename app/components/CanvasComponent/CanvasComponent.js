'use client'
import { Environment, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import React from "react";
import CurrentApp from "../Project2_Data_Visualization/Axes";
import Player from "../Project1_Talking_Person_AI/player/Player";
import UI from "../Project1_Talking_Person_AI/UI/UI";
<<<<<<< HEAD
import Wall from "../demo/Wall/Wall";
=======
>>>>>>> 8057a62a49e5a630c4f77d7ba777d4f5b050c062

const CanvasComponent = () => {
  return (
    <div className="h-screen w-full">
      <Canvas className="h-full w-full" camera={[]}>
        <Suspense fallback={<Html>Loading...</Html>}>
          <Environment background={true} preset='city' />
          <OrbitControls
<<<<<<< HEAD
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
=======
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
              />
          <color args={["green"]} attach="background" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 5]} />
          <Player/>
        </Suspense>
      </Canvas>
          <UI/>
>>>>>>> 8057a62a49e5a630c4f77d7ba777d4f5b050c062
    </div>
  );
};

export default CanvasComponent;