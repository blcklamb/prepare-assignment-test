import { NavigationButton } from "./navigate-button";

interface CarouselProps {
  slides: { key: number; onClick: () => void; content: JSX.Element }[];
}

export default function Carousel({ slides }: CarouselProps) {
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
