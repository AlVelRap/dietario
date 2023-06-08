module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const acidos_grasos = require("../controllers/acidos_grasos.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo acidos_grasos
  router.get("/", isAuthenticated, acidos_grasos.findAll);

  // Obtener un acidos_grasos con su id
  router.get(
    "/ingrediente/:id_ingrediente",
    isAuthenticated,
    acidos_grasos.findOne
  );

  app.use(`/${API}/${REST}/${VERSION}/acidos_grasos`, router);
};
