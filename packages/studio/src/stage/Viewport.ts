import { Viewport as PixiViewport } from "pixi-viewport";
import { Application } from "pixi.js";
import { MODE, store } from "../store";

export class Viewport extends PixiViewport {
  constructor(app: Application) {
    super({
      events: app.renderer.events,
    });
    this.eventMode = "static";
    const { subscribe } = store;
    const unsub = subscribe((s) => {
      this.pause = s.editor.mode !== MODE.HAND;
    });
    this.drag()
      .wheel()
      .clampZoom({
        minScale: 0.5,
        maxScale: 1.2,
      })
      .setZoom(0.6, true);

    this.pause = true;
    this.on("destroyed", unsub);
  }
}
