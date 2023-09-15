export const enum BRICK {
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

export const presetBrickInfo: {
  [key in BRICK]: { name: BRICK; color: string };
} = {
  [BRICK.A]: { name: BRICK.A, color: "#79c711" },
  [BRICK.B]: { name: BRICK.B, color: "#ff8c00" },
  [BRICK.C]: { name: BRICK.C, color: "#00b0f4" },
  [BRICK.D]: { name: BRICK.D, color: "#0076c1" },
  [BRICK.E]: { name: BRICK.E, color: "#d65d00" },
  [BRICK.F]: { name: BRICK.F, color: "#ff008d" },
  [BRICK.G]: { name: BRICK.G, color: "#ff0006" },
  [BRICK.H]: { name: BRICK.H, color: "#b200ff" },
  [BRICK.I]: { name: BRICK.I, color: "#fff000" },
};

export const presetBrickData: {
  [key in BRICK]: (0 | 1)[][];
} = {
  [BRICK.A]: [[1, 1, 1]],
  [BRICK.B]: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [BRICK.C]: [
    [1, 1, 1],
    [1, 0, 1],
  ],
  [BRICK.D]: [
    [1, 1],
    [1, 0],
  ],
  [BRICK.E]: [
    [1, 1],
    [0, 1],
  ],
  [BRICK.F]: [
    [1, 1, 1, 1],
    [0, 1, 0, 0],
  ],
  [BRICK.G]: [
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ],
  [BRICK.H]: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [BRICK.I]: [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
};
