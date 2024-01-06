import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";

const Emoji = () => {
  const circleRef = useRef<THREE.Mesh>(null);

  const circleControl = useControls({
    radius: { value: 1, min: 0.1, max: 10, step: 0.1 },
    seg: { value: 32, min: 1, max: 100, step: 1 },
    thetaStart: { value: 0, min: 0, max: 360, step: 0.1 },
    thetaLength: { value: 360, min: 0, max: 360, step: 0.1 },
  });

  const {
    radius: circleGUIRadius,
    seg: circleGUISeg,
    thetaStart: circleGUIThetaStart,
    thetaLength: circleGUIThetaLength,
  } = circleControl;

  return (
    <mesh ref={circleRef} position={[0, 0, 0]}>
      <circleGeometry
        args={[
          circleGUIRadius,
          circleGUISeg,
          THREE.MathUtils.degToRad(circleGUIThetaStart),
          THREE.MathUtils.degToRad(circleGUIThetaLength),
        ]}
      />
      <meshStandardMaterial wireframe color="transparent" />
    </mesh>
  );
};

export default Emoji;
