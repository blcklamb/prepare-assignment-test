import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animated } from "@react-spring/three";
import { EmojiModelProps } from "../types/Emoji";
import { convertNameToPath } from "../utils/emojiModel";
import { useTexture } from "@react-three/drei";
import { getRandomIntegerInRange } from "../utils/random";
import { useRandomAnimation } from "../hooks/useRandomAnimation";

const Emoji = ({ position, src }: EmojiModelProps) => {
  const [x, y, z] = position;
  const animatedGroupRef = useRef<THREE.Group>(null);

  const frameIdRef = useRef<number>();

  const updateLookAt = useCallback(() => {
    if (animatedGroupRef.current) {
      animatedGroupRef.current.lookAt(x * 2, y * 2, z * 2);
    } else {
      frameIdRef.current = requestAnimationFrame(updateLookAt);
    }
  }, [animatedGroupRef, x, y, z]);

  useEffect(() => {
    let frameId: number;
    updateLookAt();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [updateLookAt]);

  // model loader, render
  const loader = useMemo(() => new GLTFLoader(), []);
  const [scene, setScene] = useState<THREE.Group | THREE.Scene | null>(null);
  const textureNum = useMemo(() => getRandomIntegerInRange(1, 5), []);
  const matcap = useTexture(`./images/matcap${textureNum}.jpeg`);

  useEffect(() => {
    const material = new THREE.MeshMatcapMaterial({ matcap: matcap });
    loader.load(convertNameToPath(src), (gltf) => {
      gltf.scene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.material = material;
        }
      });
      setScene(gltf.scene);
    });
  }, [loader, src, matcap]);

  // hover event animation
  const [isHovered, setIsHovered] = useState(false);
  const [scale, rotationY, rotationZ] = useRandomAnimation(isHovered);

  if (!scene) return null;
  return (
    <group
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <animated.group
        ref={animatedGroupRef}
        scale={scale}
        position={[x, y, z]}
        rotation-z={rotationY}
        rotation-y={rotationZ}
      >
        <primitive object={scene} />
      </animated.group>
    </group>
  );
};

export default Emoji;
