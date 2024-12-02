import React from "react";
import * as THREE from "three";

const Wall = () => {
  const height = 2; // Wall height
  const depth = 0.2; // Wall depth (thickness)

  // Extrusion settings
  const extrudeSettings = {
    depth: depth,
    bevelEnabled: false,
  };

  // Function to create a rectangular wall shape
  const createWallShape = (length) => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // Starting point
    shape.lineTo(length, 0); // Bottom edge
    shape.lineTo(length, height); // Right edge
    shape.lineTo(0, height); // Top edge
    shape.lineTo(0, 0); // Close the shape
    return shape;
  };

  // Create geometries for two walls
  const wall1Geometry = new THREE.ExtrudeGeometry(createWallShape(4), extrudeSettings);
  const wall2Geometry = new THREE.ExtrudeGeometry(createWallShape(4), extrudeSettings);

  // Create edges for both walls
  const wall1Edges = new THREE.EdgesGeometry(wall1Geometry);
  const wall2Edges = new THREE.EdgesGeometry(wall2Geometry);

  return (
    <>
      {/* Wall 1 */}
      <mesh geometry={wall1Geometry} position={[0, 0, 0]}>
        <meshStandardMaterial color="gray" />
      </mesh>
      <lineSegments geometry={wall1Edges} position={[0, 0, 0]}>
        <lineBasicMaterial color="black" />
      </lineSegments>

      {/* Wall 2 */}
      <mesh geometry={wall2Geometry} position={[0, 0, 0]} rotation={[0, Math.PI * 0.5, 0]}>
        <meshStandardMaterial color="gray" />
      </mesh>
      <lineSegments geometry={wall2Edges} position={[0, 0, 0]} rotation={[0, Math.PI * 0.5, 0]}>
        <lineBasicMaterial color="black" />
      </lineSegments>
    </>
  );
};

export default Wall;
