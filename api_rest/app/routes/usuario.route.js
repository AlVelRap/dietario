module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const { VERSION, REST, API } = require("../util/constants");
  const usuario = require("../controllers/usuario.controller.js");

  var router = require("express").Router();

  // Crear un nuevo usuario
  router.post("/register", usuario.create);

  // Para hacer login
  router.post("/login", usuario.login);

  // Obtener un usuario con su id
  router.get("/", isAuthenticated, usuario.findOne);

  // Actualizar un usuario con su id
  router.put("/", isAuthenticated, usuario.update);

  // Actualizar un usuario con su id
  router.put("/password", isAuthenticated, usuario.updatePass);

  // Borrar un usuario con su id
  router.delete("/", isAuthenticated, usuario.delete);

  // // Borrar todos los usuarios
  // router.delete("/", isAuthenticated, usuario.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/usuario`, router);
};
