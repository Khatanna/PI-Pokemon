import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/PokemonList.module.css";
import { useSelector } from "react-redux";
import pokeball from "../assets/pokeball.png";

export default function Pokemon({
  pokemon: { id, name, types, sprite, stats },
}) {
  const { error } = useSelector((state) => state);

  return (
    <Fragment>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className={styles[types[0]] + " " + styles.pokemon} key={id}>
          <Link to={`/pokemon/${id}`} className={styles.link}>
            <div>{name}</div>
            <img
              src={sprite || pokeball}
              alt={name}
              className={styles.imgPokemon}
            />
            <div className={styles.types}>
              {types.length > 1 ? (
                <Fragment>Types: </Fragment>
              ) : (
                <Fragment>Type: </Fragment>
              )}
              {types.map((type) => (
                <span key={type} className={styles[type] + " " + styles.tag}>
                  {type}
                </span>
              ))}
            </div>
            <div>
              Attack:{" "}
              {stats.find(({ stat }) => stat.name === "attack").base_stat}
            </div>
          </Link>
        </div>
      )}
    </Fragment>
  );
}
