import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { Viewport } from "pixi-viewport";

const createMainContainer = () => {
  const container = new PIXI.Container();
  container.pivot.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  container.position.set(window.innerWidth / 2, window.innerHeight / 2);
  container.width = CANVAS_WIDTH;
  container.height = CANVAS_HEIGHT;
  return container;
};

const createGrids = () => {
  const grids = new PIXI.Graphics();
  grids.beginFill(0x000000);
  grids.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  grids.endFill();
  for (let i = 0; i <= 10; i++) {
    grids.lineStyle(4, 0xffffff);
    grids.moveTo((CANVAS_WIDTH / 10) * i, 0);
    grids.lineTo((CANVAS_WIDTH / 10) * i, CANVAS_HEIGHT);
  }

  for (let i = 0; i <= Math.floor(CANVAS_HEIGHT / (CANVAS_WIDTH / 10)); i++) {
    grids.lineStyle(4, 0xffffff);
    grids.moveTo(0, (CANVAS_WIDTH / 10) * i);
    grids.lineTo(CANVAS_WIDTH, (CANVAS_WIDTH / 10) * i);
  }
  return grids;
};

const createViewport = (app: PIXI.Application) => {
  const viewport = new Viewport({
    events: app.renderer.events,
  });

  viewport
    .drag()
    .wheel()
    .clampZoom({
      minScale: 0.5,
      maxScale: 1.2,
    })
    .setZoom(0.6, true);
  return viewport;
};

export const initStage = () => {
  const app = new PIXI.Application<HTMLCanvasElement>({
    background: "#333333",
    resizeTo: window,
  });

  const container = createMainContainer();
  const grids = createGrids();
  const viewport = createViewport(app);

  container.addChild(grids);
  viewport.addChild(container);

  app.stage.addChild(viewport);

  document.body.appendChild(app.view);
  return app;
};
