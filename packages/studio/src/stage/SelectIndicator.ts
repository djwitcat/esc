import { Graphics, IPointData, Point } from "pixi.js";
import { MainContainer } from "./MainContainer";
import { MODE, store } from "../store";
import { computeCoordinate } from "./utils";

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
    parent.on("pointerup", (e) => {
      this.clear();
      this.off("pointermove");
      if (!this.dragStartAt) return;
      const dragEndAt = this.toLocal(e.global);
      const a = computeCoordinate(
        new Point(this.dragStartAt.x, this.dragStartAt.y),
        true
      );
      const b = computeCoordinate(new Point(dragEndAt.x, dragEndAt.y), true);
      if (!a || !b) return;
      if (a[0] === b[0] || a[1] === b[1]) return;
      store.getState().createArea(a, b);
      this.dragStartAt = null;
    });
  }
}
