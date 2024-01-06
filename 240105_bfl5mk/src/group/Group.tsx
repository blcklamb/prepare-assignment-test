import { useRef } from "react";
import * as THREE from "three";
import Emoji from "../components/Emoji";

const Group = () => {
  const groupRef = useRef<THREE.Group>(null);
  return (
    <group ref={groupRef}>
      <Emoji />
    </group>
  );
};

export default Group;
