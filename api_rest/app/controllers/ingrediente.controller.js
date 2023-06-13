const Ingrediente = require("../models/ingrediente.model.js");

// Recibir los ingredientes de la DB (con condicion).
exports.findAll = (req, res) => {
  const id_grupo = req.query.id_grupo;
  if (id_grupo) {
    Ingrediente.getAllByGrupo(id_grupo, (err, data) => {
      if (err)
        return res.status(500).send({
          message:
            err.message || "Un error ocurrió al recibir los ingredientes.",
        });
      else return res.send(data);
    });
  } else {
    Ingrediente.getAll((err, data) => {
      if (err)
        return res.status(500).send({
          message:
            err.message || "Un error ocurrió al recibir los ingredientes.",
        });
      else return res.send(data);
    });
  }
};

// Encontrar un Ingrediente por su ID
exports.findOne = (req, res) => {
  Ingrediente.findById(req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se ha encontrado ingrediente con el id ${req.params.id_ingrediente}.`,
        });
      } else {
        return res.status(500).send({
          message:
            "Error al recibir el ingrediente con id " +
            req.params.id_ingrediente,
        });
      }
    } else return res.send(data);
  });
};
