const Ingesta = require("../models/ingesta.model.js");

// Crear un nuevo Ingesta
exports.create = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }
  // Creamos un Ingesta
  const ingesta = new Ingesta({
    id_dieta: req.body.id_dieta,
    nombre: req.body.nombre,
  });

  // Guardar el Ingesta en la DB
  Ingesta.create(ingesta, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el Ingesta.",
      });
    else res.send(data);
  });
};

// Recibir los Ingestas de la DB
exports.findAll = (req, res) => {
  Ingesta.getAll(req.params.id_dieta,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los Ingestas.",
      });
    else res.send(data);
  });
};

// Encontrar un Ingesta por su ID
exports.findOne = (req, res) => {
  Ingesta.findById(req.params.id_dieta,req.params.id_ingesta, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Ingesta con el id ${req.params.id_ingesta}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Ingesta con id " + req.params.id_ingesta,
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Ingesta por su ID
exports.update = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  console.log(req.body);
  console.log(req.params.id_ingesta);

  Ingesta.updateById(req.params.id_ingesta, new Ingesta(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Ingesta con id ${req.params.id_ingesta}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar el Ingesta con id " + req.params.id_ingesta,
        });
      }
    } else res.send(data);
  });
};

// Borrar un Ingesta por su ID
exports.delete = (req, res) => {
  Ingesta.remove(req.params.id_dieta,req.params.id_ingesta, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Ingesta con id ${req.params.id_ingesta}.`,
        });
      } else {
        res.status(500).send({
          message: "No se ha podido borrar el Ingesta con ID " + req.params.id_ingesta,
        });
      }
    } else res.send({ message: `Ingesta borrado correctamente!` });
  });
};

// Borrar todos los Ingestas de la DB.
exports.deleteAll = (req, res) => {
  Ingesta.removeAll(req.params.id_dieta,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al borrar los Ingestas.",
      });
    else
      res.send({
        message: `Todos los Ingestas se han borrados correctamente!`,
      });
  });
};
