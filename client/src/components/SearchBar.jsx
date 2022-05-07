import React, { Fragment } from "react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
  return (
    <Fragment>
      <div className={styles.searchBar}>
        <input type="text" className={styles.input} />
        <button className={styles.button}>Buscar</button>
      </div>
    </Fragment>
  );
}
