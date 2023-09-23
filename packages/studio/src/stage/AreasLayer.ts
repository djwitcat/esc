import { Container, Rectangle } from "pixi.js";
import { MODE, store } from "../store";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { Area } from "./Area";

export class AreasLayer extends Container {
  constructor() {
    super();

    this.eventMode = "static";
    this.hitArea = new Rectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.sortableChildren = true;
    const unsub = store.subscribe((cur, prev) => {
      if (prev.mode !== MODE.MARK) return;
      const curAreasKeys = Object.keys(cur.areas);
      const prevAreasKeys = Object.keys(prev.areas);
      const newKeys = curAreasKeys.filter(
        (key) => !prevAreasKeys.includes(key)
      );
      newKeys.forEach((key) => {
        const area = new Area(key);
        this.addChild(area);
      });
      (this.children as Area[]).sort((a, b) => a.data.deep - b.data.deep);
    });

    this.on("destroyed", unsub);
  }
}
