import { TouchEvent, useState } from "react";
import Carousel from "./carousel";
import SlideContent from "./slide-content";

const getTouches = (e: TouchEvent<HTMLDivElement>) => {
  return (
    e.touches || e.targetTouches // browser API
  );
};

interface CarouselContainerProps {
  images: string[];
}

interface CurrentCarousel {
  targetSlideIndex: number;
  xDown: number | null;
  yDown: number | null;
}

export default function CarouselContainer({ images }: CarouselContainerProps) {
  const [currentCarousel, setCurrentCarousel] = useState<CurrentCarousel>({
    targetSlideIndex: 0,
    xDown: null,
    yDown: null,
  });

  const slides = images.map((image, index) => {
    return {
      key: index,
      content: <SlideContent src={image} index={index} />,
      onClick: () =>
        setCurrentCarousel((prev) => {
          return { ...prev, targetSlideIndex: index };
        }),
    };
  });

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const firstTouch = getTouches(e)[0];

    setCurrentCarousel((prev) => {
      return {
        ...prev,
        xDown: firstTouch?.clientX || null,
        yDown: firstTouch?.clientY || null,
      };
    });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!currentCarousel.xDown && !currentCarousel.yDown) {
      return;
    }

    const { clientX, clientY } = e.touches.item(0);

    const xDiff = (currentCarousel.xDown || 0) - clientX;
    const yDiff = (currentCarousel.yDown || 0) - clientY;

    // Check if movement is mostly horizontal
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // Horizontal movement
      if (xDiff > 0) {
        /* left swipe */
        setCurrentCarousel((prev) => ({
          ...prev,
          targetSlideIndex: (prev.targetSlideIndex + 1) % slides.length,
          xDown: null,
          yDown: null,
        }));
      } else {
        /* right swipe */
        setCurrentCarousel((prev) => ({
          ...prev,
          targetSlideIndex: prev.targetSlideIndex - 1 + slides.length,
          xDown: null,
          yDown: null,
        }));
      }
    }
  };

  return (
    <div className="max-w-screen-pc w-full overflow-x-hidden">
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="mx-auto my-0 h-[480px] w-4/5"
      >
        <Carousel
          slides={slides}
          currentTargetSlideIndex={currentCarousel.targetSlideIndex}
        />
      </div>
    </div>
  );
}
