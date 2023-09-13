import { Viewport as PixiViewport } from "pixi-viewport";
import { Application } from "pixi.js";

export class Viewport extends PixiViewport {
  constructor(app: Application) {
    super({
      events: app.renderer.events,
    });
    this.drag()
      .wheel()
      .clampZoom({
        minScale: 0.5,
        maxScale: 1.2,
      })
      .setZoom(0.6, true);
  }
}
