const Minerales = require("../models/minerales.model.js");

// Recibir los mineraless de la DB.
exports.findAll = (req, res) => {
  Minerales.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los mineraless.",
      });
    else res.send(data);
  });
};

// Encontrar un Minerales por su ID
exports.findOne = (req, res) => {
  Minerales.findById(req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado minerales con el id ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el minerales con id " + req.params.id_ingrediente,
        });
      }
    } else res.send(data);
  });
};
