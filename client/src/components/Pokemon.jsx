import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PokemonList.module.css";

export default function Pokemon({ pokemon }) {
  if (pokemon.message) {
    return <h1>{pokemon.message}</h1>;
  }
  const types = pokemon.types.map(({ type }) => type.name);
  return (
    <Fragment>
      <div
        className={styles[pokemon.types[0].type.name] + " " + styles.pokemon}
        key={pokemon.id}
      >
        <Link to={`${pokemon.id}`} className={styles.link}>
          <div>{pokemon.name}</div>
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
            className={styles.imgPokemon}
          />
          <div>
            {types.length > 1 ? (
              <Fragment>Types: </Fragment>
            ) : (
              <Fragment>Type: </Fragment>
            )}
            {types.map((type) => {
              return (
                <span key={type} className={styles[type] + " " + styles.tag}>
                  {type}
                </span>
              );
            })}
          </div>
          <div>Attack: {pokemon.stats[1].base_stat}</div>
        </Link>
      </div>
    </Fragment>
  );
}
