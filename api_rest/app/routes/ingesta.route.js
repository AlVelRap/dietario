module.exports = (app) => {
    const VERSION = "1.0";
    const REST = "rest";
    const API = "api";
    // const {VERSION,REST,API} = require("../util/constant")
    const ingesta = require("../controllers/ingesta.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo ingesta
    router.post("/", ingesta.create);
  
    // Obtener los ingestas
    router.get("/dieta/:id_dieta", ingesta.findAll);
  
    // Obtener un ingesta con su id
    router.get("/:id_ingesta/dieta/:id_dieta", ingesta.findOne);
  
    // Actualizar un ingesta con su id
    router.put("/:id_ingesta", ingesta.update);
  
    // Borrar un ingesta con su id
    router.delete("/:id_ingesta/dieta/:id_dieta", ingesta.delete);
  
    // Borrar todos los ingestas
    router.delete("/dieta/:id_dieta", ingesta.deleteAll);
  
    app.use(`/${API}/${REST}/${VERSION}/ingesta`, router);
  };
  