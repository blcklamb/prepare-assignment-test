import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Emoji from "../components/Emoji";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { EmojiModelProps } from "../types/Emoji";
import { getRandomNumberInRange } from "../utils/random";

const EMOJI_NAME: EmojiModelProps["src"][] = [
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

const COUNT = 300;

const Group = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<CameraControls>(null);

  const [disableAutoRotate, setDisableAutoRotate] = useState<boolean>(false);

  const EMOJI_ARRAY = useMemo(() => {
    const emojis: EmojiModelProps["src"][] = [];
    for (let i = 0; i < COUNT; i++) {
      emojis.push(EMOJI_NAME[i % EMOJI_NAME.length]);
    }
    return emojis;
  }, []);

  const initialPositions = useMemo(() => {
    const randomPositions = new Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      randomPositions[i] = getRandomNumberInRange(-5, 5);
    }
    return randomPositions;
  }, []);

  const [positions, setPositions] = useState<number[]>(initialPositions);

  useEffect(() => {
    if (!disableAutoRotate) {
      setPositions(initialPositions);
    }
  }, [disableAutoRotate, initialPositions]);

  useEffect(() => {
    cameraRef.current?.setTarget(0, 0, 0, true);
  }, []);

  useFrame((_, delta) => {
    if (cameraRef.current && !disableAutoRotate) {
      cameraRef.current.azimuthAngle -= THREE.MathUtils.degToRad(5 * delta);
    }
  });

  return (
    <group ref={groupRef}>
      <CameraControls
        maxDistance={10}
        ref={cameraRef}
        enabled={true}
        dollySpeed={1}
        onStart={() => setDisableAutoRotate(true)}
        onEnd={() => setDisableAutoRotate(false)}
      />
      {EMOJI_ARRAY.map((ele, idx) => {
        return (
          <Emoji
            key={ele + idx}
            position={positions.slice(idx * 3, idx * 3 + 3)}
            src={ele}
          />
        );
      })}
    </group>
  );
};

export default Group;
