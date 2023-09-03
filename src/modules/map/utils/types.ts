export type Payload = {
  index: number;
};
export type Pattern = (0 | 1)[][];
export type Brick = (Payload | null)[][];
export type BrickGroup = {
  index: number;
  map: Brick;
};
