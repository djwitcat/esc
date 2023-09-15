import * as PIXI from "pixi.js";
import { Viewport } from "./Viewport";
import { MainContainer } from "./MainContainer";
import { createGrids } from "./nonInteractElements";
import { Brick } from "./Brick";
import { store } from "../store";

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

  listenCreatingBrickMove(viewport);

  return () => {
    container.destroy(true);
    viewport.destroy();
    parent.removeChild(app.view);
  };
};

export const listenCreatingBrickMove = (viewport: Viewport) => {
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
      newBrick.x = worldPos.x;
      newBrick.y = worldPos.y;
    });
  });
};
