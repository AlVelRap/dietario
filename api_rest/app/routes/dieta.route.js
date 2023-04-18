module.exports = (app) => {
    const VERSION = "1.0";
    const REST = "rest";
    const API = "api";
    // const {VERSION,REST,API} = require("../util/constant")
    const dieta = require("../controllers/dieta.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo dieta
    router.post("/", dieta.create);
  
    // Obtener los dietas
    router.get("/cliente/:id_cliente", dieta.findAll);
  
    // Obtener un dieta con su id
    router.get("/:id_dieta/cliente/:id_cliente", dieta.findOne);
  
    // Actualizar un dieta con su id
    router.put("/:id_dieta", dieta.update);
  
    // Borrar un dieta con su id
    router.delete("/:id_dieta/cliente/:id_cliente", dieta.delete);
  
    // Borrar todos los dietas
    router.delete("/cliente/:id_cliente", dieta.deleteAll);
  
    app.use(`/${API}/${REST}/${VERSION}/dieta`, router);
  };
  