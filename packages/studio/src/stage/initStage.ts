import * as PIXI from "pixi.js";
import { CellHighlight } from "./CellHighlight";
import { Viewport } from "./Viewport";
import { MainContainer } from "./MainContainer";
import { createGrids } from "./nonInteractElements";

export const initStage = () => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: window,
  });

  const container = new MainContainer();
  const viewport = new Viewport(app);
  const cellHighlight = new CellHighlight();

  container.addChild(createGrids());
  container.addChild(cellHighlight);
  viewport.addChild(container);
  app.stage.addChild(viewport);

  document.body.appendChild(app.view);
  return () => {
    container.destroy(true);
    viewport.destroy();
    document.body.removeChild(app.view);
  };
};
