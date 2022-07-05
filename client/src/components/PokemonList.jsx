import React, { Fragment, useEffect } from "react";
import Paginator from "./Paginator";
import ScreenLoading from "./ScreenLoading";
import styles from "../styles/PokemonList.module.css";
import Pokemon from "./Pokemon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getPokemonList,
  clearPokemonList,
  filterPokemon,
  clearError,
} from "../redux/actions";

export default function PokemonList() {
  const { order, page, pokemonList, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (order) {
      dispatch(filterPokemon(page, order, pokemonList));
    } else {
      dispatch(getPokemonList(page));
    }
    return () => {
      dispatch(clearPokemonList());
      dispatch(clearError());
    };
  }, [dispatch, page, order]);

  return (
    <Fragment>
      {pokemonList.length !== 0 ? (
        <Fragment>
          <div className={styles.pokemons}>
            <hr />
            {pokemonList.map((pokemon) => (
              <Pokemon pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
          <Paginator />
        </Fragment>
      ) : !error ? (
        <ScreenLoading />
      ) : (
        <div className={styles.creates}>
          <h1>{error}</h1>
        </div>
      )}
    </Fragment>
  );
}
