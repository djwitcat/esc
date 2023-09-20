import { createStore, useStore } from "zustand";
import { BrickType, presetBrickTypeData } from "./presets";
import { BrickDataBase } from "./types";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import { Map } from "./types";
import { devtools } from "zustand/middleware";
import { CANVAS_HEIGHT, CELL_SIZE } from "./constants";
import { ToastQueue } from "@react-spectrum/toast";

const generateMap = (bricks: States["bricks"]) => {
  const map: Map = [];

  for (let i = 0; i < Math.ceil(CANVAS_HEIGHT / CELL_SIZE); i++) {
    map.push(new Array(10).fill(null));
  }

  for (const id in bricks) {
    const { position, type } = bricks[id];
    const data = presetBrickTypeData[type];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j]) {
          map[position[1] + i][position[0] + j] = type;
        }
      }
    }
  }
  return map;
};

export const isOverlapped = (
  map: Map,
  data: number[][],
  position: [number, number]
) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] && map[position[1] + i][position[0] + j]) {
        ToastQueue.neutral("重叠了,砖块不能重叠。", { timeout: 300 });
        return true;
      }
    }
  }
  return false;
};

export enum MODE {
  /**
   * 普通模式
   */
  NORMAL,
  /**
   * 正在拖拽画布
   */
  HAND,
  /**
   * 正在决定砖块初始位置
   */
  CREATE,
  /**
   * 正在移动砖块
   */
  DRAG,
  /**
   * 正在标注连消区
   */
  MARK,
}

interface States {
  bricks: { [pos: string]: BrickDataBase };
  getMap: () => Map;
  createBrick: (type: BrickType, position: [number, number]) => void;
  mode: MODE;
  creating: BrickType | null;
  selectedBrick: string | null;
}

export const store = createStore<States>()(
  devtools(
    immer((set, get) => ({
      bricks: {},
      getMap: () => generateMap(get().bricks),
      mode: MODE.NORMAL,
      creating: null,
      selectedBrick: null,
      createBrick: (type, position) => {
        if (isOverlapped(get().getMap(), presetBrickTypeData[type], position))
          return;

        set((state) => {
          state.bricks[nanoid()] = { type, position };
          state.creating = null;
          state.mode = MODE.NORMAL;
        });
      },
    }))
  )
);

export const useBoundedStore = <T>(selector: (state: States) => T) =>
  useStore(store, selector);
