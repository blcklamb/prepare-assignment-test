import { useState } from "react";
import Carousel from "./carousel";
import SlideContent from "./slide-content";

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

  return (
    <div className="max-w-screen-pc w-full overflow-x-hidden">
      <div className="mx-auto my-0 h-[480px] w-4/5">
        <Carousel
          slides={slides}
          currentTargetSlideIndex={currentCarousel.targetSlideIndex}
        />
      </div>
    </div>
  );
}
