const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Property validators for pokemon", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("deberia lanzar un error si el nombre es nulo", (done) => {
        Pokemon.create({})
          .then((pokemon) => {
            expect(pokemon.name).to.be.null;
            done();
          })
          .catch((error) => {
            expect(error.errors[0].message).to.be.equal(
              "pokemon.name cannot be null"
            );
            done();
          });
      });
      it("deberia lanzar un error a pesar de tener otras propiedades", (done) => {
        Pokemon.create({ attack: 30 })
          .then((pokemon) => {
            expect(pokemon.name).to.be.null;
            done();
          })
          .catch((error) => {
            expect(error.errors[0].message).to.be.equal(
              "pokemon.name cannot be null"
            );
            done();
          });
      });
      it("deberia crear un pokemon si recibe un nombre valido", (done) => {
        Pokemon.create({ name: "pikachu" })
          .then((pokemon) => {
            expect(pokemon.name).to.be.equal("pikachu");
            done();
          })
          .catch((error) => {
            console.log(error.message);
            done(new Error(error));
          });
      });
    });
    describe("attack", () => {
      it("crea un pokemon con la propiedad 'attack'", (done) => {
        Pokemon.create({
          name: "pikachu",
          attack: 20,
        })
          .then((pokemon) => {
            expect(pokemon.attack).to.be.equal(20);
            done();
          })
          .catch((error) => {
            console.log(error.message);
            done(new Error(error));
          });
      });
    });
    describe("defense", () => {
      it("crea un pokemon con la propiedad 'defense'", (done) => {
        Pokemon.create({
          name: "pikachu",
          attack: 20,
          defense: 50,
        })
          .then((pokemon) => {
            expect(pokemon.defense).to.be.equal(50);
            done();
          })
          .catch((error) => {
            console.log(error.message);
            done(new Error(error));
          });
      });
    });
    describe("speed", () => {
      it("crea un pokemon con la propiedad 'speed'", (done) => {
        Pokemon.create({
          name: "pikachu",
          attack: 20,
          defense: 50,
          speed: 34,
        })
          .then((pokemon) => {
            expect(pokemon.speed).to.be.equal(34);
            done();
          })
          .catch((error) => {
            console.log(error.message);
            done(new Error(error));
          });
      });
    });
    describe("height", () => {
      it("crea un pokemon con la propiedad 'height'", (done) => {
        Pokemon.create({
          name: "pikachu",
          attack: 20,
          defense: 50,
          speed: 34,
          height: 10,
        })
          .then((pokemon) => {
            expect(pokemon.height).to.be.equal(10);
            done();
          })
          .catch((error) => {
            console.log(error.message);
            done(new Error(error));
          });
      });
    });
    describe("weight", () => {
      it("crea un pokemon con la propiedad 'weight'", (done) => {
        Pokemon.create({
          name: "pikachu",
          attack: 20,
          defense: 50,
          speed: 34,
          height: 10,
          weight: 15,
        })
          .then((pokemon) => {
            expect(pokemon.weight).to.be.equal(15);
            done();
          })
          .catch((error) => {
            console.log(error.message);
            done(new Error(error));
          });
      });
    });
  });
});
