import { Graphics, Point } from "pixi.js";
import {
  BrickType,
  presetBrickTypeData,
  presetBrickTypeInfo,
} from "../presets";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";

export class Brick extends Graphics {
  constructor(type: BrickType) {
    super();
    const data = presetBrickTypeData[type];
    const info = presetBrickTypeInfo[type];

    this.create(data, info.color);
  }

  create(data: (0 | 1)[][], color: string) {
    this.beginFill(color);
    for (let r = 0; r < data.length; r++) {
      for (let c = 0; c < data[r].length; c++) {
        if (data[r][c]) {
          this.drawRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
    this.endFill();
  }

  static computeCoordinate(leftTop: Point): [number, number] | undefined {
    if (this.isOutOfRange(leftTop)) return;

    if (leftTop.x % CELL_SIZE > CELL_SIZE / 2) leftTop.x += CELL_SIZE;
    if (leftTop.y % CELL_SIZE > CELL_SIZE / 2) leftTop.y += CELL_SIZE;

    const r = Math.floor(leftTop.y / CELL_SIZE);
    const c = Math.floor(leftTop.x / CELL_SIZE);
    return [c, r];
  }

  static isOutOfRange(point: Point) {
    return (
      point.x < 0 ||
      point.x > CANVAS_WIDTH ||
      point.y < 0 ||
      point.y > CANVAS_HEIGHT
    );
  }
}
