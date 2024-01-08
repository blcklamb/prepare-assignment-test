import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { EmojiModelProps } from "../types/Emoji";
import { convertNameToPath } from "../utils/emojiModel";
import { useTexture } from "@react-three/drei";

const Emoji = ({ position, src }: EmojiModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { x, y, z } = position;

  const {
    nodes,
    scene,
  }: { nodes: { [name: string]: THREE.Mesh }; scene: THREE.Scene } = useLoader(
    GLTFLoader,
    convertNameToPath(src)
  );
  const matcap = useTexture(`./images/matcap4.jpeg`);

  Object.values(nodes).forEach((node) => {
    if (node instanceof THREE.Mesh) {
      node.material = new THREE.MeshMatcapMaterial({ matcap: matcap });
    }
  });
  scene.overrideMaterial = new THREE.MeshMatcapMaterial({ matcap: matcap });

  const [isHovered, setIsHovered] = useState(false);
  const { scale } = useSpring({
    scale: isHovered ? 1.2 : 1,
    config: config.wobbly,
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <animated.group scale={scale} position={[x, y, z]}>
        <primitive object={scene} />
      </animated.group>
    </group>
  );
};

export default Emoji;
