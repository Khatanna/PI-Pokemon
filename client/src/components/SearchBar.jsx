import React, { Fragment, useState, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../redux/actions";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(search));
    setSearch("");
  };

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  return (
    <Fragment>
      <form className={styles.searchBar} action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className={styles.button}>Buscar</button>
      </form>
    </Fragment>
  );
}
