import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/pokeball.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Fragment>
      <div className={styles["nav-container"]}>
        <Link to="/home" className={styles.link}>
          <div className={styles.logo}>
            <img src={logo} alt="" width={60} />
            <h1>Pokemon</h1>
          </div>
        </Link>
        <Link to="/create" className={styles.link}>
          Crear pokemon
        </Link>
        <div className={styles.filter}>
          <select name="" id="">
            <option value="">Filtrar por nombre [A-Z]</option>
            <option value="">Filtrar por tipo</option>
            <option value="">Filtrar por daño</option>
          </select>
        </div>
        <SearchBar />
      </div>
    </Fragment>
  );
}
