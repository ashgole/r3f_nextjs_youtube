'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

const DraggableBox = () => {
  const meshRef = useRef();
  const handleClick = () => alert('Clicked!');

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onClick={handleClick}
      onPointerOver={(e) => (e.object.material.color.set('hotpink'))}
      onPointerOut={(e) => (e.object.material.color.set('orange'))}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const CurrentApp = () => (
  <>
    <ambientLight />
    <OrbitControls />
    <DraggableBox />
    <Html center>
      <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-2 rounded">
        Click Me
      </button>
    </Html>
  </>
);

export default CurrentApp;
