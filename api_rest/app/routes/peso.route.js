module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const { VERSION, REST, API } = require("../util/constants");
  const peso = require("../controllers/peso.controller.js");

  var router = require("express").Router();

  // Crear un nuevo peso
  router.post("/", isAuthenticated, peso.create);

  // Obtener los pesos
  router.get("/cliente/:id_cliente", isAuthenticated, peso.findAll);

  // Obtener un peso con su id
  router.get("/:id_peso/cliente/:id_cliente", isAuthenticated, peso.findOne);

  // Actualizar un peso con su id
  router.put("/:id_peso", isAuthenticated, peso.update);

  // Borrar un peso con su id
  router.delete("/:id_peso/cliente/:id_cliente", isAuthenticated, peso.delete);

  // Borrar todos los pesos
  router.delete("/cliente/:id_cliente", isAuthenticated, peso.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/peso`, router);
};

// Crear para buscar dietas por orden cronologico pero de 10 en 10 registros o similar
