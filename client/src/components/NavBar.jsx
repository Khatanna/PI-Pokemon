import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/pokeball.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Fragment>
      <div className={styles["nav-container"]}>
        <div className={styles.logo}>
          <img src={logo} alt="" width={60} />
          <h1>Pokemon</h1>
        </div>
        <Link to="/create">Crear pokemon</Link>
        <SearchBar />
      </div>
    </Fragment>
  );
}
