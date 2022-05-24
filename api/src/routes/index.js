const { Router } = require("express");
const pokemonsRouter = require("./pokemons.js");
const typesRouter = require("./types.js");
const router = Router();

router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);
module.exports = router;
