import * as types from "../constants/ActionTypes.js";

const URL = "http://localhost:3001";

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
    const response = await fetch(`${URL}/pokemons?page=${page}&limit=12`);
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

export const setPage = (page) => {
  return {
    type: types.SET_PAGE,
    payload: page,
  };
};

export const setOrder = (order) => {
  return {
    type: types.SET_ORDER,
    payload: order,
  };
};

export const filterPokemonByName = (page = 1, typeOfFilter) => {
  const results = [];
  if (typeOfFilter.includes("name")) {
    const [filter, order] = typeOfFilter.split("_");
    return async (dispatch) => {
      const response = await fetch(
        `${URL}/pokemons?page=${page}&limit=12&filter=${filter}&order=${order}`
      );
      const data = await response.json();
      for (let i = 0; i < data.results.length; i++) {
        const pokemon = await fetch(data.results[i].url);
        results.push(await pokemon.json());
      }
      dispatch({
        type: types.FILTER_POKEMON_BY_NAME,
        payload: results,
      });
    };
  }
  if (typeOfFilter.includes("attack")) {
    const [, order] = typeOfFilter.split("_");
    return async (dispatch) => {
      const response = await fetch(`${URL}/pokemons?page=${page}&limit=12`);
      const data = await response.json();
      for (let i = 0; i < data.results.length; i++) {
        const pokemon = await fetch(data.results[i].url);
        results.push(await pokemon.json());
      }
      if (order === "asc") {
        results.sort((a, b) => a.stats[1].base_stat - b.stats[1].base_stat);
      } else {
        results.sort((a, b) => b.stats[1].base_stat - a.stats[1].base_stat);
      }
      dispatch({
        type: types.FILTER_POKEMON_BY_NAME,
        payload: results,
      });
    };
  }
  return async (dispatch) => {
    dispatch({
      type: types.FILTER_POKEMON_BY_NAME,
      payload: results,
    });
  };
};

export function pushInRecentSearch(pokemon) {
  return {
    type: types.PUSH_IN_RECENT_SEARCH,
    payload: pokemon,
  };
}
