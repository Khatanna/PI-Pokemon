const { Router } = require("express");
const { Type } = require("../db");
const router = Router();
const axios = require("axios");
const url = "https://pokeapi.co/api/v2";
const status = require("./constants/status.js");

router.get("/", async (req, res) => {
  try {
    const types = await Type.findAll();

    if (types.length) {
      return res.json(types);
    } else {
      const { data } = await axios.get(`${url}/type`);
      data.results.forEach(async ({ name }) => {
        await Type.create({
          name,
        });
      });
      return res.json(data);
    }
  } catch (error) {
    res.status(status.NOT_FOUND).json({
      message: "Page not found",
    });
  }
});

module.exports = router;
