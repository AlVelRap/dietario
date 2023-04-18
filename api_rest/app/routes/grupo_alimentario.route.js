module.exports = (app) => {
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const grupo_alimentario = require("../controllers/grupo_alimentario.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo grupo_alimentario
  router.get("/", grupo_alimentario.findAll);

  // Obtener un grupo_alimentario con su id
  router.get("/:id_grupo", grupo_alimentario.findOne);

  app.use(`/${API}/${REST}/${VERSION}/grupo_alimentario`, router);
};
