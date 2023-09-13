import { createStore, useStore } from "zustand";

interface States {
  focus: { x: number; y: number } | null;
  editor: {
    handMode: boolean;
  };
}

export const store = createStore<States>()(() => ({
  focus: null,
  editor: {
    handMode: false,
  },
}));

export const useBoundedStore = <T>(selector: (state: States) => T) =>
  useStore(store, selector);
