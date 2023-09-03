import { add, lte, reduceWhile, times } from "ramda";
import { generateBrick } from "./BrickFactory";
import { MAX_COL } from "../../../constants";
import { Brick } from "./types";

export const generateBrickRow = (h: number) => {
  const row = times(generateBrick, h);
  return reduceWhile<Brick, [Brick[], number]>(
    (acc, cur) => lte(add(acc[1], cur[0].length), MAX_COL),
    (acc, cur) => [[...acc[0], cur], add(acc[1], cur[0].length)],
    [[], 0],
    row
  )[0];
};

// export const generateBrickGroup = (
//   /**
//    * 砖块组在地图中的索引
//    */
//   index: number,
//   /**
//    * 纵向最多可以有几个砖块
//    */
//   v: number,
//   /**
//    * 横向最多可以有几个砖块
//    */
//   h: number
// ): BrickGroup => {};
