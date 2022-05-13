import React, { Fragment, useEffect } from "react";
import styles from "../styles/PokemonDetails.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, clearPokemon } from "../redux/actions";
import ScreenLoading from "./ScreenLoading";
import NavBar from "./NavBar";

export default function PokemonDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pokemon } = useSelector((state) => state);
  const length = Object.keys(pokemon).length;
  useEffect(() => {
    dispatch(getPokemonById(id));
    return () => {
      dispatch(clearPokemon());
    };
  }, [dispatch, id]);

  const image =
    pokemon?.sprites?.other?.dream_world?.front_default ||
    "https://img.joomcdn.net/613c9b0883fd80f129f181b983fe213ef168f559_original.jpeg";

  return (
    <Fragment>
      <NavBar />
      {length ? (
        <Fragment>
          <div className={styles.pokemon}>
            <div className={styles.pokemon__image}>
              <img src={image} alt={pokemon.name} />
            </div>
            <div className={styles.pokemon__info}>
              <h1 className={styles.pokemon__name}>{pokemon.name}</h1>
              <div className={styles.pokemon__types}>
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={styles.pokemon__type}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className={styles.pokemon__stats}>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className={styles.pokemon__stat}>
                    <span className={styles.pokemon__stat__name}>
                      {stat.stat.name}:
                    </span>
                    <span className={styles.pokemon__stat__value}>
                      {stat.base_stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <ScreenLoading />
      )}
    </Fragment>
  );
}
