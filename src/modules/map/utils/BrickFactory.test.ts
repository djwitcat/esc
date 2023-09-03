import { generateBrick } from "./BrickFactory";
import { expect, test } from "vitest";

test("返回一个格式正确的砖块数据", () => {
  // 测试generateBrick函数是否返回一个格式正确的砖块数据
  // brick应该由数组组成，数组的每一项只能是object或null
  const brick = generateBrick(1);
  expect(brick).toBeInstanceOf(Array);
  expect(brick.every((row) => Array.isArray(row))).toBe(true);
  expect(
    brick.every((row) =>
      row.every((item) => item === null || typeof item === "object")
    )
  ).toBe(true);
  expect(brick.every((row) => row.length === brick[0].length)).toBe(true);
});
