import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";
import { CellHighlight } from "./CellHighlight";
import { Viewport } from "./Viewport";
import { store } from "../store";

export const initStage = () => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: window,
  });

  const { setState, getState } = store;

  const container = createMainContainer((v) => {
    //独立一个container class吧，handMove时设置eventmode为none
    if (getState().editor.handMode) return;
    setState({ focus: v });
  });

  const viewport = new Viewport(app);
  const cellHighlight = new CellHighlight();

  container.addChild(cellHighlight);
  viewport.addChild(container);
  app.stage.addChild(viewport);

  document.body.appendChild(app.view);
  return () => {
    container.destroy(true);
    viewport.destroy();
    document.body.removeChild(app.view);
  };
};

const createMainContainer = (
  setSelectedCell: (cell: { x: number; y: number }) => void
) => {
  const container = new PIXI.Container();
  container.pivot.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  container.position.set(window.innerWidth / 2, window.innerHeight / 2);
  container.width = CANVAS_WIDTH;
  container.height = CANVAS_HEIGHT;

  container.on("click", (e) => {
    const localPoint = container.toLocal(e.global);
    const x = Math.floor(localPoint.x / CELL_SIZE);
    const y = Math.floor(localPoint.y / CELL_SIZE);
    setSelectedCell({ x, y });
  });
  container.eventMode = "dynamic";

  const grids = createGrids();
  container.addChild(grids);

  return container;
};

const createGrids = () => {
  const grids = new PIXI.Graphics();
  grids.beginFill(0x000000);
  grids.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  grids.endFill();
  for (let i = 0; i <= 10; i++) {
    grids.lineStyle(4, 0xffffff);
    grids.moveTo(CELL_SIZE * i, 0);
    grids.lineTo(CELL_SIZE * i, CANVAS_HEIGHT);
  }

  for (let i = 0; i <= Math.floor(CANVAS_HEIGHT / CELL_SIZE); i++) {
    grids.lineStyle(4, 0xffffff);
    grids.moveTo(0, CELL_SIZE * i);
    grids.lineTo(CANVAS_WIDTH, CELL_SIZE * i);
  }
  return grids;
};
