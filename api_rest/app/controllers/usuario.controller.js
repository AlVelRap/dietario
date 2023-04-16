const Usuario = require("../models/usuario.model.js");

// Crear un nuevo Usuario
exports.create = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  // Creamos un Usuario
  const usuario = new Usuario({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: req.body.password,
    salt: req.body.salt,
  });

  // Guardar el usuario en la DB
  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el usuario.",
      });
    else res.send(data);
  });
};

// Recibir los usuarios de la DB (con condicion).
exports.findAll = (req, res) => {
  // const nombre = req.query.nombre;

  // Usuario.getAll(nombre, (err, data) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los usuarios.",
      });
    else res.send(data);
  });
};

// Encontrar un Usuario por su ID
exports.findOne = (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado usuario con el id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el usuario con id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// // find all published Usuario
// exports.findAllPublished = (req, res) => {

// };

// Actualizar un Usuario por su ID
exports.update = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  console.log(req.body);

  Usuario.updateById(req.params.id, new Usuario(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Usuario con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar el Usuario con id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Borrar un Usuario por su ID
exports.delete = (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Usuario con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se ha podido borrar el usuario con ID " + req.params.id,
        });
      }
    } else res.send({ message: `Usuario borrado correctamente!` });
  });
};

// Borrar todos los Usuarios de la DB.
exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al borrar los Usuarios.",
      });
    else
      res.send({
        message: `Todos los Usuarios se han borrados correctamente!`,
      });
  });
};
