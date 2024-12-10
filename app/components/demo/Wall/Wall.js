import React from "react";
import * as THREE from "three";

const Wall = () => {
  const height = 2; // Wall height
  const depth = 1.0; // Wall depth (thickness)

  // Extrusion settings
  const extrudeSettings = {
    depth: depth,
    bevelEnabled: true,
  };

  // const createWallShape = (length) => {
  //   const shape = new THREE.Shape();
  //   shape.moveTo(0, 0); // Starting point
  //   shape.lineTo(4, 0); // Bottom edge
  //   shape.lineTo(5, 1); // Right edge
  //   shape.lineTo(0, 1); // Top edge
  //   shape.lineTo(-1, 0.5); // Top edge
  //   shape.lineTo(0, 0); // Close the shape
  //   return shape;
  // };
  // Function to create a rectangular wall shape
  const createWallShape = (length) => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // Starting point
    shape.lineTo(4, 0); // Bottom edge
    shape.lineTo(5, 1); // Right edge
    shape.lineTo(0, 1); // Top edge
    shape.lineTo(0, 0); // Close the shape
    return shape;
  };

  // Create geometries for two walls
  const wall1Geometry = new THREE.ExtrudeGeometry(createWallShape(4), extrudeSettings);


  return (
    <>
      {/* Wall 1 */}
      <mesh geometry={wall1Geometry} position={[0, 0, 0]} >
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  );
};

export default Wall;
