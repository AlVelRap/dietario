const Usuario = require("../models/usuario.model.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Funcion del Token
const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET || "mi-secreto", {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

// Crear un nuevo Usuario
exports.create = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(req.body.password, newSalt, 10000, 64, "sha1", (err, key) => {
      // convertimos la contraseña que hemos recibido a texto
      const encryptedPassword = key.toString("base64");
      // Creamos un Usuario
      const usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: encryptedPassword,
        salt: newSalt,
      });
      // console.log(usuario)
      //buscamos por mail
      Usuario.findByEmail(req.body.email, (err, data) => {
        if (data) {
          return res.status(400).send({
            message: "el usuario ya existe.",
          });
        }
        // Guardar el usuario en la DB
        Usuario.create(usuario, (err, data) => {
          if (err)
            res.status(500).send({
              message: err.message || "Un error ocurrió al crear el usuario.",
            });
          else res.send(data);
        });
      });
    });
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

// Login de un usuario
exports.login = (req, res) => {
  Usuario.findByEmail(req.body.email, (err, data) => {
    // En caso de que el usuario no exista
    if (!data) {
      return res.status(404).send({
        message: `usuario y/o contraseña incorrecta`,
      });
    }
    console.log(data);
    // Creamos la contraseña encriptada igual que en el registro
    crypto.pbkdf2(
      req.body.password,
      data.salt,
      10000,
      64,
      "sha1",
      (err, key) => {
        // Convertimos a texto el resultado
        const encryptedPassword = key.toString("base64");
        // Si coinciden los datos de la DB y la contraseña generada
        if (data.password === encryptedPassword) {
          const token = signToken(data.id_user);
          return res.send({ token });
        }
        // si no coincide la contraseña devolvemos el mensaje de error
        return res.status(404).send({
          message: `usuario y/o contraseña incorrecta`,
        });
      }
    );
  });
};
exports.findOne = (req, res) => {
  Usuario.findById(req.user.id_user, (err, data) => {
    if (err) {
      console.log(err);
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ha encontrado Usuario con el id ${req.user.id_user}.`,
        });
      } else {
        res.status(500).send({
          message: "Error al recibir el Usuario con id " + req.user.id_user,
        });
      }
    } else {
      respuesta = {
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
      };
      res.send(respuesta);
    }
  });
};

// Actualizar un Usuario por su ID
exports.update = (req, res) => {
  // Validamos la petición
  if (!req.body) {
    return res.status(400).send({
      message: "La petición no puede esta vacía!",
    });
  }

  // Nos aseguramos que en caso de no haber nada.
  req.body.id_user = req.body.id_user ? req.body.id_user : req.user.id_user;
  req.body.nombre = req.body.nombre ? req.body.nombre : req.user.nombre;
  req.body.apellidos = req.body.apellidos
    ? req.body.apellidos
    : req.user.apellidos;
  req.body.email = req.body.email ? req.body.email : req.user.email;
  req.body.password = req.body.password ? req.body.password : req.user.password;
  req.body.salt = req.body.salt ? req.body.salt : req.user.salt;

  console.log(req.body);

  Usuario.updateById(req.user.id_user, new Usuario(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `No se ha encontrado el Usuario con id ${req.user.id_user}.`,
        });
      } else {
        return res.status(500).send({
          message: "Error al actualizar el Usuario con id " + req.user.id_user,
        });
      }
    } else {
      respuesta = {
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
      };

      return res.send(respuesta);
    }
  });
};
exports.updatePass = (req, res) => {
  if (!req.body) {
    return res.status(404).send({
      message: `usuario y/o contraseña incorrecta`,
    });
  }
  // Creamos la contraseña encriptada igual que en el registro
  crypto.pbkdf2(
    req.body.passActual,
    req.user.salt,
    10000,
    64,
    "sha1",
    (err, key) => {
      // Convertimos a texto el resultado
      const encryptedPassword = key.toString("base64");
      // Si coinciden los datos de la DB y la contraseña generada
      // Podemos crear la nueva contraseña
      if (req.user.password === encryptedPassword) {
        crypto.randomBytes(16, (err, salt) => {
          const newSalt = salt.toString("base64");
          crypto.pbkdf2(
            req.body.nuevoPass,
            newSalt,
            10000,
            64,
            "sha1",
            (err, key) => {
              // convertimos la contraseña que hemos recibido a texto
              const encryptedPassword = key.toString("base64");
              // Creamos un nuevo objeto Usuario con el nuevo pass,
              // el nuevo salta y el todos los datos anteriores
              const usuario = new Usuario({
                id_user: req.user.id_user,
                nombre: req.user.nombre,
                apellidos: req.user.apellidos,
                email: req.user.email,
                password: encryptedPassword,
                salt: newSalt,
              });
              // actualizamos el usuario
              Usuario.updateById(usuario.id_user, usuario, (err, data) => {
                if (err) {
                  if (err.kind === "not_found") {
                    return res.status(404).send({
                      message: `No se ha encontrado el Usuario con id ${usuario.id_user}.`,
                    });
                  } else {
                    return res.status(500).send({
                      message:
                        "Error al actualizar el Usuario con id " +
                        usuario.id_user,
                    });
                  }
                } else {
                  const token = signToken(data.id_user);
                  console.log(token);
                  return res.sendStatus(200)
                  // return res.send({ token });
                }
              });
            }
          );
        });
      } else {
        console.log("entra2");
        // si no coincide la contraseña devolvemos el mensaje de error
        return res.status(404).send({
          message: `usuario y/o contraseña incorrecta`,
        });
      }
    }
  );
};

// Borrar un Usuario por su ID
exports.delete = (req, res) => {
  Usuario.remove(req.user.id_user, (err, data) => {
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

// // Borrar todos los Usuarios de la DB.
// exports.deleteAll = (req, res) => {
//   Usuario.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message: err.message || "Un error ocurrió al borrar los Usuarios.",
//       });
//     else
//       res.send({
//         message: `Todos los Usuarios se han borrados correctamente!`,
//       });
//   });
// };
