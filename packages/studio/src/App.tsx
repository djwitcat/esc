import { useStage } from "./stage";
import Logo from "../assets/logo.png";
import styles from "./App.module.css";
import { Provider, darkTheme } from "@adobe/react-spectrum";
import { LB } from "./components/LB";

function App() {
  useStage();

  return (
    <Provider theme={darkTheme}>
      <LB />
      <img src={Logo} className={styles.logo} />
    </Provider>
  );
}

export default App;
