const Vitaminas = require("../models/vitaminas.model.js");

// Recibir los vitaminass de la DB (con condicion).
exports.findAll = (req, res) => {
  // const nombre = req.query.nombre;

  // Vitaminas.getAll(nombre, (err, data) => {
  Vitaminas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los vitaminass.",
      });
    else res.send(data);
  });
};

// Encontrar un Vitaminas por su ID
exports.findOne = (req, res) => {
  Vitaminas.findById(req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado vitaminas con el id ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el vitaminas con id " + req.params.id_ingrediente,
        });
      }
    } else res.send(data);
  });
};
