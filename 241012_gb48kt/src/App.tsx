import { SAMPLE_IMAGES } from "./assets/image-constants";
import CarouselContainer from "./components/carousel-container";

function App() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="py-16 text-4xl">3D carousel demo</div>
      <CarouselContainer images={SAMPLE_IMAGES} />
    </div>
  );
}

export default App;
