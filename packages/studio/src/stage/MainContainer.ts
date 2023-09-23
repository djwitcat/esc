import { Container, Graphics, Point } from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";
import { MODE, store } from "../store";
import { presetBrickTypeData } from "../presets";
import { Brick } from "./Brick";
import { Viewport } from "./Viewport";
import { BricksLayer } from "./BricksLayer";
import { SelectIndicator } from "./SelectIndicator";
import { computeCoordinate, isOutOfRange } from "./utils";
import { AreasLayer } from "./AreasLayer";

export class MainContainer extends Container {
  constructor(parent: HTMLDivElement, viewport: Viewport) {
    super();
    this.init(parent);
    this.eventMode = "static";
    this.addChild(createGrids());
    this.addChild(new BricksLayer());
    this.addChild(new AreasLayer());
    this.addChild(new SelectIndicator(this));
    this.listenCreatingBrickMove(viewport);
    this.listenCreatingBrickPlaced();
  }

  init(parent: HTMLDivElement) {
    this.pivot.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.position.set(parent.offsetWidth / 2, window.innerHeight / 2);
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;
  }

  listenCreatingBrickPlaced() {
    this.on(
      "destroyed",
      store.subscribe((state) => {
        if (state.mode !== MODE.CREATE) {
          this.off("click");
          return;
        }
        this.on("click", (e) => {
          // 获取相对container 点击位置
          const pointerInContainer = this.toLocal(e.global);
          const brickType = store.getState().creating;
          if (!brickType) return;
          const data = presetBrickTypeData[brickType];
          const leftTop = new Point(
            pointerInContainer.x - (data[0].length * CELL_SIZE) / 2,
            pointerInContainer.y - (data.length * CELL_SIZE) / 2
          );
          const coordinate = computeCoordinate(leftTop);
          if (!coordinate) return;
          state.createBrick(brickType, coordinate);
        });
      })
    );
  }

  listenCreatingBrickMove(viewport: Viewport) {
    let newBrick: Brick | null = null;
    this.on(
      "destroyed",
      store.subscribe((state) => {
        if (newBrick) {
          newBrick.removeFromParent();
          viewport.off("globalpointermove");
        }
        if (!state.creating) {
          newBrick = null;
          return;
        }
        newBrick = new Brick(state.creating);
        // 防止container无法接收点击事件，禁用砖块所有交互。
        newBrick.eventMode = "none";
        viewport.addChild(newBrick);
        viewport.on("globalpointermove", (e) => {
          if (!newBrick) return;

          // 让砖块中心和鼠标位置重合
          const worldPos = viewport.toWorld(e.global);
          newBrick.x = worldPos.x - newBrick.width / 2;
          newBrick.y = worldPos.y - newBrick.height / 2;

          // 获取指针在container中的位置
          const pointerInContainer = this.toLocal(e.global);
          pointerInContainer.x -= newBrick.width / 2;
          pointerInContainer.y -= newBrick.height / 2;

          newBrick.tint = isOutOfRange(pointerInContainer)
            ? 0x666666
            : 0xffffff;
        });
      })
    );
  }
}

const createGrids = () => {
  const grids = new Graphics();
  grids.beginFill(0x000000);
  grids.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  grids.endFill();
  for (let i = 0; i <= 10; i++) {
    grids.lineStyle(4, 0xffffff);
    grids.moveTo(CELL_SIZE * i, 0);
    grids.lineTo(CELL_SIZE * i, CANVAS_HEIGHT);
  }

  for (let i = 0; i <= Math.floor(CANVAS_HEIGHT / CELL_SIZE); i++) {
    grids.lineStyle(4, 0xffffff);
    grids.moveTo(0, CELL_SIZE * i);
    grids.lineTo(CANVAS_WIDTH, CELL_SIZE * i);
  }
  return grids;
};
