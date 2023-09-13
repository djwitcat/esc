import * as PIXI from "pixi.js";
import { CELL_SIZE } from "../constants";
import { store } from "../store";

export class CellHighlight extends PIXI.Graphics {
  constructor() {
    super();
    const { subscribe } = store;
    subscribe(({ focus }) => {
      this.clear();
      if (!focus) return;
      // 画半透明的格子
      this.beginFill(0xffff00, 0.75);
      this.drawRect(
        focus.x * CELL_SIZE,
        focus.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      this.endFill();
    });
  }
}
