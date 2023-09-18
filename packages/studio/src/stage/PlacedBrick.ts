import { BrickType } from "../presets";
import { store } from "../store";
import { Brick } from "./Brick";

export class PlacedBrick extends Brick {
  id: string;

  constructor(type: BrickType, id: string) {
    super(type);
    this.eventMode = "static";
    this.id = id;

    this.on("pointerdown", () => store.setState({ selectedBrick: this.id }));

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
      })
    );
  }
}
