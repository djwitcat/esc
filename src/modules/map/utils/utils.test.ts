import { generateBrick } from "./BrickFactory";
import { describe, expect, test } from "vitest";
import { generateBrickRow, mergeRow } from "./BrickGroupFactory";
import { Brick } from "./types";

describe("砖块生成", () => {
  test("返回一个格式正确的砖块数据", () => {
    const brick = generateBrick(1);
    // 应该是一个数组
    expect(brick).toBeInstanceOf(Array);
    // 所有成员是数组
    expect(brick.every((row) => Array.isArray(row))).toBe(true);
    // 所有成员是null或者对象
    expect(
      brick.every((row) =>
        row.every((item) => item === null || typeof item === "object")
      )
    ).toBe(true);
    // 所有成员的长度相等
    expect(brick.every((row) => row.length === brick[0].length)).toBe(true);
  });
});

describe("砖块行生成函数", () => {
  test("生成的砖块行的宽度不能超过10列", () => {
    for (let i = 0; i < 6; i++) {
      const brickRow = generateBrickRow(i);
      // brickRow中所有砖块第一行长度相加不能超过10
      expect(
        brickRow.reduce((acc, cur) => acc + cur[0].length, 0)
      ).toBeLessThanOrEqual(10);
    }
  });

  test("砖块行中砖块个数应该与给出的参数相同", () => {
    // 与给出的参数相同
    expect(generateBrickRow(0).length).toBe(0);
    expect(generateBrickRow(1).length).toBe(1);
  });
});

describe("砖块行生成函数", () => {
  test("一个砖块行应该能压缩（合并）成一个格式正确的砖块", () => {
    const a: Brick[] = [
      [
        [{ index: 1 }, { index: 1 }],
        [{ index: 1 }, null],
      ],
      [
        [{ index: 2 }, { index: 2 }, { index: 2 }],
        [{ index: 2 }, null, { index: 2 }],
      ],
      [[{ index: 3 }, { index: 3 }, { index: 3 }]],
    ];
    const _a: Brick = [
      [
        { index: 1 },
        { index: 1 },
        { index: 2 },
        { index: 2 },
        { index: 2 },
        { index: 3 },
        { index: 3 },
        { index: 3 },
      ],
      [{ index: 1 }, null, { index: 2 }, null, { index: 2 }, null, null, null],
    ];
    const b: Brick[] = [
      [
        [{ index: 0 }, { index: 0 }],
        [null, { index: 0 }],
      ],
      [
        [{ index: 1 }, { index: 1 }],
        [{ index: 1 }, null],
      ],
      [
        [{ index: 2 }, { index: 2 }],
        [{ index: 2 }, null],
        [{ index: 2 }, null],
        [{ index: 2 }, null],
      ],
      [
        [{ index: 3 }, { index: 3 }, { index: 3 }, { index: 3 }],
        [null, { index: 3 }, null, null],
      ],
    ];
    const _b: Brick = [
      [
        { index: 0 },
        { index: 0 },
        { index: 1 },
        { index: 1 },
        { index: 2 },
        { index: 2 },
        { index: 3 },
        { index: 3 },
        { index: 3 },
        { index: 3 },
      ],
      [
        null,
        { index: 0 },
        { index: 1 },
        null,
        { index: 2 },
        null,
        null,
        { index: 3 },
        null,
        null,
      ],
      [null, null, null, null, { index: 2 }, null, null, null, null, null],
      [null, null, null, null, { index: 2 }, null, null, null, null, null],
    ];
    expect(mergeRow(a)).toEqual(_a);
    expect(mergeRow(b)).toEqual(_b);
  });

  test("合并后的砖块行，每一行的长度应该相等", () => {
    for (let i = 0; i < 10; i++) {
      const brickRow = generateBrickRow(5);
      const mergedBrick = mergeRow(brickRow);
      if (!mergedBrick.every((row) => row.length === mergedBrick[0].length)) {
        console.log("att", mergedBrick);
      }
      expect(
        mergedBrick.every((row) => row.length === mergedBrick[0].length)
      ).toBe(true);
    }
  });

  test("合并后的砖块行行数应该等于原来砖块行中最高的砖块行数", () => {
    for (let i = 0; i < 10; i++) {
      const brickRow = generateBrickRow(5);
      const maxRow = Math.max(...brickRow.map((brick) => brick.length));
      const mergedBrick = mergeRow(brickRow);

      if (mergedBrick.length !== maxRow)
        console.log(mergedBrick, JSON.stringify(brickRow));
      expect(mergedBrick.length).toBe(maxRow);
    }
  });
});
