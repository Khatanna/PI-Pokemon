import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Fragment>
      <div className={styles["nav-container"]}>
        <div className={styles.nav}>
          <div className={styles.links}>
            <NavLink to="/" className={styles.link}>
              <div className={styles.logo}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
                  alt=""
                  width={180}
                />
              </div>
            </NavLink>
            <NavLink to="/home" className={styles.link + " " + styles.home}>
              Home
            </NavLink>
          </div>
          <SearchBar />
        </div>
      </div>
    </Fragment>
  );
}
