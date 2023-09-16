import { useStage } from "./stage";
import Logo from "../assets/logo.png";
import styles from "./App.module.css";
import { Provider, darkTheme } from "@adobe/react-spectrum";
import { LB } from "./components/LB";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { MODE, store } from "./store";
import { BRICK, presetBrickInfo } from "./presets";
import { Key } from "ts-key-enum";

const useShortcuts = () => {
  useHotkeys(Key.Escape, () => {
    const mode = store.getState().editor.mode;
    switch (mode) {
      case MODE.CREATE:
        store.setState(() => ({
          editor: { mode: MODE.NORMAL, creating: null },
        }));
        break;
    }
  });

  useHotkeys(
    Object.keys(presetBrickInfo).map((k) => `${Key.Shift}+${k}`),
    ({ key }) =>
      store.setState(() => ({
        editor: { mode: MODE.CREATE, creating: key as BRICK },
      }))
  );
};

function App() {
  const stageParent = useRef<HTMLDivElement>(null);
  useStage(stageParent);
  useShortcuts();
  return (
    <Provider theme={darkTheme}>
      <div className={styles.container}>
        <div className={styles.main} ref={stageParent}>
          <LB />
          <img src={Logo} className={styles.logo} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
