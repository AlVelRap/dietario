const Peso = require("../models/peso.model.js");

// Crear un nuevo Peso
exports.create = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }
  // Creamos un Peso
  const peso = new Peso({
    id_cliente: req.body.id_cliente,
    fecha: req.body.fecha,
    peso: req.body.peso,
  });

  // Guardar el Peso en la DB
  Peso.create(peso, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el Peso.",
      });
    else res.send(data);
  });
};

// Recibir los Pesos de la DB.
exports.findAll = (req, res) => {
  Peso.getAll(req.params.id_cliente,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los Pesos.",
      });
    else res.send(data);
  });
};

// Encontrar un Peso por su ID
exports.findOne = (req, res) => {
  Peso.findById(req.params.id_cliente,req.params.id_peso, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Peso con el id ${req.params.id_peso}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Peso con id " + req.params.id_peso,
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Peso por su ID
exports.update = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  console.log(req.body);

  Peso.updateById(req.params.id_peso, new Peso(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Peso con id ${req.params.id_peso}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar el Peso con id " + req.params.id_peso,
        });
      }
    } else res.send(data);
  });
};

// Borrar un Peso por su ID
exports.delete = (req, res) => {
  Peso.remove(req.params.id_cliente,req.params.id_peso, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Peso con id ${req.params.id_peso}.`,
        });
      } else {
        res.status(500).send({
          message: "No se ha podido borrar el Peso con ID " + req.params.id_peso,
        });
      }
    } else res.send({ message: `Peso borrado correctamente!` });
  });
};

// Borrar todos los Pesos de la DB.
exports.deleteAll = (req, res) => {
  Peso.removeAll(req.params.id_cliente,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al borrar los Pesos.",
      });
    else
      res.send({
        message: `Todos los Pesos se han borrados correctamente!`,
      });
  });
};
