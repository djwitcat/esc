import { Container } from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../constants";
import { store } from "../store";

export class MainContainer extends Container {
  constructor() {
    super();
    this.eventMode = "dynamic";
    this.init();
  }

  init() {
    this.pivot.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;

    this.on("click", (e) => {
      const localPoint = this.toLocal(e.global);
      const x = Math.floor(localPoint.x / CELL_SIZE);
      const y = Math.floor(localPoint.y / CELL_SIZE);
      this.setSelectedCell(x, y);
    });
  }

  setSelectedCell(x: number, y: number) {
    if (store.getState().editor.handMode) return;
    store.setState({ focus: { x, y } });
  }
}
