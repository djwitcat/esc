import * as PIXI from "pixi.js";
import { Viewport } from "./Viewport";
import { MainContainer } from "./MainContainer";
import { createGrids } from "./nonInteractElements";
import { Brick } from "./Brick";
import { store } from "../store";
import { CELL_SIZE } from "../constants";

export const initStage = (parent: HTMLDivElement | null) => {
  if (!parent) return () => {};
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: parent,
  });

  const container = new MainContainer(parent);
  const viewport = new Viewport(app);

  container.addChild(createGrids());
  viewport.addChild(container);
  app.stage.addChild(viewport);

  parent.appendChild(app.view);

  listenCreatingBrickMove(viewport, container);

  return () => {
    container.destroy(true);
    viewport.destroy();
    parent.removeChild(app.view);
  };
};

export const listenCreatingBrickMove = (
  viewport: Viewport,
  container: MainContainer
) => {
  let newBrick: Brick | null = null;
  store.subscribe((state) => {
    if (newBrick) {
      newBrick.removeFromParent();
      viewport.off("globalpointermove");
    }
    if (!state.editor.creating) {
      newBrick = null;
      return;
    }
    newBrick = new Brick(state.editor.creating);
    viewport.addChild(newBrick);
    viewport.on("globalpointermove", (e) => {
      if (!newBrick) return;
      const worldPos = viewport.toWorld(e.global);
      newBrick.x = worldPos.x - newBrick.width / 2;
      newBrick.y = worldPos.y - newBrick.height / 2;

      const pointerInContainer = container.toLocal(e.global);
      pointerInContainer.x -= newBrick.width / 2;
      pointerInContainer.y -= newBrick.height / 2;

      const notInRange =
        pointerInContainer.x < 0 ||
        pointerInContainer.x > container.width ||
        pointerInContainer.y < 0 ||
        pointerInContainer.y > container.height;
      newBrick.tint = 0xffffff;
      if (notInRange) {
        newBrick.tint = 0x666666;
        return;
      }

      // const r = Math.floor(pointerInContainer.y / CELL_SIZE);
      // const c = Math.floor(pointerInContainer.x / CELL_SIZE);
    });
  });
};
