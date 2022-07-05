import * as types from "../constants/ActionTypes.js";

export function orderByName(page, url, results) {
  return async (dispatch) => {
    const response = await fetch(url);
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
      type: types.ORDER_BY_NAME,
      payload: results.slice((page - 1) * 12, 12 * page),
    });
  };
}

export function orderByAttack(page, url, results, order) {
  return async (dispatch) => {
    const response = await fetch(url);
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
      type: types.ORDER_BY_ATTACK,
      payload: results.slice((page - 1) * 12, 12 * page),
    });
  };
}

export function filterByCreated(page, url, results) {
  return async (dispatch) => {
    try {
      const response = await fetch(url);
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
      console.log(creates);
      if (creates.length > 0) {
        dispatch({
          type: types.FILTER_POKEMON,
          payload: {
            count: creates.length,
            creates: creates.slice((page - 1) * 12, 12 * page),
          },
        });
      } else {
        dispatch({
          type: types.FILTER_POKEMON_ERROR,
          payload: "Pokemon not found 😪",
        });
      }
    } catch (error) {
      dispatch({
        type: types.FILTER_POKEMON_ERROR,
        payload: "Pokemon not found 😪",
      });
    }
  };
}
