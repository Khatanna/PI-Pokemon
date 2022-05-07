import React, { Fragment } from "react";
import styles from "../styles/SearchBar.module.css";
import logo from "../assets/pokeball.png";

export default function SearchBar() {
  return (
    <Fragment>
      <div className={styles.logo}>
        <img src={logo} alt="" width={60} />
        <h1>Pokemon</h1>
      </div>
      <div className={styles.searchBar}>
        <input type="text" className={styles.input} />
        <button className={styles.button}>Buscar</button>
      </div>
    </Fragment>
  );
}
