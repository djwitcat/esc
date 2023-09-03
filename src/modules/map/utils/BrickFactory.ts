import { map } from "ramda";

type Pattern = (0 | 1)[][];
type Payload = {
  index: number;
};
type Brick = (Payload | null)[][];

const patterns: Pattern[] = [
  [[1, 1, 1]],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1],
    [1, 0],
  ],
  [
    [1, 1],
    [0, 1],
  ],
  [
    [1, 1, 1, 1],
    [0, 1, 0, 0],
  ],
  [
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  [
    [1, 1],
    [1, 0],
    [1, 0],
    [1, 0],
  ],
  [
    [1, 1],
    [0, 1],
    [0, 1],
    [0, 1],
  ],
];

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
