import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, clearPokemonSearch } from "../redux/actions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import ScreenLoading from "./ScreenLoading";
import NavBar from "./NavBar";
import styles from "../styles/PokemonSearch.module.css";

export default function PokemonSearch() {
  const { pokemonSearch: pokemon, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch(getPokemonByName(name));
    return () => {
      dispatch(clearPokemonSearch());
    };
  }, [name]);

  return (
    <Fragment>
      <NavBar />
      <div className={styles.pokemon}>
        {error ? (
          <h1>{error}</h1>
        ) : Object.keys(pokemon).length ? (
          <Pokemon pokemon={pokemon} />
        ) : (
          <ScreenLoading />
        )}
      </div>
    </Fragment>
  );
}
