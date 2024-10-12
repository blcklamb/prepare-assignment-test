interface SlideContentProps {
  src: string;
  index: number;
}
export default function SlideContent({ src, index }: SlideContentProps) {
  return (
    <div className="relative h-fit w-fit">
      <div className="absolute top-8 left-8 text-3xl font-bold flex flex-col text-white">
        {index}
      </div>
      <img
        src={src}
        alt={`carousel image - ${index}`}
        className="rounded-[8px] !object-cover"
      />
    </div>
  );
}
