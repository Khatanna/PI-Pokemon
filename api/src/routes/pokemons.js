const { Router } = require("express");
const { Pokemon, Op } = require("../db.js");
const router = Router();
const API_URL = require("./API_KEY.js");
const axios = require("axios");
const status = require("./status.js");

router.get("/", async (req, res, next) => {
  if (req.query.name) {
    next();
  }
  try {
    const response = await axios.get(`${API_URL}/pokemon`);
    const pokemon = response.data;
    const pokemons = await Pokemon.findAll();
    console.log(pokemons);
    pokemon.results.push(...pokemons);
    res.json(pokemon);
  } catch (error) {
    res.send("Error");
  }
});

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    next();
  }
  try {
    const pokemon = await Pokemon.findOne({
      where: {
        name: {
          [Op.eq]: name,
        },
      },
    });
    if (!pokemon) {
      return res.status(status.NOT_FOUND).json({
        message: "Pokemon not found",
      });
    }
    return res.status(status.OK).json(pokemon);
  } catch (error) {
    res.status(status.NOT_FOUND).send({
      message: "Pokemon not found",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) {
      return next(error);
    }
    return res.status(status.OK).json(pokemon);
  } catch (error) {
    return next();
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);
    const pokemon = response.data;
    return res.status(status.OK).json(pokemon);
  } catch (error) {
    return res.status(status.NOT_FOUND).json({
      message: `Error: Pokemon no encontrado ;(`,
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
