import { Fragment } from "react";
import styles from "../styles/Landing.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <div className={styles.body}>
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
      </div>
    </Fragment>
  );
};

export default Landing;
