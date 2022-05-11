import React, { Fragment, useState } from "react";
import styles from "../styles/Form.module.css";
import { useDispatch } from "react-redux";
import { createPokemon } from "../redux/actions";
import NavBar from "./NavBar";

function validateForm(data) {
  const errors = {};
  if (!data.name) {
    errors.name = "El nombre es obligatorio";
  } else if (data.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  } else if (data.name.length > 15) {
    errors.name = "El nombre debe tener menos de 15 caracteres";
  } else if (data.name.match(/[^a-zA-Z0-9]/g)) {
    errors.name = "El nombre debe contener sólo caracteres alfanuméricos";
  }

  if (!data.attack) {
    errors.attack = "El ataque es obligatorio";
  } else if (data.attack.length < 1) {
    errors.attack = "El ataque debe tener al menos 1 caracter";
  } else if (data.attack.length > 10) {
    errors.attack = "El ataque debe tener menos de 10 caracteres";
  } else if (data.attack > 150) {
    errors.attack = "El ataque debe ser menor a 150";
  } else if (data.attack < 0) {
    errors.attack = "El ataque debe ser mayor a 0";
  } else if (data.attack.match(/[^a-zA-Z0-9]/g)) {
    errors.attack = "El ataque debe contener sólo caracteres alfanuméricos";
  } else if (data.attack.match(/[^0-9]/g)) {
    errors.attack = "El ataque debe contener sólo números";
  }

  if (!data.defense) {
    errors.defense = "La defensa es obligatoria";
  } else if (data.defense.length < 1) {
    errors.defense = "La defensa debe tener al menos 1 caracter";
  } else if (data.defense > 150) {
    errors.defense = "La defensa debe ser menor a 150";
  } else if (data.defense < 0) {
    errors.defense = "La defensa debe ser mayor a 0";
  } else if (data.defense.match(/[^a-zA-Z0-9]/g)) {
    errors.defense = "La defensa debe contener sólo caracteres alfanuméricos";
  } else if (data.defense.match(/[^0-9]/g)) {
    errors.defense = "La defensa debe contener sólo números";
  }

  if (!data.speed) {
    errors.speed = "La velocidad es obligatoria";
  } else if (data.speed.length < 1) {
    errors.speed = "La velocidad debe tener al menos 1 caracter";
  } else if (data.speed > 150) {
    errors.speed = "La velocidad debe ser menor a 150";
  } else if (data.speed < 0) {
    errors.speed = "La velocidad debe ser mayor a 0";
  } else if (data.speed.match(/[^a-zA-Z0-9]/g)) {
    errors.speed = "La velocidad debe contener sólo caracteres alfanuméricos";
  } else if (data.speed.match(/[^0-9]/g)) {
    errors.speed = "La velocidad debe contener sólo números";
  }

  if (!data.height) {
    errors.height = "La altura es obligatoria";
  } else if (data.height.length < 1) {
    errors.height = "La altura debe tener al menos 1 caracter";
  } else if (data.height > 150) {
    errors.height = "La altura debe ser menor a 150";
  } else if (data.height < 0) {
    errors.height = "La altura debe ser mayor a 0";
  } else if (data.height.match(/[^a-zA-Z0-9]/g)) {
    errors.height = "La altura debe contener sólo caracteres alfanuméricos";
  } else if (data.height.match(/[^0-9]/g)) {
    errors.height = "La altura debe contener sólo números";
  } else if (data.height.match(/[^0-9.]/g)) {
    errors.height = "La altura debe contener sólo números y puntos";
  }

  if (!data.weight) {
    errors.weight = "El peso es obligatorio";
  } else if (data.weight.length < 1) {
    errors.weight = "El peso debe tener al menos 1 caracter";
  } else if (data.weight > 150) {
    errors.weight = "El peso debe ser menor a 150";
  } else if (data.weight < 0) {
    errors.weight = "El peso debe ser mayor a 0";
  } else if (data.weight.match(/[^a-zA-Z0-9]/g)) {
    errors.weight = "El peso debe contener sólo caracteres alfanuméricos";
  } else if (data.weight.match(/[^0-9]/g)) {
    errors.weight = "El peso debe contener sólo números";
  } else if (data.weight.match(/[^0-9.]/g)) {
    errors.weight = "El peso debe contener sólo números y puntos";
  }

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
      <NavBar />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create - Pokemon</h2>
        <div>
          <div className={styles.field}>
            <label htmlFor="name">Name: </label>
            <input
              autoComplete="off"
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
        </div>

        <div>
          <div className={styles.field}>
            <label htmlFor="attack">Attack: </label>
            <input
              autoComplete="off"
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
        </div>

        <div>
          <div className={styles.field}>
            <label htmlFor="defense">Defense: </label>
            <input
              autoComplete="off"
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
        </div>

        <div>
          <div className={styles.field}>
            <label htmlFor="speed">Speed: </label>
            <input
              autoComplete="off"
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
        </div>

        <div>
          <div className={styles.field}>
            <label htmlFor="height">Height: </label>
            <input
              autoComplete="off"
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
        </div>

        <div>
          <div className={styles.field}>
            <label htmlFor="weight">Weight: </label>
            <input
              autoComplete="off"
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
        </div>
        <button>create pokemon</button>
      </form>
    </Fragment>
  );
}
