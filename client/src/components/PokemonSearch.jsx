import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getPokemonByName,
  clearPokemonSearch,
  clearError,
} from "../redux/actions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import ScreenLoading from "./ScreenLoading";
import NavBar from "./NavBar";
import styles from "../styles/PokemonSearch.module.css";

export default function PokemonSearch() {
  const { pokemonSearch, error } = useSelector((state) => state);
  const { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonByName(name));
    return () => {
      dispatch(clearError());
      dispatch(clearPokemonSearch());
    };
  }, [name, dispatch]);

  return (
    <Fragment>
      <NavBar />
      <div className={styles.pokemon}>
        {error ? (
          <h1>{error}</h1>
        ) : Object.keys(pokemonSearch).length ? (
          <Pokemon pokemon={pokemonSearch} />
        ) : (
          <ScreenLoading />
        )}
      </div>
    </Fragment>
  );
}
