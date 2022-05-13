import React, { Fragment } from "react";
import Paginator from "./Paginator";
import ScreenLoading from "./ScreenLoading";
import styles from "../styles/PokemonList.module.css";
import Pokemon from "./Pokemon";
import RecentSearch from "./RecentSearch";
import Creates from "./Creates";
import { useSelector } from "react-redux";

export default function PokemonList() {
  const { pokemonList, creates } = useSelector((state) => state);
  if (typeof pokemonList[0] === "string") {
    return (
      <Fragment>
        <h1 className={styles.creates}>{pokemonList[0]}</h1>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {creates.length ? (
        <Fragment>
          <Creates />
        </Fragment>
      ) : null}
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
