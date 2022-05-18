import React, { Fragment, useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError } from "../redux/actions";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
    dispatch(clearError());
    setSearch("");
  };

  return (
    <Fragment>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => setSearch(e.target.value.trim())}
          value={search}
        />
        <button className={styles.button}>Search</button>
      </form>
    </Fragment>
  );
}
