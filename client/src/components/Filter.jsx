import React, { Fragment } from "react";
import styles from "../styles/Filter.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, clearPokemonList, setPage } from "../redux/actions";

export default function Filter() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);
  const handleOption = (e) => {
    e.preventDefault();
    if (e.target.value === order) {
      return;
    }
    if (e.target.value === "default") {
      dispatch(setOrder(null));
    } else {
      dispatch(setPage(1));
      dispatch(setOrder(e.target.value));
    }
    dispatch(clearPokemonList());
  };

  return (
    <Fragment>
      <div className={styles["filter-container"]}>
        <Link to="/create" className={styles.link}>
          Create pokemon
        </Link>
        <select name="" id="" className={styles.filter} onChange={handleOption}>
          <option value="default">Filters...</option>
          <option value="name_asc">Filter of name [A-Z]</option>
          <option value="name_desc">Filter of name [Z-A]</option>
          <option value="attack_ascendent">Filter of attack ascendent</option>
          <option value="attack_descendent">Filter of attack descendent</option>
          <option value="created">Created by you</option>
          <option value="type">For types</option>
        </select>
      </div>
    </Fragment>
  );
}
