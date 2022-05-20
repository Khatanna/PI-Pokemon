const { Router } = require("express");
const pokemonsRouter = require("./pokemons.js");
const typesRouter = require("./types.js");
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);
module.exports = router;
