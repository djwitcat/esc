import { useEffect } from "react";
import { initStage } from "./initStage";

export const useStage = () => {
  useEffect(() => {
    const unload = initStage();
    return () => {
      unload();
    };
  }, []);
};
