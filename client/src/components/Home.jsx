import React, { Fragment, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList } from "../redux/actions";
import { Link } from "react-router-dom";
import Paginator from "./Paginator";

export default function Home() {
  const dispatch = useDispatch();
  const listOfPokemon = useSelector((state) => state.pokemonList);
  const page = useSelector((state) => state.page);
  const orderBy = useSelector((state) => state.orderBy);
  useEffect(() => {
    dispatch(getPokemonList(page, orderBy));
    return () => {
      dispatch(getPokemonList(1, "", true));
    };
  }, [dispatch, page, orderBy]);

  return (
    <Fragment>
      <div className={styles.App}>
        <div className={styles.pokemons}>
          {listOfPokemon.map((pokemon) => {
            let type = pokemon.types[0].type.name;
            return (
              <div
                className={styles[type] + " " + styles.pokemon}
                key={pokemon.id}
              >
                <Link to={`${pokemon.id}`} className={styles.link}>
                  <div>{pokemon.name}</div>
                  <img src={pokemon.sprites.front_default} alt="" />
                  <div>Type: {type}</div>
                  <div>Attack: {pokemon.stats[1].base_stat}</div>
                </Link>
              </div>
            );
          })}
        </div>
        <Paginator />
      </div>
    </Fragment>
  );
}
