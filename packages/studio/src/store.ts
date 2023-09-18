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
  editor: {
    mode: MODE;
    creating: BrickType | null;
  };
  createBrick: (type: BrickType, position: [number, number]) => void;
}

export const store = createStore<States>()((set) => ({
  bricks: {},
  editor: {
    mode: MODE.NORMAL,
    creating: null,
  },
  createBrick(type, position) {
    set((state) => ({
      bricks: { ...state.bricks, [nanoid()]: { type, position } },
      editor: { creating: null, mode: MODE.NORMAL },
    }));
  },
}));

export const useBoundedStore = <T>(selector: (state: States) => T) =>
  useStore(store, selector);
