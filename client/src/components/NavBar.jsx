import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <Fragment>
      <div className={styles['nav-container']}>
        <SearchBar />
      </div>
    </Fragment>
  );
}
