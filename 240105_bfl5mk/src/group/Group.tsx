import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Emoji from "../components/Emoji";
import { getRandomNumberInRange } from "../utils/random";
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

  useEffect(() => {
    cameraRef.current?.setTarget(0, 0, 0, true);
  });

  useFrame((_, delta) => {
    if (cameraRef.current && !disableAutoRotate) {
      cameraRef.current.azimuthAngle += THREE.MathUtils.degToRad(20 * delta);
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
          console.log("start");
        }}
        onEnd={() => {
          setDisableAutoRotate(false);
          console.log("end");
        }}
      />
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
