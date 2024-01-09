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
        {/* <axesHelper args={[6]} /> */}
        {/* <gridHelper args={[10, 10]} /> */}
        <Group />
      </Canvas>
    </>
  );
}

export default App;
