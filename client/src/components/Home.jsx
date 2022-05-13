import React, { Fragment, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonList,
  filterPokemon,
  clearPokemon,
  pushInRecentSearch,
} from "../redux/actions";

import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon";
import NavBar from "./NavBar";
import Filter from "./Filter";

export default function Home() {
  const dispatch = useDispatch();
  const { page, order, pokemon } = useSelector((state) => state);
  useEffect(() => {
    if (!order) {
      dispatch(getPokemonList(page));
    } else {
      dispatch(filterPokemon(page, order));
    }
  }, [dispatch, order, page]);

  const handleReturn = () => {
    dispatch(pushInRecentSearch(pokemon));
    dispatch(getPokemonList(page));
    dispatch(clearPokemon());
  };

  return (
    <Fragment>
      <NavBar />
      <div className={styles.App}>
        <Filter />
        <hr />
        {Object.keys(pokemon).length ? (
          <Fragment>
            <div className={styles["btn-volver"]}>
              <button onClick={handleReturn}>Volver</button>
            </div>
            <div className={styles.pokemon}>
              <Pokemon pokemon={pokemon} />
            </div>
          </Fragment>
        ) : (
          <PokemonList />
        )}
      </div>
    </Fragment>
  );
}
