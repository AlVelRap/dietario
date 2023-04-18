const conn = require("./db.js");

// constructor
const Grupo_Alimentario = function (grupo_alimentario) {
  this.id_grupo_alimentario = grupo_alimentario.id_grupo_alimentario;
  this.id_grupo = grupo_alimentario.id_grupo;
  this.nombre = grupo_alimentario.nombre;
};

Grupo_Alimentario.findById = (id_grupo, result) => {
  conn.query(
    `SELECT * FROM grupo_alimentario WHERE id_grupo = ?`,
    [id_grupo],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("grupo_alimentario encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // grupo_alimentario no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Grupo_Alimentario.getAll = (result) => {
  let query = "SELECT * FROM grupo_alimentario";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("grupo_alimentarios: ", res);
    result(null, res);
  });
};

module.exports = Grupo_Alimentario;
