module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const { VERSION, REST, API } = require("../util/constants");
  const ingrediente = require("../controllers/ingrediente.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo ingrediente
  router.get("/", isAuthenticated, ingrediente.findAll);

  // Obtener un ingrediente con su id
  router.get("/:id_ingrediente", isAuthenticated, ingrediente.findOne);

  app.use(`/${API}/${REST}/${VERSION}/ingrediente`, router);
};
