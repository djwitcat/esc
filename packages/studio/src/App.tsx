import { useStage } from "./stage";
import Logo from "../assets/logo.png";
import styles from "./App.module.css";
import { Provider, ToggleButton, darkTheme } from "@adobe/react-spectrum";
import Hand from "@spectrum-icons/workflow/Hand";
import { store, useBoundedStore } from "./store";
import { useHotkeys } from "react-hotkeys-hook";

function App() {
  useStage();
  const isHandMode = useBoundedStore((states) => states.editor.handMode);
  const toggle = () =>
    store.setState((state) => ({
      editor: { handMode: !state.editor.handMode },
    }));
  useHotkeys("space", (e) => !e.repeat && toggle(), {
    keydown: true,
    keyup: true,
  });
  return (
    <Provider theme={darkTheme}>
      <div className={styles.lb} style={{ cursor: "copy" }}>
        <ToggleButton isSelected={isHandMode} onPress={() => toggle()}>
          <Hand />
        </ToggleButton>
      </div>
      <img src={Logo} className={styles.logo} />
    </Provider>
  );
}

export default App;
