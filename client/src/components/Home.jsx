import React, { Fragment, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList, filterPokemon } from "../redux/actions";
import PokemonList from "./PokemonList";
import NavBar from "./NavBar";
import Filter from "./Filter";

export default function Home() {
  const dispatch = useDispatch();
  const { page, order } = useSelector((state) => state);
  useEffect(() => {
    if (!order) {
      dispatch(getPokemonList(page));
    } else {
      dispatch(filterPokemon(page, order));
    }
  }, [dispatch, order, page]);

  return (
    <Fragment>
      <NavBar />
      <div className={styles.App}>
        <Filter />
        <PokemonList />
      </div>
    </Fragment>
  );
}
