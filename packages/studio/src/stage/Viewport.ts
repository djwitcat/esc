import { Viewport as PixiViewport } from "pixi-viewport";
import { Application } from "pixi.js";
import { store } from "../store";

export class Viewport extends PixiViewport {
  constructor(app: Application) {
    super({
      events: app.renderer.events,
    });
    const { setState, subscribe, getState } = store;
    const unsub = subscribe((s) => {
      this.pause = !s.editor.handMode;
    });
    this.drag()
      .wheel()
      .clampZoom({
        minScale: 0.5,
        maxScale: 1.2,
      })
      .setZoom(0.6, true);

    this.on("pointerdown", (e) => {
      if (getState().editor.handMode) return;
      if (e.target !== this) return;
      setState({ focus: null });
    });
    this.pause = true;
    this.on("destroyed", unsub);
  }
}
