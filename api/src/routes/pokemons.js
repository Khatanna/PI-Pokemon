const { Router } = require("express");
const { Pokemon, Type, Op } = require("../db.js");
const router = Router();
const API_URL = "https://pokeapi.co/api/v2";
const axios = require("axios");
const status = require("./constants/status.js");
const URL_LOCAL = "http://localhost:3001/pokemons";

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (!name) return next();
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
      return res.status(status.OK).json({
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
      return res.status(status.OK).json(data);
    }
  } catch (error) {
    return res.sendStatus(status.NOT_FOUND);
  }
});

router.get("/", async (req, res) => {
  const { page, limit, filter, order } = req.query;
  if (!page || !limit) {
    return res.redirect("/pokemons?page=1&limit=12");
  }
  try {
    let url_next = `${URL_LOCAL}?page=${+page + 1}&limit=${limit}`;
    let url_previous = `${URL_LOCAL}?page=${+page - 1}&limit=${limit}`;

    const {
      data,
      data: { results: oneResult },
    } = await axios.get(`${API_URL}/pokemon`);

    const {
      data: { results: twoResult, next },
    } = await axios.get(data.next);

    const pokemons = await Pokemon.findAll({
      attributes: ["name", "id"],
    });
    const count = oneResult.length + twoResult.length + pokemons.length;

    if (+page > Math.ceil(count / limit) || +page < 1) {
      return res.status(status.NOT_FOUND).json({
        message: "Page not found",
      });
    }
    const response = [
      ...pokemons.map(({ name, id }) => ({
        name,
        url: `${URL_LOCAL}/${id}`,
      })),
      ...oneResult,
      ...twoResult,
    ];

    if (filter === "name" && order === "asc") {
      response.sort((a, b) => a.name.localeCompare(b.name));
      url_next = `${URL_LOCAL}?page=${
        +page + 1
      }&limit=${limit}&filter=name&order=asc`;
      url_previous = `${URL_LOCAL}?page=${
        +page - 1
      }&limit=${limit}&filter=name&order=asc`;
    }

    if (filter === "name" && order === "desc") {
      response.sort((a, b) => b.name.localeCompare(a.name));
      url_next = `${URL_LOCAL}?page=${
        +page + 1
      }&limit=${limit}&filter=name&order=desc`;
      url_previous = `${URL_LOCAL}?page=${
        +page - 1
      }&limit=${limit}&filter=name&order=desc`;
    }

    return res.status(status.OK).json({
      count,
      next: +page !== Math.ceil(count / limit) ? url_next : null,
      previous: +page !== 1 ? url_previous : null,
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
      return res.status(status.OK).json(data);
    } catch (error) {
      return res.status(status.NOT_FOUND).json({
        message: error.message,
      });
    }
  } else {
    try {
      const pokemon = await Pokemon.findByPk(id);
      const types = await pokemon.getTypes();
      return res.status(status.OK).json({
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
      return res.status(status.NOT_FOUND).json({
        message: "Pokemon not found",
      });
    }
  }
});

router.post("/", async (req, res, next) => {
  const { name, attack, defense, speed, height, weight, types } = req.body;
  if (!name || !attack || !defense || !speed || !height || !weight || !types) {
    return res.status(status.BAD_REQUEST).json({
      message: "Missing parameters",
    });
  }
  try {
    const response = await axios.get(`${API_URL}/pokemon/${name}`);
    const { data } = response;
    if (data) {
      res.status(status.CONFLICT).json({
        message: "Pokemon already exists",
      });
    }
  } catch (error) {
    return next();
  }
});

router.post("/", async (req, res) => {
  const { name, attack, defense, speed, height, weight, types } = req.body;
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
    if (createdPokemon) {
      const type = await Type.findAll({
        where: {
          name: {
            [Op.in]: types,
          },
        },
      });
      await pokemon.addTypes(type);
      return res.status(status.CREATED).json({
        name: pokemon.name,
        url: `${URL_LOCAL}/${pokemon.id}`,
      });
    } else {
      return res.sendStatus(status.CONFLICT);
    }
  } catch (error) {
    return res.status(status.NOT_FOUND).send({
      message: "Pokemon not found",
    });
  }
});

module.exports = router;
