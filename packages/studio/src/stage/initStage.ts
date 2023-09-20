import * as PIXI from "pixi.js";
import { Viewport } from "./Viewport";
import { MainContainer } from "./MainContainer";

export const initStage = (parent: HTMLDivElement | null) => {
  if (!parent) return () => {};
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: parent,
  });

  const viewport = new Viewport(app);
  const container = new MainContainer(parent, viewport);

  viewport.addChild(container);
  app.stage.addChild(viewport);

  parent.appendChild(app.view);

  return () => {
    container.destroy(true);
    viewport.destroy();
    parent.removeChild(app.view);
  };
};
