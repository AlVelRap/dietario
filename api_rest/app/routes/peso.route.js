module.exports = (app) => {
    const VERSION = "1.0";
    const REST = "rest";
    const API = "api";
    // const {VERSION,REST,API} = require("../util/constant")
    const peso = require("../controllers/peso.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo peso
    router.post("/", peso.create);
  
    // Obtener los pesos
    router.get("/cliente/:id_cliente", peso.findAll);
  
    // Obtener un peso con su id
    router.get("/:id_peso/cliente/:id_cliente", peso.findOne);
  
    // Actualizar un peso con su id
    router.put("/:id_peso", peso.update);
  
    // Borrar un peso con su id
    router.delete("/:id_peso/cliente/:id_cliente", peso.delete);
  
    // Borrar todos los pesos
    router.delete("/cliente/:id_cliente", peso.deleteAll);
  
    app.use(`/${API}/${REST}/${VERSION}/peso`, router);
  };
  