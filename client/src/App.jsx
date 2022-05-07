import { Fragment } from "react";
import styles from "./styles/App.module.css";
import NavBar from "./components/NavBar";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <Fragment>
      <div className={styles.App}>
        <NavBar />
      </div>

      <Pokemon />
    </Fragment>
  );
}

export default App;
