module.exports = (app) => {
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const vitaminas = require("../controllers/vitaminas.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo vitaminas
  router.get("/", vitaminas.findAll);

  // Obtener un vitaminas con su id
  router.get("/ingrediente/:id_ingrediente", vitaminas.findOne);

  app.use(`/${API}/${REST}/${VERSION}/vitaminas`, router);
};
