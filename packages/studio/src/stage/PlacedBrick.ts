import { Point } from "pixi.js";
import { BrickType, presetBrickTypeData } from "../presets";
import { MODE, isOverlapped, store } from "../store";
import { Brick } from "./Brick";
import { CELL_SIZE } from "../constants";

export class PlacedBrick extends Brick {
  id: string;

  constructor(type: BrickType, id: string) {
    super(type);
    this.eventMode = "static";
    this.id = id;
    this.on("pointerdown", () => {
      if (store.getState().mode !== MODE.NORMAL) return;
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
        store.setState((state) => {
          state.mode = MODE.NORMAL;
          if (coordinate) {
            const position = state.bricks[this.id].position;
            const map = state.getMap();

            for (let i = 0; i < presetBrickTypeData[type].length; i++) {
              for (let j = 0; j < presetBrickTypeData[type][i].length; j++) {
                if (presetBrickTypeData[type][i][j]) {
                  map[position[1] + i][position[0] + j] = null;
                }
              }
            }

            const data = presetBrickTypeData[type];
            const overlapped = isOverlapped(map, data, coordinate);
            console.log(overlapped);
            if (!overlapped) state.bricks[this.id].position = coordinate;
          }
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
