import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/pokeball.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList, setOrderBy } from "../redux/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const orderBy = useSelector((state) => state.orderBy);
  const handleOption = (e) => {
    e.preventDefault();
    if (e.target.value === "attack") {
      dispatch(setOrderBy("attack"));
      dispatch(getPokemonList(page, orderBy, true));
    }
  };

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
        <SearchBar />
      </div>
    </Fragment>
  );
}
