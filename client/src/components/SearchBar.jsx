import React, { Fragment, useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../redux/actions";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  //  const pokemon = useSelector((state) => state.pokemon);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(search));
    setSearch("");
  };

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
