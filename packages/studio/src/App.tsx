import { useStage } from "./stage";
import Logo from "../assets/logo.png";
import styles from "./App.module.css";
import { Provider, darkTheme } from "@adobe/react-spectrum";
import { Tools } from "./parts/Tools";
import { useRef } from "react";
import {ToastContainer} from '@react-spectrum/toast'

function App() {
  const stageParent = useRef<HTMLDivElement>(null);
  useStage(stageParent);
  return (
    <Provider theme={darkTheme}>
      <div className={styles.container}>
        <div className={styles.main} ref={stageParent}>
          <Tools />
          <img src={Logo} className={styles.logo} />
        </div>
      </div>
      <ToastContainer />
    </Provider>
  );
}

export default App;
