module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const { VERSION, REST, API } = require("../util/constants");
  const macronutrientes = require("../controllers/macronutrientes.controller.js");

  var router = require("express").Router();

  // Obtener un nuevo macronutrientes
  router.get("/", isAuthenticated, macronutrientes.findAll);

  // Obtener un macronutrientes con su id
  router.get(
    "/ingrediente/:id_ingrediente",
    isAuthenticated,
    macronutrientes.findOne
  );

  app.use(`/${API}/${REST}/${VERSION}/macronutrientes`, router);
};
