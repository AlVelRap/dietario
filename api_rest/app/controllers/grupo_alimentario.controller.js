const Grupo_Alimentario = require("../models/grupo_alimentario.model.js");

// Recibir los grupo_alimentarios de la DB (con condicion).
exports.findAll = (req, res) => {
  // const nombre = req.query.nombre;

  // Grupo_Alimentario.getAll(nombre, (err, data) => {
  Grupo_Alimentario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los grupo_alimentarios.",
      });
    else res.send(data);
  });
};

// Encontrar un Grupo_Alimentario por su ID
exports.findOne = (req, res) => {
  Grupo_Alimentario.findById(req.params.id_grupo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado grupo_alimentario con el id ${req.params.id_grupo}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el grupo_alimentario con id " + req.params.id_grupo,
        });
      }
    } else res.send(data);
  });
};
