const conn = require("./db.js");

// constructor
const Usuario = function (usuario) {
  this.id_user = usuario.id_user;
  this.nombre = usuario.nombre;
  this.apellidos = usuario.apellidos;
  this.email = usuario.email;
  this.password = usuario.password;
  this.salt = usuario.salt;
};

Usuario.create = (nuevoUsuario, result) => {
  conn.query("INSERT INTO usuario SET ?", nuevoUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("usuario creado: ", { id: res.insertId, ...nuevoUsuario });
    result(null, { id: res.insertId, ...nuevoUsuario });
  });
};

Usuario.findById = (id, result) => {
  conn.query(`SELECT * FROM usuario WHERE id_user = ?`, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("usuario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Usuario no encontrado por ID
    result({ kind: "not_found" }, null);
  });
};

Usuario.findByEmail = (email, result) => {
  conn.query(`SELECT * FROM usuario WHERE email = ?`, [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("usuario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Usuario no encontrado por email
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (result) => {
  //(nombre, result) => {
  let query = "SELECT * FROM usuario";

  // if (nombre) {
  //   query += ` WHERE nombre LIKE '%${nombre}%'`;
  // }

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  conn.query(
    "UPDATE usuario SET nombre = ?, apellidos = ?, email = ?, password = ?, salt = ? WHERE id_user = ?",
    [
      usuario.nombre,
      usuario.apellidos,
      usuario.email,
      usuario.password,
      usuario.salt,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado usuario con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("usuario actualizado: ", { id: id, ...usuario });
      result(null, { id: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  conn.query("DELETE FROM usuario WHERE id_user = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no se ha encontrado usuario con id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Borrado el usuario con el id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = (result) => {
  conn.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Se han boorado ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;
