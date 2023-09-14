import { RefObject, useEffect } from "react";
import { initStage } from "./initStage";

export const useStage = (parent: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const unload = initStage(parent.current);
    return () => {
      unload();
    };
  }, [parent]);
};
