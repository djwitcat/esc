import { createStore, useStore } from "zustand";
import { BrickType } from "./presets";
import { BrickDataBase } from "./types";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";

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
}

type Actions = {
  createBrick: (type: BrickType, position: [number, number]) => void;
};

export const store = createStore<States & Actions>()(
  immer((set) => ({
    bricks: {},
    mode: MODE.NORMAL,
    creating: null,
    selectedBrick: null,
    createBrick(type, position) {
      set((state) => {
        state.bricks[nanoid()] = { type, position };
        state.creating = null;
        state.mode = MODE.NORMAL;
      });
    },
  }))
);

export const useBoundedStore = <T>(selector: (state: States & Actions) => T) =>
  useStore(store, selector);
