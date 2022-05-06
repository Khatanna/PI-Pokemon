const { Router } = require("express");
const { Pokemon } = require("../db.js");
const router = Router();
const API_KEY = require("./API_KEY.js");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon`);
    const pokemon = response.data;
    res.json(pokemon);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

router.get("/", async (req, res) => {
  //query params
});

router.get("/:idPokemon", async (req, res) => {
  //query params
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      error: "El nombre es obligatorio",
    });
  }
  try {
    const newPokemon = await Pokemon.create({
      name,
    });
    setTimeout(() => {
      console.log(newPokemon);
    }, 3000);
    res.json(newPokemon);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
