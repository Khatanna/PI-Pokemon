import React, { Fragment, useState, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName, pushInRecentSearch } from "../redux/actions";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const { pokemon } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(search));
    setSearch("");
  };
  useEffect(() => {
    if (Object.keys(pokemon).length > 0) {
      dispatch(pushInRecentSearch(pokemon));
    }
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
