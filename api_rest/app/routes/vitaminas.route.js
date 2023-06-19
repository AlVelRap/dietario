module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const { VERSION, REST, API } = require("../util/constants");
  const vitaminas = require("../controllers/vitaminas.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo vitaminas
  router.get("/", isAuthenticated, vitaminas.findAll);

  // Obtener un vitaminas con su id
  router.get(
    "/ingrediente/:id_ingrediente",
    isAuthenticated,
    vitaminas.findOne
  );

  app.use(`/${API}/${REST}/${VERSION}/vitaminas`, router);
};
