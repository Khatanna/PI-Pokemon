import React, { Fragment } from "react";
import Paginator from "./Paginator";
import ScreenLoading from "./ScreenLoading";
import styles from "../styles/PokemonList.module.css";
import Pokemon from "./Pokemon";
import RecentSearch from "./RecentSearch";
import { useSelector } from "react-redux";

export default function PokemonList() {
  const { pokemonList } = useSelector((state) => state);
  return (
    <Fragment>
      {pokemonList.length !== 0 ? (
        <Fragment>
          <RecentSearch />
          <div className={styles.pokemons}>
            {pokemonList.map((pokemon) => (
              <Pokemon pokemon={pokemon} key={pokemon.id} />
            ))}
          </div>
          <Paginator />
        </Fragment>
      ) : (
        <ScreenLoading />
      )}
    </Fragment>
  );
}
