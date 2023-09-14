import * as PIXI from "pixi.js";
import { CellHighlight } from "./CellHighlight";
import { Viewport } from "./Viewport";
import { MainContainer } from "./MainContainer";
import { createGrids } from "./nonInteractElements";

export const initStage = (parent: HTMLDivElement | null) => {
  if (!parent) return () => {};
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: parent,
  });

  const container = new MainContainer(parent);
  const viewport = new Viewport(app);
  const cellHighlight = new CellHighlight();

  container.addChild(createGrids());
  container.addChild(cellHighlight);
  viewport.addChild(container);
  app.stage.addChild(viewport);

  parent.appendChild(app.view);
  return () => {
    container.destroy(true);
    viewport.destroy();
    parent.removeChild(app.view);
  };
};
