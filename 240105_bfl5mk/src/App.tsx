import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Group from "./group/Group";

function App() {
  return (
    <>
      <Canvas>
        <color attach="background" args={["black"]} />
        <OrbitControls />
        <Group />
      </Canvas>
    </>
  );
}

export default App;
