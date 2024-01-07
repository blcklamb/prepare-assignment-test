import { useRef } from "react";
import * as THREE from "three";
import Emoji from "../components/Emoji";
import { getRandomNumberInRange } from "../utils/random";
import { useFrame } from "@react-three/fiber";

const Group = () => {
  const groupRef = useRef<THREE.Group>(null);

  const EMOJI_NAME = [
    "heartEyes",
    "wink",
    "happy",
    "grateful",
    "smile",
    "angry",
    "boring",
    "heart",
    "snowFlake",
    "skull",
    "robot",
    "poop",
    "ghost",
  ];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {EMOJI_NAME.map((ele) => {
        return (
          <Emoji
            key={ele}
            position={{
              x: getRandomNumberInRange(-5, 5),
              y: getRandomNumberInRange(-5, 5),
              z: getRandomNumberInRange(-5, 5),
            }}
            src={ele}
          />
        );
      })}
    </group>
  );
};

export default Group;
