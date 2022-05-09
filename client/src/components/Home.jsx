import React, { Fragment, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList } from "../redux/actions";
import { Link } from "react-router-dom";

export default function Home() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const listOfPokemon = useSelector((state) => state.pokemonList);
  useEffect(() => {
    dispatch(getPokemonList(page));

    return () => {
      dispatch(getPokemonList(1));
    };
  }, [dispatch, page]);

  const handlePage = (e) => {
    if (e.target.id === "next") {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };
  const goPage = () => {
    if (input === "") {
      setPage(1);
    } else if (+input > Math.ceil(1126 / 40)) {
      alert("Page does not exist");
    } else {
      setPage(+input);
      setInput("");
      dispatch(getPokemonList(input));
    }
  };

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
                </Link>
              </div>
            );
          })}
        </div>
        <div className={styles.pagination}>
          {page > 1 ? (
            <button onClick={handlePage}>Previous</button>
          ) : (
            <button disabled>Previous</button>
          )}
          <b>{page}</b>
          <button onClick={handlePage} id={"next"}>
            Next
          </button>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={goPage}>Ir</button>
        </div>
      </div>
    </Fragment>
  );
}
