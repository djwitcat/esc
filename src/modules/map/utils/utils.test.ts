import { generateBrick } from "./BrickFactory";
import { expect, test } from "vitest";
import { generateBrickRow } from "./BrickGroupFactory";

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
