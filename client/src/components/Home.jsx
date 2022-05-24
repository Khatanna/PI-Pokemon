import React, { Fragment, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemonByTypes } from "../redux/actions";
import PokemonList from "./PokemonList";
import NavBar from "./NavBar";
import Filter from "./Filter";

export default function Home() {
  const dispatch = useDispatch();
  const { page, filterTypes } = useSelector((state) => state);
  useEffect(() => {
    if (filterTypes.length > 0) {
      dispatch(filterPokemonByTypes(page, filterTypes));
    }
  }, [dispatch, page, filterTypes]);

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
