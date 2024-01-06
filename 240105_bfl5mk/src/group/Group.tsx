import { useRef } from "react";
import * as THREE from "three";
import HeartEyes from "../components/emojis/HeartEyes";

const Group = () => {
  const groupRef = useRef<THREE.Group>(null);
  return (
    <group ref={groupRef}>
      <HeartEyes />
    </group>
  );
};

export default Group;
