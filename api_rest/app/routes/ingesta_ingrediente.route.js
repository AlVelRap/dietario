module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const ingesta_ingrediente = require("../controllers/ingesta_ingrediente.controller");

  var router = require("express").Router();

  // Crear un nuevo ingesta_ingrediente
  router.post("/", isAuthenticated, ingesta_ingrediente.create);

  // Obtener los ingesta_ingredientes
  router.get(
    "/ingesta/:id_ingesta",
    isAuthenticated,
    ingesta_ingrediente.findAll
  );

  // Obtener un ingesta_ingrediente con su id
  router.get(
    "/ingrediente/:id_ingrediente/ingesta/:id_ingesta",
    isAuthenticated,
    ingesta_ingrediente.findOne
  );

  // Actualizar un ingesta_ingrediente con su id
  router.put(
    "/ingrediente/:id_ingrediente/ingesta/:id_ingesta",
    isAuthenticated,
    ingesta_ingrediente.update
  );

  // Borrar un ingesta_ingrediente con su id
  router.delete(
    "/ingrediente/:id_ingrediente/ingesta/:id_ingesta",
    isAuthenticated,
    ingesta_ingrediente.delete
  );

  // Borrar todos los ingesta_ingredientes
  router.delete(
    "/ingesta/:id_ingesta",
    isAuthenticated,
    ingesta_ingrediente.deleteAll
  );

  app.use(`/${API}/${REST}/${VERSION}/ingesta_ingrediente`, router);
};
