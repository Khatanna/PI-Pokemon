const { Router } = require("express");
const { Pokemon, Type, Op } = require("../db.js");
const router = Router();
const API_URL = "https://pokeapi.co/api/v2";
const axios = require("axios");
const status = require("./status.js");

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    return next();
  }
  try {
    const pokemon = await Pokemon.findOne({
      where: {
        name: {
          [Op.eq]: name,
        },
      },
      include: [
        {
          model: Type,
          as: "types",
          attributes: ["name"],
        },
      ],
    });
    if (pokemon) {
      return res.json({
        id: pokemon.id,
        name: pokemon.name,
        stats: [
          { base_stat: pokemon.attack, stat: { name: "attack" } },
          { base_stat: pokemon.defense, stat: { name: "defense" } },
          { base_stat: pokemon.speed, stat: { name: "speed" } },
          { base_stat: pokemon.defense, stat: { name: "defense" } },
        ],
        types: pokemon.types.map((type, index) => {
          return {
            slot: index + 1,
            type: {
              name: type.name,
            },
          };
        }),
        height: pokemon.height,
        weight: pokemon.weight,
      });
    } else {
      const { data } = await axios.get(`${API_URL}/pokemon/${name}`);
      return res.json(data);
    }
  } catch (error) {
    return res.status(status.NOT_FOUND).json({
      message: "Pokemon not found",
    });
  }
});

router.get("/", async (req, res) => {
  const { page, limit, filter, order } = req.query;
  if (!page || !limit) {
    return res.redirect("/pokemons?page=1&limit=12");
  }
  try {
    let count = 40;
    let url_next = `http://localhost:3001/pokemons?page=${
      +page + 1
    }&limit=${limit}`;
    let url_previous = `http://localhost:3001/pokemons?page=${
      +page - 1
    }&limit=${limit}`;
    const {
      data,
      data: { results: oneResult },
    } = await axios.get(`${API_URL}/pokemon`);
    const {
      data: { results: twoResult },
    } = await axios.get(data.next);
    if (+page > Math.ceil(40 / limit) || +page < 1) {
      return res.status(status.NOT_FOUND).json({
        message: "Page not found",
      });
    }
    const pokemons = await Pokemon.findAll({
      attributes: ["name", "id"],
    });
    count += pokemons.length;
    const response = [
      ...pokemons.map(({ name, id }) => {
        return {
          name,
          url: `http://localhost:3001/pokemons/${id}`,
        };
      }),
      ...oneResult,
      ...twoResult,
    ];
    if (filter == "name" && order == "asc") {
      response.sort((a, b) => a.name.localeCompare(b.name));
      url_next = `http://localhost:3001/pokemons?page=${
        +page + 1
      }&limit=${limit}&filter=name&order=asc`;
      url_previous = `http://localhost:3001/pokemons?page=${
        +page - 1
      }&limit=${limit}&filter=name&order=asc`;
    }
    if (filter == "name" && order == "desc") {
      response.sort((a, b) => b.name.localeCompare(a.name));
      url_next = `http://localhost:3001/pokemons?page=${
        +page + 1
      }&limit=${limit}&filter=name&order=desc`;
      url_previous = `http://localhost:3001/pokemons?page=${
        +page - 1
      }&limit=${limit}&filter=name&order=desc`;
    }
    return res.json({
      count,
      page: +page,
      next: page == Math.ceil(count / limit) ? null : url_next,
      previous: page == 1 ? null : url_previous,
      results: response.slice((page - 1) * limit, page * limit),
    });
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isNaN(id)) {
    try {
      const { data } = await axios.get(`${API_URL}/pokemon/${id}`);
      return res.json(data);
    } catch (error) {
      return res.status(status.BAD_REQUEST).json({
        message: error.message,
      });
    }
  } else {
    try {
      const pokemon = await Pokemon.findByPk(id);
      const types = await pokemon.getTypes();
      return res.json({
        id: pokemon.id,
        name: pokemon.name,
        stats: [
          { base_stat: pokemon.attack, stat: { name: "attack" } },
          { base_stat: pokemon.defense, stat: { name: "defense" } },
          { base_stat: pokemon.speed, stat: { name: "speed" } },
        ],
        types: types.map((type, index) => {
          return {
            slot: index + 1,
            type: {
              name: type.name,
            },
          };
        }),
        height: pokemon.height,
        weight: pokemon.weight,
      });
    } catch (error) {
      return res.status(status.BAD_REQUEST).json({
        message: "Pokemon not found",
      });
    }
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, attack, defense, speed, height, weight, types } = req.body;
  if (!name || !attack || !defense || !speed || !height || !weight) {
    return res.status(status.BAD_REQUEST).json({
      message: "Missing parameters",
    });
  }
  try {
    const [pokemon, createdPokemon] = await Pokemon.findOrCreate({
      where: {
        name: {
          [Op.eq]: name,
        },
      },
      defaults: {
        name,
        attack,
        defense,
        speed,
        height,
        weight,
      },
    });
    const type = await Type.findAll({
      where: {
        name: {
          [Op.in]: types,
        },
      },
    });
    await pokemon.addTypes(type);

    return res.status(status.CREATED).json({
      id: pokemon.id,
      name: pokemon.name,
      create: createdPokemon,
      message: "Pokemon created",
      url: `https://localhost:3001/pokemons/${pokemon.id}`,
    });
  } catch (error) {
    return res.status(status.NOT_FOUND).send({
      message: error.message,
    });
  }
});

module.exports = router;
