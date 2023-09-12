import { useEffect } from "react";
import { initStage } from "./initStage";

export const useStage = () => {
  useEffect(() => {
    const app = initStage();
    return () => {
      document.body.removeChild(app.view);
    };
  }, []);
};
