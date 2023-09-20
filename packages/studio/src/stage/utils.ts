import { Point } from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";

export const computeCoordinate = (
  leftTop: Point,
  strict?: boolean
): [number, number] | undefined => {
  if (isOutOfRange(leftTop)) return;

  if (!strict) {
    if (leftTop.x % CELL_SIZE > CELL_SIZE / 2) leftTop.x += CELL_SIZE;
    if (leftTop.y % CELL_SIZE > CELL_SIZE / 2) leftTop.y += CELL_SIZE;
  }

  const r = Math.floor(leftTop.y / CELL_SIZE);
  const c = Math.floor(leftTop.x / CELL_SIZE);
  return [c, r];
};

export const isOutOfRange = (point: Point) => {
  return (
    point.x < 0 ||
    point.x > CANVAS_WIDTH ||
    point.y < 0 ||
    point.y > CANVAS_HEIGHT
  );
};
