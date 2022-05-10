import React, { Fragment, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList } from "../redux/actions";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";
import Filter from "./Filter";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { pokemonList, page } = state;
  const [pending, setPending] = useState(true);
  useEffect(() => {
    dispatch(getPokemonList(page));
    setPending(true);
  }, [dispatch, page]);

  return (
    <Fragment>
      <div className={styles.App}>
        <Filter />
        <hr />
        {pokemonList.length > 1 && pending ? (
          <div>
            <div className={styles.pokemons}>
              {pokemonList.map((pokemon) => {
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
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>
    </Fragment>
  );
}
