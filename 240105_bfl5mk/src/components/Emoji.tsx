import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { EmojiModelProps } from "../types/Emoji";
import { convertNameToPath } from "../utils/emojiModel";

const Emoji = ({ position, src }: EmojiModelProps) => {
  const { x, y, z } = position;

  const gltf = useLoader(GLTFLoader, convertNameToPath(src));

  const { raycaster } = useThree();
  const intersects = raycaster.intersectObjects(gltf.scene.children);

  const [isHovered, setIsHovered] = useState(false);
  const { scale } = useSpring({
    scale: isHovered ? 1.2 : 1,
    config: config.wobbly,
  });

  useEffect(() => {
    if (intersects.length > 0) {
      const obj = intersects[0].object as THREE.Mesh;
      const material = obj.material as THREE.MeshStandardMaterialParameters;
      material.color = new THREE.Color("#C7A44B");
    }
  }, [intersects]);

  return (
    <group
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <animated.group scale={scale} position={[x, y, z]}>
        <primitive object={gltf.scene} />
      </animated.group>
    </group>
  );
};

export default Emoji;
