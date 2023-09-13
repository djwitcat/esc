import { createStore } from "zustand";

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
