import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import styles from "../styles/PokemonList.module.css";

export default function RecentSearch() {
  const { creates } = useSelector((state) => state);

  return (
    <Fragment>
      <h3 className={styles.recent}>Recientemente creados</h3>
      <div className={styles.pokemons}>
        {creates.map((pokemon) => (
          <Pokemon pokemon={pokemon} />
        ))}
      </div>
      <hr />
    </Fragment>
  );
}
