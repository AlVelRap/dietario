const express = require("express");
const cors = require("cors");

// Las variables de entorno
require("dotenv").config();

// Creamos la app
const app = express();

// Configuracion del CORS
var corsOptions = {
  // origin: "http://localhost:5173/",
  origin: "*",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Root
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Alberto" });
});

// Nuestras Rutas
require("./app/routes/usuario.route")(app);
require("./app/routes/cliente.route")(app);
require("./app/routes/dieta.route")(app);
require("./app/routes/peso.route")(app);
require("./app/routes/ingesta.route")(app);
require("./app/routes/ingesta_ingrediente.route")(app);
require("./app/routes/ingrediente.route")(app);
require("./app/routes/acidos_grasos.route")(app);
require("./app/routes/macronutrientes.route")(app);
require("./app/routes/minerales.route")(app);
require("./app/routes/vitaminas.route")(app);
require("./app/routes/grupo_alimentario.route")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}.`);
});
