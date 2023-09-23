import { BrickType } from "./presets";

export interface BrickDataBase {
  position: [number, number];
  type: BrickType;
}

export interface BrickData extends BrickDataBase {
  parent: string | null;
}

export type Map = (null | string)[][];

export interface Area {
  deep: number;
  lt: [number, number];
  rb: [number, number];
  parent: string | null;
}
