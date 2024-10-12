import { useEffect, useRef, useState } from "react";
import { NavigationButton } from "./navigate-button";

const DEFAULT_GO_TO_SLIDE_DELAY = 100;

interface CarouselProps {
  currentTargetSlideIndex: number;
  slides: { key: number; onClick: () => void; content: JSX.Element }[];
}

interface CarouselMovement {
  index: number;
  targetSlideIndex: number | null;
  prevPropsTargetSlideIndex: number;
  newSlide: boolean;
}

function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

export default function Carousel({
  slides,
  currentTargetSlideIndex,
}: CarouselProps) {
  const [carouselMovement, setCarouselMovement] = useState<CarouselMovement>({
    index: 0,
    targetSlideIndex: currentTargetSlideIndex,
    prevPropsTargetSlideIndex: 0,
    newSlide: false,
  });

  const goToIn = useRef<number>();

  const modBySlidesLength = (index: number): number => {
    return mod(index, slides.length);
  };

  const getShortestDirection = (from: number, to: number): -1 | 0 | 1 => {
    if (from > to) {
      if (from - to > slides.length - 1 - from + to) {
        return 1;
      }
      return -1;
    } else if (to > from) {
      if (to - from > from + slides.length - 1 - to) {
        return -1;
      }
      return 1;
    }
    return 0;
  };

  const handleTargetSlideIndex = () => {
    if (typeof carouselMovement.targetSlideIndex !== "number") {
      return;
    }

    const { index } = carouselMovement;

    const currentTargetSlideIndex = mod(
      carouselMovement.targetSlideIndex,
      slides.length
    );

    if (currentTargetSlideIndex !== index) {
      const direction = getShortestDirection(index, currentTargetSlideIndex);
      const isFinished =
        modBySlidesLength(index + direction) === currentTargetSlideIndex;

      setCarouselMovement((prev) => {
        return {
          ...prev,
          index: modBySlidesLength(index + direction),
          newSlide: isFinished,
          targetSlideIndex: isFinished ? null : currentTargetSlideIndex,
        };
      });
    }
  };

  useEffect(() => {
    const { index, targetSlideIndex, prevPropsTargetSlideIndex, newSlide } =
      carouselMovement;
    // getDerivedStateFromProps
    if (currentTargetSlideIndex !== prevPropsTargetSlideIndex) {
      setCarouselMovement((prev) => {
        return {
          ...prev,
          targetSlideIndex: currentTargetSlideIndex ?? null,
          prevPropsTargetSlideIndex: currentTargetSlideIndex ?? 0,
          newSlide: true,
        };
      });
    }
    // componentDidUpdate
    if (typeof targetSlideIndex === "number") {
      if (newSlide) {
        handleTargetSlideIndex();
      } else if (index !== targetSlideIndex) {
        goToIn.current = window.setTimeout(
          handleTargetSlideIndex,
          DEFAULT_GO_TO_SLIDE_DELAY
        );
      }
    }
    // componentWillUnmount
    return () => window.clearTimeout(goToIn.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselMovement, currentTargetSlideIndex]);

  return (
    <div className="relative flex h-full flex-col">
      <div className="h-full w-full">
        {slides.map((slide: CarouselProps["slides"][number]) => (
          <>{slide.content}</>
        ))}
      </div>
      <div className="max-pc:hidden absolute flex h-full w-full items-center justify-between">
        <NavigationButton
          type="prev"
          onClick={() => console.log("prev clicked")}
        />
        <NavigationButton
          type="next"
          onClick={() => console.log("next clicked")}
        />
      </div>
    </div>
  );
}
