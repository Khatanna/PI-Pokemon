import React, { Fragment, useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createPokemon,
  clearError,
  clearPokemonCreate,
  getTypes,
  clearTypes,
} from "../redux/actions";
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
  } else if (data.speed.match(/[^a-z0-9]/g)) {
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
  if (!data.types.length) {
    errors.types = "El tipo es obligatorio";
  }
  return errors;
}

const formDefault = {
  name: "",
  attack: "",
  defense: "",
  speed: "",
  height: "",
  weight: "",
  types: [],
};

export default function Form() {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [send, setSend] = useState(false);
  const [form, setForm] = useState(formDefault);

  const {
    error: errorCreate,
    pokemonCreated,
    types,
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getTypes());
    return () => {
      dispatch(clearTypes());
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "types") {
      if (form.types.length < 2) {
        setForm({
          ...form,
          types: [...new Set([...form.types, e.target.value])],
        });
        setError(
          validateForm({
            ...form,
            types: [...new Set([...form.types, e.target.value])],
          })
        );
      } else {
        alert("Solo puedes seleccionar 2 tipos");
      }
      dispatch(clearError());
      setSend(false);
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value.toLowerCase(),
      });
      setError(
        validateForm({
          ...form,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    dispatch(clearPokemonCreate());
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      setSend(true);
      dispatch(createPokemon(form));
      setForm(formDefault);
    } else {
      alert("Debe completar todos los campos");
    }
  };

  const handleDelete = (e) => {
    setForm({
      ...form,
      types: form.types.filter((type) => type !== e.target.id),
    });
  };

  const fields = [
    {
      name: "name",
      label: "name",
      type: "text",
      value: form.name,
      error: error.name,
    },
    {
      name: "attack",
      label: "attack",
      type: "number",
      value: form.attack,
      error: error.attack,
    },
    {
      name: "defense",
      label: "defense",
      type: "number",
      value: form.defense,
      error: error.defense,
    },
    {
      name: "speed",
      label: "speed",
      type: "number",
      value: form.speed,
      error: error.speed,
    },
    {
      name: "height",
      label: "height",
      type: "number",
      value: form.height,
      error: error.height,
    },
    {
      name: "weight",
      label: "weight",
      type: "number",
      value: form.weight,
      error: error.weight,
    },
  ];
  return (
    <Fragment>
      <NavBar />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create - Pokemon</h2>
        {fields.map(({ name, label, type, value, error }) => (
          <div key={name}>
            <div className={styles.field}>
              <label htmlFor={name}>{label}</label>
              <input
                autoComplete={"off"}
                className={error && styles.danger}
                id={name}
                type={type}
                placeholder={label}
                name={name}
                value={value}
                onChange={handleChange}
              />
            </div>
            {error && <p className={styles.danger}>{error}</p>}
          </div>
        ))}
        <div>
          <div className={styles.field}>
            <label htmlFor="types">Types </label>
            <select name="types" id="types" onChange={handleChange}>
              {types?.map(({ name }) => (
                <option value={name} key={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          {error.types && <p className={styles.danger}>{error.types}</p>}
        </div>
        {form?.types.length ? (
          <div>
            <ul className={styles.listTypes}>
              {form?.types.map((type) => (
                <li
                  key={type}
                  className={styles[type.toLowerCase()]}
                  onClick={handleDelete}
                  id={type}
                >
                  {type}
                </li>
              ))}
            </ul>
            <div className={styles.delete}>click to delete the type</div>
          </div>
        ) : null}
        <div>
          <button className={styles["btn-create"]}>create pokemon</button>
          {errorCreate && <p>{errorCreate}</p>}
        </div>
        {Object.keys(pokemonCreated).length > 0 && !errorCreate ? (
          <p>Nuevo pokemon creado! 😁</p>
        ) : !Object.keys(pokemonCreated).length && send && !errorCreate ? (
          <div className={styles.loading}>
            <span className={styles.spinner}></span>
          </div>
        ) : null}
      </form>
    </Fragment>
  );
}
