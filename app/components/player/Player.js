"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { talkingAtom } from "@/app/utils/jotai";
import { useAtom } from "jotai";

const Player = (props) => {
  const [isTalking, setIsTalking] = useAtom(talkingAtom)
  const { nodes, materials } = useGLTF("./models/avtar_morph.glb"); // Replace with your GLTF file path
  const phonemes = useRef({ open: 0, smile: 0 }); // Controls lip morph targets

  useEffect(() => {
    const sequence = [
      { open: 1.0,   duration: 300 }, // Open mouth
      { open: 0.5,   duration: 200 }, // Relax
      { open: 0, duration: 300 }, // Close
    ];

    let index = 0;
    const interval = setInterval(() => {
      // if(!isTalking){
      //   index=0
      //   clearInterval(interval)
      //   return
      // }
      // if (isTalking && index >= sequence.length) {
      //   index=0
      // }
      if ( index >= sequence.length) {
        index=0
      }
      const { open, smile } = sequence[index];
      phonemes.current = { open, smile };
      index++;
    }, sequence[index]?.duration || 300);

    return () => clearInterval(interval);
  }, [isTalking]);

  // Use frame to animate lips dynamically
  useFrame(() => {
    if (nodes?.Wolf3D_Head?.morphTargetInfluences) {
      const lips = nodes.Wolf3D_Head.morphTargetInfluences;
      lips[0] = phonemes.current.open; // Open mouth
    }
  });

  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
};

export default Player;
