const Ingesta_Ingrediente = require("../models/ingesta_ingrediente.model.js");

// Crear un nuevo Ingesta_Ingrediente
exports.create = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }
  // Creamos un Ingesta_Ingrediente
  const ingesta_ingrediente = new Ingesta_Ingrediente({
    id_ingesta: req.body.id_ingesta,
    id_ingrediente: req.body.id_ingrediente,
    cantidad: req.body.cantidad,
  });
  // Guardar el Ingesta_Ingrediente en la DB
  Ingesta_Ingrediente.create(ingesta_ingrediente, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el Ingesta_Ingrediente.",
      });
    else res.send(data);
  });
};

// Recibir los Ingesta_Ingredientes de la DB.
exports.findAll = (req, res) => {
  Ingesta_Ingrediente.getAll(req.params.id_ingesta,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los Ingesta_Ingredientes.",
      });
    else res.send(data);
  });
};

// Encontrar un Ingesta_Ingrediente por su ID
exports.findOne = (req, res) => {
  Ingesta_Ingrediente.findById(req.params.id_ingesta,req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Ingesta_Ingrediente con el id ${req.params.id_ingesta} e id_ingrediente ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Ingesta_Ingrediente con id_ingesta " + req.params.id_ingesta + " e id_ingrediente" +req.params.id_ingrediente,
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Ingesta_Ingrediente por su ID
exports.update = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  console.log(req.body);

  Ingesta_Ingrediente.updateById(req.params.id_ingesta, req.params.id_ingrediente, new Ingesta_Ingrediente(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Ingesta_Ingrediente con el id ${req.params.id_ingesta} e id_ingrediente ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Ingesta_Ingrediente con id_ingesta " + req.params.id_ingesta + " e id_ingrediente" +req.params.id_ingrediente,
        });
      }
    } else res.send(data);
  });
};

// Borrar un Ingesta_Ingrediente por su ID
exports.delete = (req, res) => {
  Ingesta_Ingrediente.remove(req.params.id_ingesta,req.params.id_ingrediente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Ingesta_Ingrediente con el id ${req.params.id_ingesta} e id_ingrediente ${req.params.id_ingrediente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Ingesta_Ingrediente con id_ingesta " + req.params.id_ingesta + " e id_ingrediente" +req.params.id_ingrediente,
        });
      }
    } else res.send({ message: `Ingesta_Ingrediente borrado correctamente!` });
  });
};

// Borrar todos los Ingesta_Ingredientes de la DB.
exports.deleteAll = (req, res) => {
  Ingesta_Ingrediente.removeAll(req.params.id_ingesta,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al borrar los Ingesta_Ingredientes.",
      });
    else
      res.send({
        message: `Todos los Ingesta_Ingredientes se han borrados correctamente!`,
      });
  });
};
