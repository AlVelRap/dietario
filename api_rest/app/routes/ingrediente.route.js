module.exports = (app) => {
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const ingrediente = require("../controllers/ingrediente.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo ingrediente
  router.get("/", ingrediente.findAll);

  // Obtener un ingrediente con su id
  router.get("/:id_ingrediente", ingrediente.findOne);

  app.use(`/${API}/${REST}/${VERSION}/ingrediente`, router);
};