import { Container, Rectangle } from "pixi.js";
import { MODE, store } from "../store";
import { PlacedBrick } from "./PlacedBrick";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";

export class BricksLayer extends Container {
  constructor() {
    super();

    this.eventMode = "static";
    this.hitArea = new Rectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const unsub = store.subscribe((cur, prev) => {
      if (prev.mode !== MODE.CREATE) return;
      const curBricksKeys = Object.keys(cur.bricks);
      const prevBricksKeys = Object.keys(prev.bricks);
      const newKeys = curBricksKeys.filter(
        (key) => !prevBricksKeys.includes(key)
      );
      newKeys.forEach((key) => {
        const data = cur.bricks[key];
        const brick = new PlacedBrick(data.type, key);
        const [x, y] = data.position;
        brick.position.set(x * CELL_SIZE, y * CELL_SIZE);
        this.addChild(brick);
      });
    });

    this.on("destroyed", unsub);
  }
}
