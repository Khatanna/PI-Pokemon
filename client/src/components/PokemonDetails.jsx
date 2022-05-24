import React, { Fragment, useEffect } from "react";
import styles from "../styles/PokemonDetails.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById, clearPokemonDetail } from "../redux/actions";
import ScreenLoading from "./ScreenLoading";
import NavBar from "./NavBar";
import pokeball from "../assets/pokeball.svg";

export default function PokemonDetails() {
  const dispatch = useDispatch();
  const { pokemonDetail: pokemon } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonById(id));
    return () => {
      dispatch(clearPokemonDetail());
    };
  }, [dispatch, id]);

  const image = pokemon?.sprites?.other?.dream_world?.front_default || pokeball;

  return (
    <Fragment>
      <NavBar />
      {Object.keys(pokemon).length ? (
        <Fragment>
          <div className={styles.container}>
            <div className={styles.pokemon}>
              <div className={styles.pokemon__image}>
                <img src={image} alt={pokemon.name} />
              </div>
              <div className={styles.pokemon__info}>
                <h1 className={styles.pokemon__name}>
                  {pokemon.name}
                  <div className={styles.delete}>Eliminar</div>
                </h1>
                <div className={styles.weight__height}>
                  <div>Weight: {pokemon.weight / 100} Kg</div>
                  <div>Height: {pokemon.height / 10} Mts</div>
                </div>
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
                      <div className={styles.stat_bar}>
                        <span className={styles.bar__container}>
                          <progress
                            value={stat.base_stat}
                            max={150}
                            className={styles.bar}
                          />
                        </span>
                        <span className={styles.pokemon__stat__value}>
                          {stat.base_stat}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
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
