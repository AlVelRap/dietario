module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const ingesta = require("../controllers/ingesta.controller.js");

  var router = require("express").Router();

  // Crear un nuevo ingesta
  router.post("/", isAuthenticated, ingesta.create);

  // Obtener los ingestas
  router.get("/dieta/:id_dieta", isAuthenticated, ingesta.findAll);

  // Obtener un ingesta con su id
  router.get("/:id_ingesta/dieta/:id_dieta", isAuthenticated, ingesta.findOne);

  // Actualizar un ingesta con su id
  router.put("/:id_ingesta", isAuthenticated, ingesta.update);

  // Borrar un ingesta con su id
  router.delete(
    "/:id_ingesta/dieta/:id_dieta",
    isAuthenticated,
    ingesta.delete
  );

  // Borrar todos los ingestas
  router.delete("/dieta/:id_dieta", isAuthenticated, ingesta.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/ingesta`, router);
};
