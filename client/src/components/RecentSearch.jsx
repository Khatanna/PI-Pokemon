import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import styles from "../styles/PokemonList.module.css";

export default function RecentSearch() {
  const { recentSearch } = useSelector((state) => state);
  return (
    <Fragment>
      {recentSearch.length !== 0 ? (
        <Fragment>
          <h3 className={styles.recent}>Buscados recientemente</h3>
          <div className={styles.pokemons}>
            {recentSearch.map((pokemon) => (
              <Pokemon pokemon={pokemon} />
            ))}
          </div>
          <hr />
        </Fragment>
      ) : null}
    </Fragment>
  );
}
