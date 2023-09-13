import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";
import { CellHighlight } from "./CellHighlight";
import { Subject } from "rxjs";
import { Viewport } from "./Viewport";

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

export const initStage = () => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: window,
  });

  const selectedCell = new Subject<{ x: number; y: number } | null>();

  const container = createMainContainer((v) => selectedCell.next(v));

  const viewport = new Viewport(app);
  const cellHighlight = new CellHighlight(selectedCell);

  container.addChild(cellHighlight);
  viewport.addChild(container);
  app.stage.addChild(viewport);
  viewport.on("pointerdown", () => selectedCell.next(null));
  document.body.appendChild(app.view);
  return app;
};
