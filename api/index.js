const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 5000;

// Syncing all the models at once.
conn.sync().then(() => {
  server.listen(port, () => {
    console.log("servidor levantado en el puerto " + port); // eslint-disable-line no-console
  });
});
