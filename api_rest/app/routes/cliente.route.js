module.exports = (app) => {
    const VERSION = "1.0";
    const REST = "rest";
    const API = "api";
    // const {VERSION,REST,API} = require("../util/constant")
    const cliente = require("../controllers/cliente.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo cliente
    router.post("/", cliente.create);
  
    // Obtener los clientes
    router.get("/:id_user", cliente.findAll);
  
    // Obtener un cliente con su id
    router.get("/:id_user/:id_cliente", cliente.findOne);
  
    // Actualizar un cliente con su id
    router.put("/:id_cliente", cliente.update);
  
    // Borrar un cliente con su id
    router.delete("/:id_user/:id_cliente", cliente.delete);
  
    // Borrar todos los clientes
    router.delete("/:id_user", cliente.deleteAll);
  
    app.use(`/${API}/${REST}/${VERSION}/cliente`, router);
  };
  