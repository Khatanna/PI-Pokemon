import React, { Fragment, useEffect } from "react";
import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList } from "../redux/actions";
import Pokemon from "./Pokemon";

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
          {listOfPokemon.map((pokemon, index) => (<Pokemon
              key={index}
              name={pokemon.name}
              id={index + 1}
            />))}
        </div>
      </div>
    </Fragment>
  );
}
