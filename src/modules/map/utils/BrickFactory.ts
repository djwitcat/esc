import { map } from "ramda";
import { patterns } from "./brickPatterns";
import { Brick } from "./types";

/**
 * 砖块生成函数
 */
export const generateBrick = (
  /**
   * 在砖块组中砖块被生成的次序（在砖块组中一个砖块的唯一标识符）
   */
  index: number
): Brick => {
  // pick ramdom item from patterns
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  const payload = { index };
  // replace data in pattern,if 1,replace with payload,if 0,replace with null.using ramda
  return map(
    (row) => map((cell) => (cell === 1 ? payload : null), row),
    pattern
  );
};
