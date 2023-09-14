import A from "../assets/A.png";
import B from "../assets/B.png";
import C from "../assets/C.png";
import D from "../assets/D.png";
import E from "../assets/E.png";
import F from "../assets/F.png";
import G from "../assets/G.png";
import H from "../assets/H.png";
import I from "../assets/I.png";

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
  [key in BRICK]: { name: BRICK; color: string; thumbnail: string };
} = {
  [BRICK.A]: { name: BRICK.A, color: "#79c711", thumbnail: A },
  [BRICK.B]: { name: BRICK.B, color: "#ff8c00", thumbnail: B },
  [BRICK.C]: { name: BRICK.C, color: "#00b0f4", thumbnail: C },
  [BRICK.D]: { name: BRICK.D, color: "#0076c1", thumbnail: D },
  [BRICK.E]: { name: BRICK.E, color: "#d65d00", thumbnail: E },
  [BRICK.F]: { name: BRICK.F, color: "#ff008d", thumbnail: F },
  [BRICK.G]: { name: BRICK.G, color: "#ff0006", thumbnail: G },
  [BRICK.H]: { name: BRICK.H, color: "#b200ff", thumbnail: H },
  [BRICK.I]: { name: BRICK.I, color: "#fff000", thumbnail: I },
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
