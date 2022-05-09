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

export const getPokemonList = (page = 1, orderBy, ascedent = true) => {
  const results = [];
  const stats = {
    attack: 1,
    defense: 2,
  };
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons?page=${page}`);
    const data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
      const pokemon = await fetch(data.results[i].url);
      results.push(await pokemon.json());
    }
    if (orderBy && ascedent) {
      results.sort((a, b) => {
        return (
          a.stats[stats[orderBy]].base_stat - b.stats[stats[orderBy]].base_stat
        );
      });
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

export const setNextPage = (page) => {
  return {
    type: types.SET_NEXT_PAGE,
    payload: page,
  };
};

export const setPreviousPage = (page) => {
  return {
    type: types.SET_PREVIOUS_PAGE,
    payload: page,
  };
};

export const setOrderBy = (orderBy) => {
  return {
    type: types.SET_ORDER_BY,
    payload: orderBy,
  };
};
