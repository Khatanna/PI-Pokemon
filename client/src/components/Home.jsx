import React, { Fragment, useEffect } from "react";
import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList } from "../redux/actions";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const listOfPokemon = useSelector((state) => state.pokemonList);
  useEffect(() => {
    dispatch(getPokemonList());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={styles.App}>
        <NavBar />
        <div className={styles.pokemons}>
          {listOfPokemon.map((pokemon) => {
            let type = pokemon.types[0].type.name;
            return (
              <div className={styles[type] + " " + styles.pokemon}>
                <Link to={`${pokemon.id}`} className={styles.link}>
                  <div>{pokemon.name}</div>
                  <img src={pokemon.sprites.front_default} alt="" />
                  <div>{type}</div>
                </Link>
              </div>
            );
          })}
        </div>
        <select name="" id="">
          <option value="">Filtrar por nombre [A-Z]</option>
          <option value="">Filtrar por tipo</option>
          <option value="">Filtrar por daño</option>
        </select>
      </div>
    </Fragment>
  );
}
