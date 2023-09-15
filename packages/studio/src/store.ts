import { createStore, useStore } from "zustand";
import { BRICK } from "./presets";

export enum MODE {
  NORMAL,
  HAND,
  CREATE,
}

interface States {
  editor: {
    mode: MODE;
    creating: BRICK | null;
  };
}

export const store = createStore<States>()(() => ({
  editor: {
    mode: MODE.NORMAL,
    creating: null,
  },
}));

export const useBoundedStore = <T>(selector: (state: States) => T) =>
  useStore(store, selector);
