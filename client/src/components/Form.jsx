import React, { Fragment, useState } from "react";
import styles from "../styles/Form.module.css";
import { useDispatch } from "react-redux";
import { createPokemon } from "../redux/actions";

function validateForm(data) {
  const errors = {};
  // if (!data.name) {
  //   errors.name = "El nombre es obligatorio";
  // }

  // if (!data.attack) {
  //   errors.attack = "El ataque es obligatorio";
  // }

  // if (!data.defense) {
  //   errors.defense = "La defensa es obligatoria";
  // }

  // if (!data.speed) {
  //   errors.speed = "La velocidad es obligatoria";
  // }

  // if (!data.height) {
  //   errors.height = "La altura es obligatoria";
  // }

  // if (!data.weight) {
  //   errors.weight = "El peso es obligatorio";
  // }
  console.log(data);

  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    name: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError(
      validateForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(
      validateForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    );

    if (Object.keys(error).length === 0) {
      try {
        dispatch(createPokemon(form));
      } catch (e) {
        alert(e);
      } finally {
        setForm({
          name: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
        });
        alert("Pokemon creado");
      }
    } else {
      alert("Por favor, llena todos los campos");
    }
  };

  return (
    <Fragment>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Crea tu pokimon</h1>
        <div className={styles.field}>
          <label htmlFor="name">Name: </label>
          <input
            className={error.name && styles.danger}
            id="name"
            type="text"
            placeholder="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        {error.name && <p className={styles.danger}>{error.name}</p>}
        <div className={styles.field}>
          <label htmlFor="attack">Attack: </label>
          <input
            className={error.attack && styles.danger}
            id="attack"
            type="text"
            placeholder="attack"
            name="attack"
            value={form.attack}
            onChange={handleChange}
          />
        </div>
        {error.attack && <p className={styles.danger}>{error.attack}</p>}
        <div className={styles.field}>
          <label htmlFor="defense">Defense: </label>
          <input
            className={error.defense && styles.danger}
            id="defense"
            type="text"
            placeholder="defense"
            name="defense"
            value={form.defense}
            onChange={handleChange}
          />
        </div>
        {error.defense && <p className={styles.danger}>{error.defense}</p>}
        <div className={styles.field}>
          <label htmlFor="speed">Speed: </label>
          <input
            className={error.speed && styles.danger}
            id="speed"
            type="text"
            placeholder="speed"
            name="speed"
            value={form.speed}
            onChange={handleChange}
          />
        </div>
        {error.speed && <p className={styles.danger}>{error.speed}</p>}
        <div className={styles.field}>
          <label htmlFor="height">Height: </label>
          <input
            className={error.height && styles.danger}
            id="height"
            type="text"
            placeholder="height"
            name="height"
            value={form.height}
            onChange={handleChange}
          />
        </div>
        {error.height && <p className={styles.danger}>{error.height}</p>}
        <div className={styles.field}>
          <label htmlFor="weight">Weight: </label>
          <input
            className={error.weight && styles.danger}
            id="weight"
            type="text"
            placeholder="weight"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
        </div>
        {error.weight && <p className={styles.danger}>{error.weight}</p>}
        <button>Crear Pokemon</button>
      </form>
    </Fragment>
  );
}
