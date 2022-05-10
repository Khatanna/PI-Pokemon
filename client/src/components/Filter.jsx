import React, { Fragment } from "react";
import styles from "../styles/Filter.module.css";

export default function Filter() {
  return (
    <Fragment>
      <div className={styles["filter-container"]}>
        <select name="" id="" className={styles.filter}>
          <option value="name">filter of name [A-Z]</option>
          <option value="type">filter of name [Z-A]</option>
          <option value="attack">filter of attack</option>
          <option value="created">created by you</option>
          <option value="created">for types</option>
        </select>
      </div>
    </Fragment>
  );
}
