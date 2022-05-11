const { Router } = require("express");
const { Type } = require("../db");
const router = Router();
const axios = require("axios");
const url = "https://pokeapi.co/api/v2";

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${url}/type`);
    const data = response.data;
    data.results.forEach(async (type) => {
      await Type.create({
        name: type.name,
      });
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
