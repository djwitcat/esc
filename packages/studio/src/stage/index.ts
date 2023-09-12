import { useEffect } from "react";
import * as PIXI from "pixi.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

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
    grids.lineStyle(1, 0xffffff);
    grids.moveTo((CANVAS_WIDTH / 10) * i, 0);
    grids.lineTo((CANVAS_WIDTH / 10) * i, CANVAS_HEIGHT);
  }

  for (let i = 0; i <= Math.floor(CANVAS_HEIGHT / (CANVAS_WIDTH / 10)); i++) {
    grids.lineStyle(1, 0xffffff);
    grids.moveTo(0, (CANVAS_WIDTH / 10) * i);
    grids.lineTo(CANVAS_WIDTH, (CANVAS_WIDTH / 10) * i);
  }
  return grids;
};

export const useStage = () => {
  useEffect(() => {
    const app = new PIXI.Application<HTMLCanvasElement>({
      background: "#333333",
      resizeTo: window,
    });

    const container = createMainContainer();
    const grids = createGrids();

    container.addChild(grids);
    app.stage.addChild(container);

    document.body.appendChild(app.view);
    return () => {
      document.body.removeChild(app.view);
    };
  }, []);
};
