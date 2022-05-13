import * as types from "../constants/ActionTypes.js";

const URL = "http://localhost:3001";

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons?name=${name}`);
    const data = await response.json();
    console.log(data);
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
    const { name } = await response.json();
    const data = await fetch(`${URL}/pokemons?name=${name}`);
    const dataJson = await data.json();
    dispatch({
      type: types.CREATE_POKEMON,
      payload: dataJson,
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

export const filterPokemon = (page = 1, typeOfFilter) => {
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
        type: types.FILTER_POKEMON,
        payload: results,
      });
    };
  }
  if (typeOfFilter.includes("attack")) {
    const [, order] = typeOfFilter.split("_");
    return async (dispatch) => {
      const response = await fetch(`${URL}/pokemons?page=1&limit=40`);
      const data = await response.json();
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        const pokemon = await fetch(data.results[i].url);
        results.push(await pokemon.json());
      }
      if (order === "ascendent") {
        results.sort(
          (a, b) =>
            a.stats.find(({ stat }) => stat.name === "attack").base_stat -
            b.stats.find(({ stat }) => stat.name === "attack").base_stat
        );
      }
      if (order === "descendent") {
        results.sort(
          (a, b) =>
            b.stats.find(({ stat }) => stat.name === "attack").base_stat -
            a.stats.find(({ stat }) => stat.name === "attack").base_stat
        );
      }
      dispatch({
        type: types.FILTER_POKEMON,
        payload: results.slice((page - 1) * 12, 12 * page),
      });
    };
  }
  if (typeOfFilter.includes("created")) {
    return async (dispatch) => {
      const response = await fetch(`${URL}/pokemons?page=${page}&limit=12`);
      const data = await response.json();

      for (let i = 0; i < data.results.length; i++) {
        const pokemon = await fetch(data.results[i].url);
        results.push(await pokemon.json());
      }
      const creates = results.filter(({ id }) => isNaN(id));
      if (creates.length) {
        dispatch({
          type: types.FILTER_POKEMON,
          payload: creates,
        });
      } else {
        dispatch({
          type: types.FILTER_POKEMON,
          payload: ["no new pokemon yet 😢"],
        });
      }
    };
  }
  return async (dispatch) => {
    dispatch({
      type: types.FILTER_POKEMON,
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

export function pushInTypes(type) {
  return {
    type: types.PUSH_IN_TYPES,
    payload: type,
  };
}

export function clearPokemon() {
  return {
    type: types.CLEAR_POKEMON,
  };
}

export function clearPokemonList() {
  return {
    type: types.CLEAR_POKEMON_LIST,
  };
}

export function clearTypes() {
  return {
    type: types.CLEAR_TYPES,
  };
}

export function getCount() {
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons?page=${1}&limit=12`);
    const { count } = await response.json();

    dispatch({
      type: types.GET_COUNT,
      payload: count,
    });
  };
}
