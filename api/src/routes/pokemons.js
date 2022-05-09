const { Router } = require("express");
const { Pokemons, Pokemon, Type, Op } = require("../db.js");
const router = Router();
const API_URL = require("./API_KEY.js");
const axios = require("axios");
const status = require("./status.js");

(async () => {
  try {
    let response = await axios.get(`${API_URL}/pokemon`);
    let { data } = response;
    let next = null;

    do {
      data.results.forEach(async ({ name, url }) => {
        await Pokemons.findOrCreate({
          where: {
            name,
          },
          defaults: {
            url,
          },
        });
      });
      next = data.next;
      if (next) {
        response = await axios.get(next);
        data = response.data;
      }
    } while (next);
    console.log("Pokemons cargados");
  } catch (error) {
    console.log(error);
  }
})();

router.get("/", async (req, res, next) => {
  if (req.query.name) {
    return next();
  }
  const { page, limit, filter } = req.query;
  if (page && filter) {
    return next();
  }
  if (!page) {
    return res.redirect("/pokemons?page=1");
  }
  try {
    const pokemons = await Pokemons.findAll({
      offset: (page - 1) * (limit || 40),
      limit: +limit || 40,
      order: [["id", "ASC"]],
    });
    if (page > Math.ceil(1126 / limit)) {
      return res.status(404).send("Para emoción");
    }
    if (limit) {
      return res.json({
        page: Number(page),
        next:
          page >= Math.ceil(1126 / limit)
            ? null
            : `http://localhost:3001/pokemons?page=${+page + 1}&limit=${limit}`,
        previous:
          page == 1
            ? null
            : `http://localhost:3001/pokemons?page=${+page - 1}&limit=${limit}`,
        results: pokemons,
      });
    } else {
      return res.json({
        page: Number(page),
        next:
          page >= 29
            ? null
            : `http://localhost:3001/pokemons?page=${+page + 1}`,
        previous:
          page == 1 ? null : `http://localhost:3001/pokemons?page=${+page - 1}`,
        results: pokemons,
      });
    }
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error);
  }
});

router.get("/", async (req, res, next) => {
  const { page, filter } = req.query;
  console.log(page, filter);
  if (!filter || !page) {
    return next();
  }
  try {
    const pokemons = await Pokemons.findAll({
      offset: (page - 1) * 40,
      limit: 40,
      order: [[filter, "ASC"]],
    });
    return res.json({
      page: Number(page),
      next:
        page >= Math.ceil(1126 / 40)
          ? null
          : `http://localhost:3001/pokemons?page=${+page + 1}&filter=${filter}`,
      previous:
        page == 1
          ? null
          : `http://localhost:3001/pokemons?page=${+page - 1}&filter=${filter}`,

      results: pokemons,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).send(error);
  }
});

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    const pokemon = await Pokemons.findOne({
      where: {
        name: {
          [Op.eq]: name,
        },
      },
    });
    res.status(status.OK).json(pokemon);
  } catch (error) {
    res.status(status.NOT_FOUND).send({
      message: "Pokemon not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemons.findByPk(id);
    return res.status(status.OK).json(pokemon);
  } catch (error) {
    return res.status(status.NOT_FOUND).send({
      message: "Pokemon not found",
    });
  }
});

router.post("/", async (req, res) => {
  const { name, attack, defense, speed, height, weight } = req.body;
  try {
    const pokemon = await Pokemon.findOne({
      where: {
        name: {
          [Op.eq]: name,
        },
      },
    });
    if (!pokemon) {
      await Pokemon.create({
        name,
        attack,
        defense,
        speed,
        height,
        weight,
      });
      return res.status(status.OK).json({
        message: "Pokemon creado existosamente",
      });
    } else {
      return res.status(status.CONFLICT).json({
        message: "Pokemon ya existe",
      });
    }
  } catch (error) {
    return res.status(status.NOT_FOUND).send({
      message: error,
    });
  }
});

module.exports = router;
