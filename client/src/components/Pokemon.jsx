import React, { Fragment } from "react";
import styles from "../styles/Pokemon.module.css";

export default function Pokemon({ name }) {
  return (
    <Fragment>
      <div className={styles.card}>
        Nombre: {name} <br />
      </div>
    </Fragment>
  );
}
