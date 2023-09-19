import { Point } from "pixi.js";
import { BrickType } from "../presets";
import { MODE, store } from "../store";
import { Brick } from "./Brick";
import { CELL_SIZE } from "../constants";

export class PlacedBrick extends Brick {
  id: string;

  constructor(type: BrickType, id: string) {
    super(type);
    this.eventMode = "static";
    this.id = id;
    this.on("pointerdown", () => {
      store.setState({ selectedBrick: this.id, mode: MODE.DRAG });
      const unsub = store.subscribe((cur) => {
        if (cur.mode === MODE.DRAG) return;
        this.parent.off("pointermove");
        this.parent.off("pointerup");
      });
      this.parent.on("pointermove", (e) => {
        const { x, y } = this.parent.toLocal(e.global);
        this.position.set(x - this.width / 2, y - this.height / 2);
      });
      this.parent.once("pointerup", (e) => {
        unsub();
        this.parent.off("pointermove");
        const { x, y } = this.parent.toLocal(e.global);
        const coordinate = Brick.computeCoordinate(
          new Point(x - this.width / 2, y - this.height / 2)
        );
        if (!coordinate) return;
        store.setState((state) => {
          state.mode = MODE.NORMAL;
          state.bricks[this.id].position = coordinate;
        });
      });
    });

    this.on(
      "destroyed",
      store.subscribe((cur) => {
        // 数据中不存在时销毁
        if (!cur.bricks[this.id]) {
          this.destroy();
          return;
        }
        // 选中时高亮砖块
        if (cur.selectedBrick === this.id) {
          this.alpha = 0.5;
        } else {
          this.alpha = 1;
        }
        // 位置改变时更新位置
        const { position } = cur.bricks[this.id];
        this.position.set(position[0] * CELL_SIZE, position[1] * CELL_SIZE);
      })
    );
  }
}
