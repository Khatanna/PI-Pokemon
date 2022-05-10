import React, { Fragment } from "react";
import styles from "../styles/Filter.module.css";

export default function Filter() {
  return (
    <Fragment>
      <div className={styles["filter-container"]}>
        <select name="" id="" className={styles.filter}>
          <option value="name">Filtrar por nombre [A-Z]</option>
          <option value="type">Filtrar por tipo</option>
          <option value="attack">Filtrar por daño</option>
        </select>
      </div>
    </Fragment>
  );
}
