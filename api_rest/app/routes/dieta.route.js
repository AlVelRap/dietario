module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const { VERSION, REST, API } = require("../util/constants");
  const dieta = require("../controllers/dieta.controller.js");

  var router = require("express").Router();

  // Crear un nuevo dieta
  router.post("/", isAuthenticated, dieta.create);

  // Obtener los dietas
  router.get("/cliente/:id_cliente", isAuthenticated, dieta.findAll);

  // Obtener un dieta con su id
  router.get("/:id_dieta/cliente/:id_cliente", isAuthenticated, dieta.findOne);

  // Actualizar un dieta con su id
  router.put("/:id_dieta", isAuthenticated, dieta.update);

  // Borrar un dieta con su id
  router.delete(
    "/:id_dieta/cliente/:id_cliente",
    isAuthenticated,
    dieta.delete
  );

  // Borrar todos los dietas
  router.delete("/cliente/:id_cliente", isAuthenticated, dieta.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/dieta`, router);
};

// Crear para buscar dietas por orden cronologico pero de 10 en 10 registros o similar
