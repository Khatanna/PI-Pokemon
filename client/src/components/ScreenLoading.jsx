import React, { Fragment } from "react";
import styles from "../styles/ScreenLoading.module.css";

export default function ScreenLoading() {
  return (
    <Fragment>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    </Fragment>
  );
}
