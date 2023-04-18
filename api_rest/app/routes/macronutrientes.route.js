module.exports = (app) => {
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const macronutrientes = require("../controllers/macronutrientes.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo macronutrientes
  router.get("/", macronutrientes.findAll);

  // Obtener un macronutrientes con su id
  router.get("/ingrediente/:id_ingrediente", macronutrientes.findOne);

  app.use(`/${API}/${REST}/${VERSION}/macronutrientes`, router);
};
