import Carousel from "./carousel";
import SlideContent from "./slide-content";

interface CarouselContainerProps {
  images: string[];
}

export default function CarouselContainer({ images }: CarouselContainerProps) {
  const slides = images.map((image, index) => {
    return {
      key: index,
      content: <SlideContent src={image} index={index} />,
      onClick: () => console.log(`${index} clicked`),
    };
  });

  return (
    <div className="max-w-screen-pc w-full overflow-x-hidden">
      <div className="mx-auto my-0 h-[480px] w-4/5">
        <Carousel slides={slides} />
      </div>
    </div>
  );
}
