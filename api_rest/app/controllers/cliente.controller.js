const Cliente = require("../models/cliente.model.js");

// Crear un nuevo Cliente
exports.create = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }
  // Creamos un Cliente
  const cliente = new Cliente({
    id_user: req.body.id_user,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    fecha_nacimiento: req.body.fecha_nacimiento,
    imagen: req.body.imagen,
  });

  // Guardar el Cliente en la DB
  Cliente.create(cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear el Cliente.",
      });
    else res.send(data);
  });
};

// Recibir los Clientes de la DB (con condicion).
exports.findAll = (req, res) => {
  Cliente.getAll(req.user.id_user,(err, data) => {

    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al recibir los Clientes.",
      });
    else res.send(data);
  });
};

// Encontrar un Cliente por su ID
exports.findOne = (req, res) => {
  Cliente.findById(req.user.id_user,req.params.id_cliente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Cliente con el id ${req.params.id_cliente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Cliente con id " + req.params.id_cliente,
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Cliente por su ID
exports.update = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  req.body.id_user = req.user.id_user

  console.log(req.body);
  // console.log(req.params.id_cliente);

  Cliente.updateById(req.body.id_cliente, new Cliente(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Cliente con id ${req.body.id_cliente}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al actualizar el Cliente con id " + req.body.id_cliente,
        });
      }
    } else res.send(data);
  });
};

// Borrar un Cliente por su ID
exports.delete = (req, res) => {
  Cliente.remove(req.user.id_user,req.params.id_cliente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado el Cliente con id ${req.params.id_cliente}.`,
        });
      } else {
        res.status(500).send({
          message: "No se ha podido borrar el Cliente con ID " + req.params.id_cliente,
        });
      }
    } else res.send({ message: `Cliente borrado correctamente!` });
  });
};

// Borrar todos los Clientes de la DB.
exports.deleteAll = (req, res) => {
  Cliente.removeAll(req.user.id_user,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Un error ocurrió al borrar los Clientes.",
      });
    else
      res.send({
        message: `Todos los Clientes se han borrados correctamente!`,
      });
  });
};
