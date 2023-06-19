const Macronutrientes = require("../models/macronutrientes.model.js");

// Recibir los macronutrientess de la DB.
exports.findAll = (req, res) => {
  Macronutrientes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los macronutrientess.",
      });
    else res.send(data);
  });
};

// Encontrar un Macronutrientes por su ID
exports.findOne = (req, res) => {
  Macronutrientes.findById(req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado macronutrientes con el id ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el macronutrientes con id " + req.params.id_ingrediente,
        });
      }
    } else res.send(data);
  });
};
