import { Graphics } from "@pixi/react";
import { ComponentProps, useCallback } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

type DrawFunc = NonNullable<ComponentProps<typeof Graphics>["draw"]>;

export const Grids = () => {
  const draw: DrawFunc = useCallback((g) => {
    g.clear();
    // 把 CANVAS_WIDTH 分成 10 份，画白色竖线
    for (let i = 0; i <= 10; i++) {
      g.lineStyle(1, 0xffffff);
      g.moveTo((CANVAS_WIDTH / 10) * i, 0);
      g.lineTo((CANVAS_WIDTH / 10) * i, CANVAS_HEIGHT);
    }
    // 从顶部开始画横线，每条线间隔为 CANVAS_WIDTH/10
    for (let i = 0; i <= Math.floor(CANVAS_HEIGHT / (CANVAS_WIDTH / 10)); i++) {
      g.lineStyle(1, 0xffffff);
      g.moveTo(0, (CANVAS_WIDTH / 10) * i);
      g.lineTo(CANVAS_WIDTH, (CANVAS_WIDTH / 10) * i);
    }
  }, []);

  return <Graphics draw={draw} />;
};
