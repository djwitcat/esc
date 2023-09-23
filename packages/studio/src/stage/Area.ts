import { Graphics } from "pixi.js";
import { store } from "../store";
import { CELL_SIZE } from "../constants";
import { areaBgColors } from "../presets";

export class Area extends Graphics {
  id: string;

  get data() {
    return store.getState().areas[this.id];
  }

  constructor(id: string) {
    super();
    this.id = id;
    this.on(
      "destroyed",
      store.subscribe((state) => {
        const area = state.areas[id];

        // 数据中不存在时销毁
        if (!area) {
          this.destroy();
          return;
        }

        // 位置改变时更新位置
        const { lt, rb, deep } = area;
        const bgColor = areaBgColors[deep] || "#ffffff";
        const offset = Math.min(deep * 14, CELL_SIZE / 2);
        this.position.set(lt[0] * CELL_SIZE, lt[1] * CELL_SIZE);
        // 在 lt 和 rb 之间画一个矩形,描边
        this.clear();
        this.beginFill(bgColor, 0.5);
        this.lineStyle(4, bgColor);
        this.drawRect(
          offset,
          offset,
          (rb[0] - lt[0] + 1) * CELL_SIZE - offset * 2,
          (rb[1] - lt[1] + 1) * CELL_SIZE - offset * 2
        );
        this.endFill();
      })
    );
  }
}
