import * as types from "../constants/ActionTypes.js";
import { orderByName, orderByAttack, filterByCreated } from "./filters.js";

const URL = "http://localhost:3001";
//const URL = "https://pi-pokemon-main.herokuapp.com";

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
        const { id, name, types, stats, sprites } = await response.json();
        pokemons.push({
          id,
          name,
          types: types.map(({ type }) => type.name),
          stats,
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

const orderByNameForExistens = (pokemonList, order) => {
  return (dispatch) => {
    if (order === "asc") {
      dispatch({
        type: types.FILTER_POKEMON,
        payload: {
          count: pokemonList.length,
          creates: pokemonList.sort((a, b) => a.name.localeCompare(b.name)),
        },
      });
      return;
    }
    if (order === "desc") {
      dispatch({
        type: types.FILTER_POKEMON,
        payload: {
          count: pokemonList.length,
          creates: pokemonList.sort((a, b) => b.name.localeCompare(a.name)),
        },
      });
      return;
    }
  };
};

export const filterPokemon = (page = 1, typeOfFilter, pokemonList) => {
  const results = [];
  const responses = {
    name: (order) =>
      orderByName(
        page,
        `${URL}/pokemons?page=1&limit=40&filter=name&order=${order}`,
        results
      ),
    attack: (order) =>
      orderByAttack(page, `${URL}/pokemons?page=1&limit=40`, results, order),
    created: () =>
      filterByCreated(page, `${URL}/pokemons?page=1&limit=40`, results),
  };
  if (typeOfFilter.includes("name") && pokemonList.length > 0) {
    const [, order] = typeOfFilter.split("_");
    return orderByNameForExistens(pokemonList, order);
  }
  if (typeOfFilter.includes("name")) {
    const [, order] = typeOfFilter.split("_");
    return responses.name(order);
  }
  if (typeOfFilter.includes("attack")) {
    const [, order] = typeOfFilter.split("_");
    return responses.attack(order);
  }
  if (typeOfFilter.includes("created")) {
    return responses.created();
  }
};

export const filterPokemonByTypes = (page, ArrayOfTypes) => {
  const pokemons = [];
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons?page=1&limit=40`);
    const { results } = await response.json();
    for (let data of results) {
      const response = await fetch(data.url);
      const { id, name, types, stats, sprites, height, weight } =
        await response.json();
      if (types.some(({ type }) => ArrayOfTypes.includes(type.name))) {
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
    }
    if (pokemons.length === 0) {
      dispatch({
        type: types.FILTER_POKEMON_BY_TYPES_ERROR,
        payload: "There are no pokemons with this type 😪",
      });
    } else {
      dispatch({
        type: types.FILTER_BY_TYPES,
        payload: {
          count: pokemons.length,
          pokemons: pokemons.slice((page - 1) * 12, 12 * page),
        },
      });
    }
  };
};

export const clearPokemonSearch = () => {
  return {
    type: types.CLEAR_POKEMON_SEARCH,
  };
};

export const clearPokemonDetail = () => {
  return {
    type: types.CLEAR_POKEMON_DETAIL,
  };
};

export const clearPokemonList = () => {
  return {
    type: types.CLEAR_POKEMON_LIST,
  };
};

export const clearPokemonCreate = () => {
  return {
    type: types.CLEAR_POKEMON_CREATE,
  };
};

export const clearFilterTypes = () => {
  return {
    type: types.CLEAR_FILTER_TYPES,
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/types`);
    const data = await response.json();
    dispatch({
      type: types.GET_TYPES,
      payload: data,
    });
  };
};

export const getCount = () => {
  return async (dispatch) => {
    const response = await fetch(`${URL}/pokemons`);
    const { count } = await response.json();
    dispatch({
      type: types.GET_COUNT,
      payload: count,
    });
  };
};

export const clearError = () => {
  return {
    type: types.CLEAR_ERROR,
  };
};

export const pushInFilterTypes = (type) => {
  return {
    type: types.PUSH_IN_FILTER_TYPES,
    payload: type,
  };
};

export const removeFromFilterTypes = (type) => {
  return {
    type: types.REMOVE_FROM_FILTER_TYPES,
    payload: type,
  };
};

export const clearTypes = () => {
  return {
    type: types.CLEAR_TYPES,
  };
};
