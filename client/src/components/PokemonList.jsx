import React, { Fragment } from "react";
import Paginator from "./Paginator";
import ScreenLoading from "./ScreenLoading";
import styles from "../styles/PokemonList.module.css";
import Pokemon from "./Pokemon";
import { useSelector } from "react-redux";
export default function PokemonList() {
  const { pokemonList, error } = useSelector((state) => state);

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
