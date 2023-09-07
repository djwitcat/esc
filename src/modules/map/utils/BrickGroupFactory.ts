import { add, lte, reduce, reduceWhile, times } from "ramda";
import { generateBrick } from "./BrickFactory";
import { MAX_COL } from "../../../constants";
import { Brick } from "./types";
import { mapIndexed } from "ramda-adjunct";

/**
 * 生成若干个砖块组成的数组，但不会超过10列
 * @param h 砖块行的宽度
 * @returns
 */
export const generateBrickRow = (h: number) => {
  const row = times(generateBrick, h);
  // 生成的砖块行的宽度不能超过10列
  return reduceWhile<Brick, [Brick[], number]>(
    (acc, cur) => lte(add(acc[1], cur[0].length), MAX_COL),
    (acc, cur) => [[...acc[0], cur], add(acc[1], cur[0].length)],
    [[], 0],
    row
  )[0];
};

/**
 * 把若干个砖块合并成一个砖块
 * @param row 砖块数组
 * @returns
 */
export const mergeRow = (row: Brick[]) => {
  const brickRows = Math.max(...row.map((b) => b.length));
  const filled = row.map((brick) =>
    brick.length < brickRows
      ? [
          ...brick,
          ...Array.from(Array(brickRows - brick.length), () =>
            new Array(brick[0].length).fill(null)
          ),
        ]
      : brick
  );
  return mapIndexed((_, i) =>
    reduce<Brick[], Brick>((acc, cur) => [...acc, ...cur[i]], [], filled)
  )(filled[0]);
};

// export const shrinkRows = (base: Brick[], target: Brick[]) => {};

// export const generateRandomGroup = (v: number) => {
//   const rows = times(generateBrickRow, v);
// };

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
