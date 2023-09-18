import * as PIXI from "pixi.js";
import { Viewport } from "./Viewport";
import { MainContainer } from "./MainContainer";
import { createGrids } from "./nonInteractElements";
import { Brick } from "./Brick";
import { MODE, store } from "../store";
import { presetBrickTypeData } from "../presets";
import { CELL_SIZE } from "../constants";
import { BricksLayer } from "./BricksLayer";

export const initStage = (parent: HTMLDivElement | null) => {
  if (!parent) return () => {};
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: parent,
  });

  const container = new MainContainer(parent);
  const viewport = new Viewport(app);
  const bricksLayer = new BricksLayer();

  container.addChild(createGrids());
  container.addChild(bricksLayer);
  viewport.addChild(container);
  app.stage.addChild(viewport);

  parent.appendChild(app.view);

  listenCreatingBrickMove(viewport, container);
  listenCreatingBrickPlaced(container);

  return () => {
    container.destroy(true);
    viewport.destroy();
    parent.removeChild(app.view);
  };
};

export const listenCreatingBrickPlaced = (container: MainContainer) => {
  store.subscribe((state) => {
    if (state.mode !== MODE.CREATE) {
      container.off("click");
      return;
    }
    container.on("click", (e) => {
      // 获取相对container 点击位置
      const pointerInContainer = container.toLocal(e.global);
      const brickType = store.getState().creating;
      if (!brickType) return;
      const data = presetBrickTypeData[brickType];
      const leftTop = new PIXI.Point(
        pointerInContainer.x - (data[0].length * CELL_SIZE) / 2,
        pointerInContainer.y - (data.length * CELL_SIZE) / 2
      );
      const coordinate = Brick.computeCoordinate(leftTop);
      if (!coordinate) return;
      state.createBrick(brickType, coordinate);
    });
  });
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
    if (!state.creating) {
      newBrick = null;
      return;
    }
    newBrick = new Brick(state.creating);
    // 防止container无法接收点击事件，禁用砖块所有交互。
    newBrick.eventMode = "none";
    viewport.addChild(newBrick);
    viewport.on("globalpointermove", (e) => {
      if (!newBrick) return;

      // 让砖块中心和鼠标位置重合
      const worldPos = viewport.toWorld(e.global);
      newBrick.x = worldPos.x - newBrick.width / 2;
      newBrick.y = worldPos.y - newBrick.height / 2;

      // 获取指针在container中的位置
      const pointerInContainer = container.toLocal(e.global);
      pointerInContainer.x -= newBrick.width / 2;
      pointerInContainer.y -= newBrick.height / 2;

      newBrick.tint = Brick.isOutOfRange(pointerInContainer)
        ? 0x666666
        : 0xffffff;
    });
  });
};
