import React, { Fragment, useState } from "react";
import styles from "../styles/Filter.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrder,
  clearPokemonList,
  setPage,
  clearError,
  getTypes,
  pushInFilterTypes,
  removeFromFilterTypes,
} from "../redux/actions";

export default function Filter() {
  const dispatch = useDispatch();
  const [list, setList] = useState(false);
  const { types, filterTypes } = useSelector((state) => state);

  const handleOption = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      dispatch(setOrder(null));
    } else if (e.target.value === "types") {
      dispatch(getTypes());

      setList(!list);
      e.target.selectedIndex = 0;
      return;
    } else {
      dispatch(setPage(1));
      dispatch(setOrder(e.target.value));
    }
    dispatch(clearPokemonList());
    dispatch(clearError());
  };

  const handleChange = (e, name) => {
    if (e.target.checked) {
      dispatch(pushInFilterTypes(name));
      dispatch(setOrder("types"));
    } else {
      console.log(filterTypes.length);
      dispatch(removeFromFilterTypes(name));
      if (filterTypes.length === 1) {
        dispatch(setOrder(null));
      }
    }
    dispatch(clearPokemonList());
  };

  return (
    <Fragment>
      <div className={styles["filter-container"]}>
        <Link to="/create" className={styles.link}>
          Create pokemon
        </Link>
        <div className={styles.selects}>
          <select
            name=""
            id=""
            className={styles.filter}
            onChange={handleOption}
          >
            <option disabled>Filter by</option>
            <option value="default">Default</option>
            <option value="created">Created by you</option>
            <option value="types">By types</option>
          </select>
          <select
            name=""
            id=""
            className={styles.filter}
            onChange={handleOption}
          >
            <option disabled>Order by</option>
            <option value="default">Default</option>
            <option value="name_asc">Order by name ascendent</option>
            <option value="name_desc">Order by name descendent</option>
            <option value="attack_ascendent">Order by attack ascendent</option>
            <option value="attack_descendent">
              Order by attack descendent
            </option>
          </select>
        </div>
      </div>
      {list && (
        <div className={styles["container-types"]}>
          {types?.map(({ name }) => (
            <div className={styles.types} key={name}>
              <label htmlFor={name}>{name}</label>
              <input type="checkbox" onChange={(e) => handleChange(e, name)} />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}
