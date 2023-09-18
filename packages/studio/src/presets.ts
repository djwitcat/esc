export const enum BrickType {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
}

export const presetBrickTypeInfo: {
  [key in BrickType]: { name: BrickType; color: string };
} = {
  [BrickType.A]: { name: BrickType.A, color: "#79c711" },
  [BrickType.B]: { name: BrickType.B, color: "#ff8c00" },
  [BrickType.C]: { name: BrickType.C, color: "#00b0f4" },
  [BrickType.D]: { name: BrickType.D, color: "#0076c1" },
  [BrickType.E]: { name: BrickType.E, color: "#d65d00" },
  [BrickType.F]: { name: BrickType.F, color: "#ff008d" },
  [BrickType.G]: { name: BrickType.G, color: "#ff0006" },
  [BrickType.H]: { name: BrickType.H, color: "#b200ff" },
  [BrickType.I]: { name: BrickType.I, color: "#fff000" },
};

export const presetBrickTypeData: {
  [key in BrickType]: (0 | 1)[][];
} = {
  [BrickType.A]: [[1, 1, 1]],
  [BrickType.B]: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [BrickType.C]: [
    [1, 1, 1],
    [1, 0, 1],
  ],
  [BrickType.D]: [
    [1, 1],
    [1, 0],
  ],
  [BrickType.E]: [
    [1, 1],
    [0, 1],
  ],
  [BrickType.F]: [
    [1, 1, 1, 1],
    [0, 1, 0, 0],
  ],
  [BrickType.G]: [
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  [BrickType.H]: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [BrickType.I]: [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
};
