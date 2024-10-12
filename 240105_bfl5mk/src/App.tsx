import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Group from "./group/Group";
import { Suspense } from "react";
import { Loading } from "./components/Loading";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Canvas>
          <color attach="background" args={["black"]} />
          <OrbitControls />
          <Group />
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
