import { Container } from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

export class MainContainer extends Container {
  constructor(parent: HTMLDivElement) {
    super();
    this.eventMode = "static";
    this.init(parent);
  }

  init(parent: HTMLDivElement) {
    this.pivot.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.position.set(parent.offsetWidth / 2, window.innerHeight / 2);
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;
  }
}
