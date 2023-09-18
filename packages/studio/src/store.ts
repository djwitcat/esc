import { createStore, useStore } from "zustand";
import { BrickType } from "./presets";
import { BrickDataBase } from "./types";
import { nanoid } from "nanoid";
export enum MODE {
  NORMAL,
  HAND,
  CREATE,
}

interface States {
  bricks: { [pos: string]: BrickDataBase };
  mode: MODE;
  creating: BrickType | null;
  selectedBrick: string | null;
  createBrick: (type: BrickType, position: [number, number]) => void;
}

export const store = createStore<States>()((set) => ({
  bricks: {},
  mode: MODE.NORMAL,
  creating: null,
  selectedBrick: null,
  createBrick(type, position) {
    set((state) => ({
      bricks: { ...state.bricks, [nanoid()]: { type, position } },
      creating: null,
      mode: MODE.NORMAL,
    }));
  },
}));

export const useBoundedStore = <T>(selector: (state: States) => T) =>
  useStore(store, selector);
