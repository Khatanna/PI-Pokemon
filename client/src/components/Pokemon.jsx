import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PokemonList.module.css";
import { useDispatch } from "react-redux";
import { clearPokemonList } from "../redux/actions";

export default function Pokemon({ pokemon }) {
  const dispatch = useDispatch();

  if (pokemon.message) {
    return <h1>{pokemon.message}</h1>;
  }

  const types = pokemon.types.map(({ type }) => type.name);
  const image =
    pokemon?.sprites?.other?.dream_world?.front_default ||
    "https://pngimg.com/uploads/pokeball/small/pokeball_PNG33.png";
  return (
    <Fragment>
      <div
        className={styles[pokemon.types[0].type.name] + " " + styles.pokemon}
        key={pokemon.id}
      >
        <Link
          to={`${pokemon.id}`}
          className={styles.link}
          onClick={() => dispatch(clearPokemonList())}
        >
          <div>{pokemon.name}</div>
          <img src={image} alt={pokemon.name} className={styles.imgPokemon} />
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
          <div>
            Attack:{" "}
            {pokemon.stats.find(({ stat }) => stat.name === "attack").base_stat}
          </div>
        </Link>
      </div>
    </Fragment>
  );
}
