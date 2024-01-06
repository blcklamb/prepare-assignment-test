import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Group from "./group/Group";

function App() {
  return (
    <>
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [5, 5, 5],
        }}
      >
        <color attach="background" args={["white"]} />
        <OrbitControls />
        <axesHelper args={[6]} />
        <gridHelper args={[10, 10]} />
        <directionalLight position={[5, 5, 5]} />
        <Group />
      </Canvas>
    </>
  );
}

export default App;
