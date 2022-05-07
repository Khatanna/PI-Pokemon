import React, { Fragment, useState } from "react";
import styles from "../styles/Form.module.css";
import { useDispatch } from "react-redux";
import { createPokemon } from "../redux/actions";

function validateForm(data) {
  const errors = {};
  if (!data.name) {
    errors.name = "El nombre es obligatorio";
  }

  if (!data.attack) {
    errors.attack = "El ataque es obligatorio";
  }

  if (!data.defense) {
    errors.defense = "La defensa es obligatoria";
  }

  if (!data.speed) {
    errors.speed = "La velocidad es obligatoria";
  }

  if (!data.hp) {
    errors.hp = "El hp es obligatorio";
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

    console.log(Object.keys(error).length);
    if (Object.keys(error).length !== 0) {
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
            className={error.name && "danger"}
            id="name"
            type="text"
            placeholder="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {error.name && <p className="danger">{error.name}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="attack">Attack: </label>
          <input
            id="attack"
            type="text"
            placeholder="attack"
            name="attack"
            value={form.attack}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="defense">Defense: </label>
          <input
            id="defense"
            type="text"
            placeholder="defense"
            name="defense"
            value={form.defense}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="speed">Speed: </label>
          <input
            id="speed"
            type="text"
            placeholder="speed"
            name="speed"
            value={form.speed}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="height">Height: </label>
          <input
            id="height"
            type="text"
            placeholder="height"
            name="height"
            value={form.height}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="weight">Weight: </label>
          <input
            id="weight"
            type="text"
            placeholder="weight"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
        </div>
        <button>Crear</button>
      </form>
    </Fragment>
  );
}
