import { Graphics } from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";

export const createGrids = () => {
  const grids = new Graphics();
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
