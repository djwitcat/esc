import { Graphics, IPointData } from "pixi.js";
import { MainContainer } from "./MainContainer";
import { MODE, store } from "../store";

export class SelectIndicator extends Graphics {
  dragStartAt: IPointData | null = null;
  constructor(parent: MainContainer) {
    super();
    parent.on("pointerdown", (e) => {
      if (store.getState().mode !== MODE.MARK) return;
      this.dragStartAt = this.toLocal(e.global);
      parent.on("pointermove", (e) => {
        if (!this.dragStartAt) {
          this.off("pointermove");
          return;
        }
        const { x: startX, y: startY } = this.dragStartAt;
        const { x, y } = this.toLocal(e.global);

        this.clear();
        this.lineStyle(4, 0xffff00);
        this.drawRect(startX, startY, x - startX, y - startY);
      });
    });
    parent.on("pointerup", () => {
      this.clear();
      this.off("pointermove");
      this.dragStartAt = null;
    });
  }
}
