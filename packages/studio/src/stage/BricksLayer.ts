import { Container } from "pixi.js";
import { MODE, store } from "../store";
import { PlacedBrick } from "./PlacedBrick";
import { CELL_SIZE } from "../constants";

export class BricksLayer extends Container {
  constructor() {
    super();
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
