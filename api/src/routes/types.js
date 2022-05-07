const { Router } = require("express");
const { Type } = require("../db");
const router = Router();
const API_URL = require("./API_KEY.js");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/type`);
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
