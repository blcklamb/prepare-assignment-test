import { SpringValue, config, useSpring } from "@react-spring/three";
import { useEffect, useState } from "react";

export const useRandomAnimation = (triggerFlag: boolean) => {
  const [scale, setScale] = useState<SpringValue | undefined>(undefined);
  const [rotationY, setRotationY] = useState<SpringValue | undefined>(
    undefined
  );
  const [rotationZ, setRotationZ] = useState<SpringValue | undefined>(
    undefined
  );

  const { scale: scale01 } = useSpring({
    scale: triggerFlag ? 1.2 : 1,
    config: config.wobbly,
  });
  const { scale: scale02 } = useSpring({
    scale: triggerFlag ? 0.8 : 1,
    config: config.slow,
  });
  const { rotation: rotation01 } = useSpring({
    rotation: triggerFlag ? Math.PI * 2 : 0,
    config: config.wobbly,
  });
  const { rotation: rotation02 } = useSpring({
    rotation: triggerFlag ? Math.PI : 0,
    config: config.slow,
  });

  useEffect(() => {
    if (triggerFlag) {
      setScale(Math.round(Math.random()) >= 1 ? scale01 : scale02);
      setRotationY(Math.round(Math.random()) >= 1 ? rotation01 : rotation02);
      setRotationZ(Math.round(Math.random()) >= 1 ? rotation01 : rotation02);
    }
  }, [triggerFlag, scale01, scale02, rotation01, rotation02]);

  return [scale, rotationY, rotationZ];
};
