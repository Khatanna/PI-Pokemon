import * as types from "../constants/ActionTypes.js";

const initialState = {
  pokemonList: [],
  recentSearch: [],
  types: [],
  pokemon: {},
  page: 1,
  order: "",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_POKEMON_LIST:
      state.pokemon = {};
      return {
        ...state,
        pokemonList: payload,
      };
    case types.GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case types.CREATE_POKEMON:
      return {
        ...state,
        pokemon: payload,
      };
    case types.GET_POKEMON_BY_NAME:
      state.pokemonList.length = 0;
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
      state.pokemonList.length = 0;
      return {
        ...state,
        page: payload,
      };
    case types.FILTER_POKEMON_BY_NAME:
      state.pokemonList.length = 0;
      return {
        ...state,
        pokemonList: payload,
      };
    case types.SET_ORDER:
      state.pokemonList.length = 0;
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
    default:
      return state;
  }
}
