/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn, Op } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("deberia devolver un status 200 para obtener todos los pokemons", () =>
      agent.get("/pokemons").expect(302));
  });
  describe("GET /pokemons/:id", () => {
    it("deberia devolver un status 200 al buscar un pokemon de la API", () =>
      agent.get("/pokemons/1").expect(200));
    it("deberia devolver un status 200 al buscar un pokemon de la base de datos", async () => {
      const pokemon = await Pokemon.findOne({
        where: {
          name: {
            [Op.eq]: "Pikachu",
          },
        },
      });
      return agent.get(`/pokemons/${pokemon.id}`).expect(200);
    });
    it("deberia recibir un json con los datos del pokemon", async () => {
      const pokemon = await Pokemon.findOne({
        where: {
          name: {
            [Op.eq]: "Pikachu",
          },
        },
      });
      return agent
        .get(`/pokemons/${pokemon.id}`)
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("stats");
          expect(response.body).to.have.property("types");
          expect(response.body).to.have.property("height");
          expect(response.body).to.have.property("weight");
        });
    });
    it("deberia devolver un status 404 si el pokemon no existe", () => {
      return agent.get("/pokemons/0").expect(404);
    });
  });
  describe("GET /pokemons?name=Pikachu", () => {
    it("deberia devolver un status 200 si el pokemon existe", () =>
      agent.get("/pokemons?name=Pikachu").expect(200));
    it("deberia devolver un status 404 si el pokemon no existe", () => {
      return agent
        .get("/pokemons?name=Pokemon")
        .expect(404)
        .then((res) => {
          expect(res.body.message).to.equal("Pokemon not found");
        });
    });
    it("deberia devolver un json con los datos del pokemon", async () => {
      const pokemon = await Pokemon.findOne({
        where: {
          name: {
            [Op.eq]: "Pikachu",
          },
        },
      });
      return agent
        .get(`/pokemons?name=Pikachu`)
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("stats");
          expect(response.body).to.have.property("types");
          expect(response.body).to.have.property("height");
          expect(response.body).to.have.property("weight");
        });
    });
  });
  describe("POST /pokemons", () => {
    it("deberia lanzar un error si la propiedad 'name' no existe", () => {
      const body = {
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
        weight: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(400);
    });
    it("deberia lanzar un error si la propiedad 'attack' no existe", () => {
      const body = {
        name: "Pikachu",
        defense: 50,
        speed: 50,
        height: 50,
        weight: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(400);
    });
    it("deberia lanzar un error si la propiedad 'defense' no existe", () => {
      const body = {
        name: "Pikachu",
        attack: 50,
        speed: 50,
        height: 50,
        weight: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(400);
    });
    it("deberia lanzar un error si la propiedad 'speed' no existe", () => {
      const body = {
        name: "Pikachu",
        attack: 50,
        defense: 50,
        height: 50,
        weight: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(400);
    });
    it("deberia lanzar un error si la propiedad 'height' no existe", () => {
      const body = {
        name: "Pikachu",
        attack: 50,
        defense: 50,
        speed: 50,
        weight: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(400);
    });
    it("deberia lanzar un error si la propiedad 'weight' no existe", () => {
      const body = {
        name: "Pikachu",
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(400);
    });
    it("deberia lanzar un error si la propiedad 'types' no existe", () => {
      const body = {
        name: "Pikachu",
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
      };
      return agent.post("/pokemons").send(body).expect(400);
    });
    it("deberia crear correctamente un pokemon si recibe todas las propiedades necesarias", () => {
      const body = {
        name: "Raichu",
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
        weight: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(201);
    });
    it("deberia responder con status 409 si el pokemon ya existe", () => {
      const body = {
        name: "Pikachu",
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
        weight: 50,
        types: ["electric"],
      };
      return agent.post("/pokemons").send(body).expect(409);
    });
  });
});
