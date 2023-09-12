import { Container, Stage } from "@pixi/react";
import { Grids } from "./Visuals/Grids";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

function App() {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{ autoDensity: true, background: 0x333333 }}
    >
      <Container
        pivot={[CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2]}
        position={[window.innerWidth / 2, window.innerHeight / 2]}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      >
        <Grids />
      </Container>
    </Stage>
  );
}

export default App;
