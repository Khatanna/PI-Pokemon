import React, { Fragment, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList, filterPokemonByName } from "../redux/actions";

import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon";
import NavBar from "./NavBar";
import Filter from "./Filter";

export default function Home() {
  const dispatch = useDispatch();
  const { page, order, pokemon } = useSelector((state) => state);
  const length = Object.keys(pokemon).length;
  useEffect(() => {
    if (length !== 0) {
      return;
    }
    if (!order) {
      return dispatch(getPokemonList(page));
    } else {
      return dispatch(filterPokemonByName(page, order));
    }
  }, [page, order, length]);

  return (
    <Fragment>
      <NavBar />
      <div className={styles.App}>
        <Filter />
        <hr />
        {length ? (
          <Fragment>
            <div className={styles["btn-volver"]}>
              <button onClick={() => dispatch(getPokemonList(page))}>
                Volver
              </button>
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
