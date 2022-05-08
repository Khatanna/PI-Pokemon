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
        pokemon: payload,
      };
    case types.GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: [...state.pokemonList, payload].sort(
          (a, b) => a.id - b.id
        ),
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
    default:
      return state;
  }
}
