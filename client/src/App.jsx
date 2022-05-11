import { Fragment } from "react";
import styles from "./styles/App.module.css";
import logo from "./assets/pokeball.png";
import { Link } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <div className={styles.landing}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className={styles.start}>
          <h1>
            <span className={styles.title}>PI - Pokemon</span>
          </h1>
          <Link to="/home" className={styles.link}>
            Start!
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
