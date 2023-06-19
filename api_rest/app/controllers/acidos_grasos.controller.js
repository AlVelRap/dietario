const Acidos_Grasos = require("../models/acidos_grasos.model.js");

// Recibir los acidos_grasoss de la DB
exports.findAll = (req, res) => {

  Acidos_Grasos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los acidos_grasoss.",
      });
    else res.send(data);
  });
};

// Encontrar un Acidos_Grasos por su ID
exports.findOne = (req, res) => {
  Acidos_Grasos.findById(req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado acidos_grasos con el id ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el acidos_grasos con id " + req.params.id_ingrediente,
        });
      }
    } else res.send(data);
  });
};
