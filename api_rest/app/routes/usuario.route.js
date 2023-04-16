module.exports = (app) => {
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const usuario = require("../controllers/usuario.controller.js");

  var router = require("express").Router();

  // Crear un nuevo usuario
  router.post("/", usuario.create);

  // Obtener un nuevo usuario
  router.get("/", usuario.findAll);

  // Obtener un usuario con su id
  router.get("/:id", usuario.findOne);

  // Actualizar un usuario con su id
  router.put("/:id", usuario.update);

  // Borrar un usuario con su id
  router.delete("/:id", usuario.delete);

  // Borrar todos los usuarios
  router.delete("/", usuario.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/usuario`, router);
};
