const conn = require("./db.js");

// constructor
const Ingrediente = function (ingrediente) {
  this.id_ingrediente = ingrediente.id_ingrediente;
  this.id_grupo = ingrediente.id_grupo;
  this.nombre = ingrediente.nombre;
};

Ingrediente.findById = (id_ingrediente, result) => {
  conn.query(
    `SELECT * FROM ingrediente WHERE id_ingrediente = ?`,
    [id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ingrediente encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // ingrediente no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Ingrediente.getAll = (result) => {
  let query = "SELECT * FROM ingrediente order by nombre";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ingredientes: ", res);
    result(null, res);
  });
};
Ingrediente.getAllByGrupo = (id_grupo, result) => {
  let query = "SELECT * FROM ingrediente WHERE id_grupo = ? order by nombre;";

  conn.query(query, [id_grupo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ingredientes: ", res);
    result(null, res);
  });
};

module.exports = Ingrediente;
