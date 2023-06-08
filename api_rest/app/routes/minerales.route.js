module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const minerales = require("../controllers/minerales.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo minerales
  router.get("/", isAuthenticated, minerales.findAll);

  // Obtener un minerales con su id
  router.get(
    "/ingrediente/:id_ingrediente",
    isAuthenticated,
    minerales.findOne
  );

  app.use(`/${API}/${REST}/${VERSION}/minerales`, router);
};
