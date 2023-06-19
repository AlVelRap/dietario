const Dieta = require("../models/dieta.model.js");

// Crear un nuevo Dieta
exports.create = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }
  // Creamos un Dieta
  const dieta = new Dieta({
    id_cliente: req.body.id_cliente,
    fecha_dieta: req.body.fecha_dieta,
    objetivo: req.body.objetivo,
  });

  // Guardar el Dieta en la DB
  Dieta.create(dieta, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el Dieta.",
      });
    else res.send(data);
  });
};

// Recibir los Dietas de la DB
exports.findAll = (req, res) => {
  Dieta.getAll(req.params.id_cliente,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los Dietas.",
      });
    else res.send(data);
  });
};

// Encontrar un Dieta por su ID
exports.findOne = (req, res) => {
  Dieta.findById(req.params.id_cliente,req.params.id_dieta, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Dieta con el id ${req.params.id_dieta}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Dieta con id " + req.params.id_dieta,
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Dieta por su ID
exports.update = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  console.log(req.body);
  console.log(req.params.id_dieta);

  Dieta.updateById(req.params.id_dieta, new Dieta(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Dieta con id ${req.params.id_dieta}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar el Dieta con id " + req.params.id_dieta,
        });
      }
    } else res.send(data);
  });
};

// Borrar un Dieta por su ID
exports.delete = (req, res) => {
  Dieta.remove(req.params.id_cliente,req.params.id_dieta, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Dieta con id ${req.params.id_dieta}.`,
        });
      } else {
        res.status(500).send({
          message: "No se ha podido borrar el Dieta con ID " + req.params.id_dieta,
        });
      }
    } else res.send({ message: `Dieta borrado correctamente!` });
  });
};

// Borrar todos los Dietas de la DB.
exports.deleteAll = (req, res) => {
  Dieta.removeAll(req.params.id_cliente,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al borrar los Dietas.",
      });
    else
      res.send({
        message: `Todos los Dietas se han borrados correctamente!`,
      });
  });
};
