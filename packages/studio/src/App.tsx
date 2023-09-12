import { useStage } from "./stage";
import Logo from "../assets/logo.png";
import styles from "./App.module.css";

function App() {
  useStage();
  return <img src={Logo} className={styles.logo} />;
}

export default App;
