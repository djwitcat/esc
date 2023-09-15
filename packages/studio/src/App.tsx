import { useStage } from "./stage";
import Logo from "../assets/logo.png";
import styles from "./App.module.css";
import { Provider, darkTheme } from "@adobe/react-spectrum";
import { LB } from "./components/LB";
import { useRef } from "react";

function App() {
  const stageParent = useRef<HTMLDivElement>(null);
  useStage(stageParent);
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
