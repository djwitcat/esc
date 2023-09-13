import * as PIXI from "pixi.js";
import { CELL_SIZE } from "../constants";
import { Subject } from "rxjs";

export class CellHighlight extends PIXI.Graphics {
  constructor(
    subject: Subject<{
      x: number;
      y: number;
    } | null>
  ) {
    super();
    subject.subscribe((v) => {
      this.clear();
      if (!v) return;
      // 画半透明的格子
      this.beginFill(0xffff00, 0.75);
      this.drawRect(v.x * CELL_SIZE, v.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      this.endFill();
    });
  }
}
