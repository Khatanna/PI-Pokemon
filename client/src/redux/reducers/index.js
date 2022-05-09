import * as types from "../constants/ActionTypes.js";

const initialState = {
  pokemonList: [],
  types: [],
  pokemon: {},
  page: 1,
  orderBy: "",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_POKEMON:
      return {
        ...state,
        pokemon: payload,
      };
    case types.GET_POKEMON_LIST:
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
      return {
        ...state,
        pokemon: payload,
      };
    case types.GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemon: payload,
      };
    case types.SET_NEXT_PAGE:
      return {
        ...state,
        page: payload,
      };
    case types.SET_PREVIOUS_PAGE:
      return {
        ...state,
        page: payload,
      };
    case types.SET_ORDER_BY:
      return {
        ...state,
        orderBy: payload,
      };
    default:
      return state;
  }
}
