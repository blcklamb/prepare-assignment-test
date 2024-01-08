import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Emoji from "../components/Emoji";
// import { getRandomNumberInRange } from "../utils/random";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

const Group = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<CameraControls>(null);

  const [disableAutoRotate, setDisableAutoRotate] = useState<boolean>(false);

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

  const initialPositions = useMemo(() => {
    const randomPositions = new Array(EMOJI_NAME.length * 3);

    for (let i = 0; i < EMOJI_NAME.length * 3; i++) {
      randomPositions[i] = (Math.random() - 0.5) * 10;
    }
    return randomPositions;
  }, [EMOJI_NAME.length]);

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
        ref={cameraRef}
        enabled={true}
        dollyToCursor={false}
        onStart={() => {
          setDisableAutoRotate(true);
        }}
        onEnd={() => {
          setDisableAutoRotate(false);
        }}
      />
      {EMOJI_NAME.map((ele, idx) => {
        return (
          <Emoji
            key={ele}
            position={positions.slice(idx * 3, idx * 3 + 3)}
            src={ele}
          />
        );
      })}
    </group>
  );
};

export default Group;
