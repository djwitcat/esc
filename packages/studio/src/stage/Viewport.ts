import { Viewport as PixiViewport } from "pixi-viewport";
import { Application } from "pixi.js";
import { MODE, store } from "../store";

export class Viewport extends PixiViewport {
  constructor(app: Application) {
    super({
      events: app.renderer.events,
    });
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

    this.on("destroyed", unsub);

    // HACK: 创建时强制update初始化后禁用viewport
    this.update(0);
    this.pause = true;
  }
}
