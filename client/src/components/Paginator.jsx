import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, clearPokemonList, getCount } from "../redux/actions";
import styles from "../styles/Paginator.module.css";

export default function Paginator() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { page, count, pokemonList } = useSelector((state) => state);
  const limit = Math.ceil(
    count - (count + pokemonList.length) < 0 ? count / 12 : (count - count) / 12
  );

  useEffect(() => {
    dispatch(getCount());
    if (input < 1 || input > limit) {
      setInput("");
    }
  }, [dispatch, input, limit]);

  const handlePage = (e) => {
    const options = {
      next: () => dispatch(setPage(page + 1)),
      previous: () => dispatch(setPage(page - 1)),
      clear: () => dispatch(clearPokemonList()),
    };
    options[e.target.id]();
    options.clear();
  };

  const goToPage = () => {
    if (+input === page) {
      setInput("");
    } else {
      dispatch(setPage(+input));
      dispatch(clearPokemonList());
    }
  };

  return (
    <Fragment>
      <div className={styles.pagination}>
        {page > 1 ? (
          <button onClick={handlePage} id="previous">
            Previous
          </button>
        ) : (
          <button disabled>Previous</button>
        )}
        <b>{page}</b>
        {page < limit ? (
          <button onClick={handlePage} id="next">
            Next
          </button>
        ) : (
          <button disabled>Next</button>
        )}
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input !== "" ? (
          <button onClick={goToPage}>Go</button>
        ) : (
          <button disabled>Go</button>
        )}
      </div>
    </Fragment>
  );
}
