import * as types from "../constants/ActionTypes.js";

const initialState = {
  pokemonList: [],
  pokemonSearch: {},
  pokemonDetail: {},
  pokemonCreated: {},
  types: [],
  filterTypes: [],
  page: 1,
  count: 0,
  order: null,
  error: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: payload,
      };
    case types.GET_POKEMON_LIST_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.CREATE_POKEMON:
      return {
        ...state,
        pokemonCreated: payload,
      };
    case types.CREATE_POKEMON_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonSearch: payload,
      };
    case types.GET_POKEMON_BY_NAME_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonDetail: payload,
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
    case types.FILTER_POKEMON_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.FILTER_BY_TYPES:
      return {
        ...state,
        pokemonList: payload,
      };
    case types.SET_ORDER:
      return {
        ...state,
        order: payload,
      };
    case types.CLEAR_POKEMON_SEARCH:
      return {
        ...state,
        pokemonSearch: {},
      };
    case types.CLEAR_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: {},
      };
    case types.CLEAR_POKEMON_LIST:
      return {
        ...state,
        pokemonList: [],
      };
    case types.CLEAR_POKEMON_CREATE:
      return {
        ...state,
        pokemonCreated: {},
      };
    case types.GET_COUNT:
      return {
        ...state,
        count: payload,
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case types.GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case types.PUSH_IN_FILTER_TYPES:
      return {
        ...state,
        filterTypes: [...state.filterTypes, payload],
      };
    case types.REMOVE_FROM_FILTER_TYPES:
      return {
        ...state,
        filterTypes: state.filterTypes.filter((type) => type !== payload),
      };
    default:
      return state;
  }
}
