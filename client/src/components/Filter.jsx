import React, { Fragment, useState, useEffect } from "react";
import styles from "../styles/Filter.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrder,
  setPage,
  clearError,
  getTypes,
  getCount,
  pushInFilterTypes,
  removeFromFilterTypes,
  clearPokemonList,
  getPokemonList,
  clearFilterTypes,
} from "../redux/actions";

export default function Filter() {
  const dispatch = useDispatch();
  const [list, setList] = useState(false);
  const { error, types, filterTypes } = useSelector((state) => state);

  useEffect(() => {
    return () => {
      dispatch(setOrder(null));
      dispatch(clearError());
      dispatch(clearFilterTypes());
    };
  }, [dispatch]);

  const handleOption = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      dispatch(setOrder(null));
      dispatch(getCount());
    } else if (e.target.value === "types") {
      dispatch(getTypes());
      if (error && !list) {
        dispatch(clearError());
        dispatch(setOrder(null));
      }
      setList(!list);
      e.target.selectedIndex = 0;
      return;
    } else {
      setList(false);
      dispatch(setPage(1));
      dispatch(setOrder(e.target.value));
    }
  };

  const handleChange = (e, name) => {
    dispatch(clearError());
    dispatch(clearPokemonList());
    if (e.target.checked) {
      dispatch(pushInFilterTypes(name));
      dispatch(clearPokemonList());
    } else {
      dispatch(removeFromFilterTypes(name));
      if (filterTypes.length === 1) {
        dispatch(getPokemonList());
        dispatch(getCount());
      }
    }
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
