import * as types from "../constants/ActionTypes.js";

const URL = "http://localhost:3001";

export const getPokemon = (url) => {
  return async (dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: types.GET_POKEMON,
      payload: data,
    });
  };
};

export const getPokemonList = () => {
  return async (dispatch) => {
    const respose = await fetch(`${URL}/pokemons/`);
    const data = await respose.json();
    dispatch({
      type: types.GET_POKEMON_LIST,
      payload: data,
    });
  };
};

export const getTypes = () => {
  const url = `${URL}/types`;
  return async (dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: types.GET_TYPES,
      payload: data,
    });
  };
};

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });
    const data = await response.json();
    dispatch({
      type: types.CREATE_POKEMON,
      payload: data,
    });
  };
};

// export const get40Pokemon = (limit) => {
//   const pokemons = [];
//   pokemons.length = limit;
//   pokemons.fill(null);
//   return async (dispatch) => {
//     pokemons.forEach(async (_, index) => {
//       const response = await fetch(`${URL}${index + 1}`);
//       const data = await response.json();
//       dispatch({
//         type: types.GET_40_POKEMON,
//         payload: data,
//       });
//     });
//   };
// };
