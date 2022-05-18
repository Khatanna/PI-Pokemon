import * as types from "../constants/ActionTypes.js";

const URL = "http://localhost:3001";

export const getPokemonByName = (pokemonName) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL}/pokemons?name=${pokemonName}`);
      const data = await response.json();
      dispatch({
        type: types.GET_POKEMON_BY_NAME,
        payload: {
          id: data.id,
          name: data.name,
          types: data.types.map(({ type }) => type.name),
          stats: data.stats,
          height: data.height,
          weight: data.weight,
          sprite: data.sprites?.other?.dream_world?.front_default || null,
        },
      });
    } catch (error) {
      dispatch({
        type: types.GET_POKEMON_BY_NAME_ERROR,
        payload: "Pokemon not found 😪",
      });
    }
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
  const pokemons = [];
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL}/pokemons?page=${page}&limit=12`);
      const { results } = await response.json();
      for (let data of results) {
        const response = await fetch(data.url);
        const { id, name, types, stats, sprites, height, weight } =
          await response.json();
        pokemons.push({
          id,
          name,
          types: types.map(({ type }) => type.name),
          stats,
          height,
          weight,
          sprite: sprites?.other?.dream_world?.front_default || null,
        });
      }
      dispatch({
        type: types.GET_POKEMON_LIST,
        payload: pokemons,
      });
    } catch (error) {
      dispatch({
        type: types.GET_POKEMON_LIST_ERROR,
        payload: "Pokemon not found 😪",
      });
    }
  };
};

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL}/pokemons/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemon),
      });
      const { url } = await response.json();
      const data = await fetch(url);
      const dataJson = await data.json();
      dispatch({
        type: types.CREATE_POKEMON,
        payload: dataJson,
      });
    } catch (error) {
      dispatch({
        type: types.CREATE_POKEMON_ERROR,
        payload: "Pokemon already exists 😛",
      });
    }
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
        `${URL}/pokemons?page=1&limit=40&filter=${filter}&order=${order}`
      );
      const data = await response.json();
      for (let i = 0; i < data.results.length; i++) {
        const response = await fetch(data.results[i].url);
        const { id, name, types, stats, sprites, height, weight } =
          await response.json();
        results.push({
          id,
          name,
          types: types.map(({ type }) => type.name),
          stats,
          height,
          weight,
          sprite: sprites?.other?.dream_world?.front_default || null,
        });
      }
      dispatch({
        type: types.FILTER_POKEMON,
        payload: results.slice((page - 1) * 12, 12 * page),
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
        const response = await fetch(data.results[i].url);
        const { id, name, types, stats, sprites, height, weight } =
          await response.json();
        results.push({
          id,
          name,
          types: types.map(({ type }) => type.name),
          stats,
          height,
          weight,
          sprite: sprites?.other?.dream_world?.front_default || null,
        });
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
      try {
        const response = await fetch(`${URL}/pokemons?page=1&limit=40`);
        const data = await response.json();

        for (let i = 0; i < data.results.length; i++) {
          const response = await fetch(data.results[i].url);
          const { id, name, types, stats, sprites, height, weight } =
            await response.json();
          results.push({
            id,
            name,
            types: types.map(({ type }) => type.name),
            stats,
            height,
            weight,
            sprite: sprites?.other?.dream_world?.front_default || null,
          });
        }
        const creates = results.filter(({ id }) => isNaN(id));
        if (creates.length > 0) {
          dispatch({
            type: types.FILTER_POKEMON,
            payload: creates.slice((page - 1) * 12, 12 * page),
          });
        } else {
          dispatch({
            type: types.FILTER_POKEMON_ERROR,
            payload: "Pokemon not found 😪",
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: types.FILTER_POKEMON_ERROR,
          payload: "Pokemon not found 😪",
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

export function clearPokemonSearch() {
  return {
    type: types.CLEAR_POKEMON_SEARCH,
  };
}

export function clearPokemonDetail() {
  return {
    type: types.CLEAR_POKEMON_DETAIL,
  };
}

export function clearPokemonList() {
  return {
    type: types.CLEAR_POKEMON_LIST,
  };
}

export function clearPokemonCreate() {
  return {
    type: types.CLEAR_POKEMON_CREATE,
  };
}

export function getTypes(){
  return async (dispatch) => {
    const response = await fetch(`${URL}/types`);
    const data = await response.json();
    dispatch({
      type: types.GET_TYPES,
      payload: data,
    });
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

export function clearError() {
  return {
    type: types.CLEAR_ERROR,
  };
}
