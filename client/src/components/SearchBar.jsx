import React, { Fragment, useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { useDispatch } from "react-redux";
import {
  getPokemonByName,
  clearPokemonList,
  clearPokemon,
} from "../redux/actions";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const getPokemon = (e) => {
    e.preventDefault();
    if (search.length === 0) {
      return;
    }
    dispatch(clearPokemon());
    dispatch(getPokemonByName(search));
    dispatch(clearPokemonList());
    setSearch("");
  };

  return (
    <Fragment>
      <form className={styles.searchBar} action="" onSubmit={getPokemon}>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className={styles.button}>Search</button>
      </form>
    </Fragment>
  );
}
