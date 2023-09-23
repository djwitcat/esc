import { createStore, useStore } from "zustand";
import { BrickType, presetBrickTypeData } from "./presets";
import { Area, BrickDataBase } from "./types";
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

const computeSizeByLTRB = (area: Area) => {
  const { lt, rb } = area;
  return (rb[0] - lt[0]) * (rb[1] - lt[1]);
};

const isContain = (
  /**
   * 大的矩形
   */
  a: Area,
  /**
   * 小的
   */
  b: Area
) =>
  b.lt[0] >= a.lt[0] &&
  b.lt[1] >= a.lt[1] &&
  b.rb[0] <= a.rb[0] &&
  b.rb[1] <= a.rb[1];

export const computeAreaRelations = (areas: { [id: string]: Area }) => {
  const sorted = Object.entries(areas).sort(
    (a, b) => computeSizeByLTRB(b[1]) - computeSizeByLTRB(a[1])
  );
  // 执行遍历，判断其余区域是否在当前区域内
  for (let i = 0; i < sorted.length; i++) {
    const [id, area] = sorted[i];
    for (let j = i + 1; j < sorted.length; j++) {
      const [id2, area2] = sorted[j];
      if (isContain(area, area2)) {
        areas[id2].parent = id;
        areas[id2].deep = areas[id].deep + 1;
      }
    }
  }
  return areas;
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
  bricks: { [id: string]: BrickDataBase };
  areas: { [id: string]: Area };
  getMap: () => Map;
  createBrick: (type: BrickType, position: [number, number]) => void;
  createArea: (a: [number, number], b: [number, number]) => void;
  deleteArea: (id: string) => void;
  mode: MODE;
  creating: BrickType | null;
  selectedBrick: string | null;
}

export const store = createStore<States>()(
  devtools(
    immer((set, get) => ({
      bricks: {},
      areas: {},
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
      createArea: (a, b) => {
        if (b[0] - a[0] < 2 || b[1] - a[1] < 3) {
          ToastQueue.neutral("区域太小了，至少要3x2才能形成连消", {
            timeout: 300,
          });
          return;
        }
        set((state) => {
          state.areas = computeAreaRelations({
            ...state.areas,
            [nanoid()]: {
              deep: 0,
              lt: a,
              rb: b,
              parent: null,
            },
          });
        });
      },
      deleteArea: (id) => {
        set((state) => {
          delete state.areas[id];
          state.areas = computeAreaRelations(state.areas);
        });
      },
    }))
  )
);

export const useBoundedStore = <T>(selector: (state: States) => T) =>
  useStore(store, selector);
