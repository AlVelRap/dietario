module.exports = (app) => {
  const { isAuthenticated } = require("../auth/index");
  const VERSION = "1.0";
  const REST = "rest";
  const API = "api";
  // const {VERSION,REST,API} = require("../util/constant")
  const cliente = require("../controllers/cliente.controller.js");

  var router = require("express").Router();

  // Crear un nuevo cliente
  router.post("/", isAuthenticated, cliente.create);

  // Obtener los clientes
  router.get("/", isAuthenticated, cliente.findAll);

  // Obtener un cliente con su id
  router.get("/:id_cliente", isAuthenticated, cliente.findOne);

  // Actualizar un cliente con su id
  router.put("/:id_cliente", isAuthenticated, cliente.update);

  // Borrar un cliente con su id
  router.delete(
    "/:id_cliente",
    isAuthenticated,
    cliente.delete
  );

  // Borrar todos los clientes
  router.delete("/", isAuthenticated, cliente.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/cliente`, router);
};
