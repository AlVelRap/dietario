const conn = require("./db.js");

// constructor
const Ingesta_Ingrediente = function (ingesta_ingrediente) {
  this.id_ingesta = ingesta_ingrediente.id_ingesta;
  this.id_ingrediente = ingesta_ingrediente.id_ingrediente;
  this.cantidad = ingesta_ingrediente.cantidad;
};

Ingesta_Ingrediente.create = (nuevoIngesta_Ingrediente, result) => {
  conn.query(
    "INSERT INTO ingesta_ingrediente SET ?",
    nuevoIngesta_Ingrediente,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("ingesta_ingrediente creado: ", {
        id: res.insertId,
        ...nuevoIngesta_Ingrediente,
      });
      result(null, { id: res.insertId, ...nuevoIngesta_Ingrediente });
    }
  );
};

Ingesta_Ingrediente.findById = (id_ingesta, id_ingrediente, result) => {
  conn.query(
    `SELECT * FROM ingesta_ingrediente WHERE id_ingesta = ? and id_ingrediente = ?`,
    [id_ingesta, id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ingesta_ingrediente encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // ingesta_ingrediente no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Ingesta_Ingrediente.getAll = (id_ingesta, result) => {
  let query = "SELECT * FROM ingesta_ingrediente WHERE id_ingesta = ?";

  conn.query(query, [id_ingesta], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ingesta_ingredientes: ", res);
    result(null, res);
  });
};

Ingesta_Ingrediente.updateById = (
  id_ingesta,
  id_ingrediente,
  ingesta_ingrediente,
  result
) => {
  conn.query(
    "UPDATE ingesta_ingrediente SET cantidad = ? WHERE id_ingesta = ? AND id_ingrediente = ?;",
    [ingesta_ingrediente.cantidad, id_ingesta, id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado ingesta_ingrediente con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("ingesta_ingrediente actualizado: ", {
        id_ingesta: id_ingesta,
        id_ingrediente: id_ingrediente,
        ...ingesta_ingrediente,
      });
      result(null, {
        id_ingesta: id_ingesta,
        id_ingrediente: id_ingrediente,
        ...ingesta_ingrediente,
      });
    }
  );
};

Ingesta_Ingrediente.remove = (id_ingesta, id_ingrediente, result) => {
  conn.query(
    "DELETE FROM ingesta_ingrediente WHERE id_ingesta = ? AND id_ingrediente = ?",
    [id_ingesta, id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado ingesta_ingrediente con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Borrado el ingesta_ingrediente con el id: ", id_ingrediente);
      result(null, res);
    }
  );
};

Ingesta_Ingrediente.removeAll = (id_ingesta, result) => {
  conn.query(
    "DELETE FROM ingesta_ingrediente WHERE id_ingesta = ?",
    [id_ingesta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`Se han borrado ${res.affectedRows} ingesta_ingredientes`);
      result(null, res);
    }
  );
};

module.exports = Ingesta_Ingrediente;
