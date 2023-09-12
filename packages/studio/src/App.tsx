import { Stage } from "@pixi/react";
import { Grids } from "./Visuals/Grids";

function App() {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{ autoDensity: true, background: 0x333333 }}
    >
      <Grids />
    </Stage>
  );
}

export default App;
