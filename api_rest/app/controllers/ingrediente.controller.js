const Ingrediente = require("../models/ingrediente.model.js");

// Recibir los ingredientes de la DB (con condicion).
exports.findAll = (req, res) => {
  // const nombre = req.query.nombre;

  // Ingrediente.getAll(nombre, (err, data) => {
  Ingrediente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los ingredientes.",
      });
    else res.send(data);
  });
};

// Encontrar un Ingrediente por su ID
exports.findOne = (req, res) => {
  Ingrediente.findById(req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado ingrediente con el id ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el ingrediente con id " + req.params.id_ingrediente,
        });
      }
    } else res.send(data);
  });
};
