import React, { Fragment, useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search) {
      navigate(`/search/${search}`);
      setSearch("");
    } else {
      alert("Please enter a pokemon name");
    }
  };

  const handleChange = ({ target }) => {
    if (search.length < 20) {
      setSearch(target.value.trim().replace(/[0-9]/g, ""));
    }
  };

  return (
    <Fragment>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          onChange={handleChange}
          value={search}
        />
        <button className={styles.button}>Search</button>
      </form>
    </Fragment>
  );
}
