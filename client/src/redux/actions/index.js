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

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons?name=${name}`);
    const data = await response.json();
    dispatch({
      type: types.GET_POKEMON_BY_NAME,
      payload: data,
    });
  };
};

export const getPokemonById = (id) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons/${id}`);
    const data = await response.json();
    dispatch({
      type: types.GET_POKEMON_BY_ID,
      payload: data,
    });
  };
};

export const getPokemonList = (page = 1) => {
  const results = [];
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons?page=${page}`);
    const data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
      const pokemon = await fetch(data.results[i].url);
      results.push(await pokemon.json());
    }
    dispatch({
      type: types.GET_POKEMON_LIST,
      payload: results,
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
