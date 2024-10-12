import { useEffect } from "react";
import { animated, config, easings, useSpring } from "react-spring";

const DEFAULT_ANIMATION_CONFIG = config.gentle;
interface SlideProps {
  content: JSX.Element;
  onClick?: () => void;
  offsetRadius: number;
  index: number;
}

function getDefaultTranslateX(offsetFromCenter: number): number {
  // Define how much we want to shift per step, dynamically based on offsetRadius
  const leftStep = 30; // Step for negative (left side) values, i.e., -30 per step
  const rightStep = 0.3; // Step for positive (right side) values, i.e., 0.3 per step

  // Centered case
  if (offsetFromCenter === 0) return 0;

  // Left side (negative offsetFromCenter)
  if (offsetFromCenter < 0) {
    // Calculate dynamically for the left side based on offsetRadius
    return offsetFromCenter * leftStep; // -30 for -1, -60 for -2, and so on
  }

  // Right side (positive offsetFromCenter)
  if (offsetFromCenter > 0) {
    // Dynamically scale for the right side, this example uses linear growth for simplicity
    return offsetFromCenter * rightStep; // -0.3 for 1, -0.6 for 2, and so on
  }

  // Default fallback
  return 0;
}

export default function Slide({
  content,
  onClick,
  offsetRadius,
  index,
}: SlideProps) {
  const offsetFromCenter = index - offsetRadius;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  const [props, api] = useSpring(() => {
    const translateX = getDefaultTranslateX(offsetFromCenter);

    return {
      to: {
        opacity: distanceFactor * distanceFactor,
        transform: `translateX(${translateX}%) scale(${distanceFactor})`,
        left: "50%",
        top: "50%",
        config: { easing: easings.easeInBounce, ...DEFAULT_ANIMATION_CONFIG },
      },
    };
  }, []);

  useEffect(() => {
    const translateX = getDefaultTranslateX(offsetFromCenter);
    void api.start({
      opacity: distanceFactor * distanceFactor,
      transform: `translateX(${translateX}%) scale(${distanceFactor})`,
      left: "50%",
      top: "50%",
      config: DEFAULT_ANIMATION_CONFIG,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetRadius, offsetFromCenter, distanceFactor]);

  return (
    <animated.div
      style={{
        ...props,
        zIndex: Math.abs(Math.abs(offsetFromCenter) - offsetRadius) * 10,
      }}
      className="relative"
    >
      <div
        className="absolute flex h-full origin-center items-center justify-center [&_img]:object-scale-down"
        style={{
          top: "50%",
          transform: "translateY(-50%) translateX(-50%)",
        }}
        onClick={onClick}
      >
        {content}
      </div>
    </animated.div>
  );
}
