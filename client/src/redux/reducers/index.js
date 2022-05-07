import * as types from "../constants/ActionTypes.js";

const initialState = {
  pokemonList: [],
  types: [],
  pokemon: {},
  pokemons: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, payload],
      };
    case types.GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: payload.results,
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
    default:
      return state;
  }
}
