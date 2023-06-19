module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const { VERSION, REST, API } = require("../util/constants");
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
