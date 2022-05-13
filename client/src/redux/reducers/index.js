import * as types from "../constants/ActionTypes.js";

const initialState = {
  pokemonList: [],
  recentSearch: [],
  creates: [],
  types: [],
  pokemon: {},
  page: 1,
  order: null,
  count: 0,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: payload,
      };
    case types.GET_TYPES:
      return {
        ...state,
        pokemon: payload,
      };
    case types.CREATE_POKEMON:
      return {
        ...state,
        creates: [...state.creates, payload],
      };
    case types.GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemon: payload,
      };
    case types.GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemon: payload,
      };
    case types.SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case types.FILTER_POKEMON:
      return {
        ...state,
        pokemonList: payload,
      };
    case types.SET_ORDER:
      return {
        ...state,
        order: payload,
      };
    case types.PUSH_IN_RECENT_SEARCH:
      if (state.pokemon.message !== "Pokemon not found") {
        return {
          ...state,
          recentSearch: [...state.recentSearch, payload],
        };
      }
      return {
        ...state,
      };
    case types.PUSH_IN_TYPES:
      return {
        ...state,
        types: Array.from(new Set([...state.types, payload])),
      };
    case types.CLEAR_POKEMON:
      return {
        ...state,
        pokemon: {},
      };
    case types.CLEAR_POKEMON_LIST:
      return {
        ...state,
        pokemonList: [],
      };
    case types.CLEAR_TYPES:
      return {
        ...state,
        types: [],
      };
    case types.GET_COUNT:
      return {
        ...state,
        count: payload,
      };
    default:
      return state;
  }
}
