const conn = require("./db.js");

// constructor
const Acidos_Grasos = function (acidos_grasos) {
  this.id_ingrediente = acidos_grasos.id_ingrediente;
  this.ac_g_saturado = acidos_grasos.ac_g_saturado;
  this.c14_0 = acidos_grasos.c14_0;
  this.c16_0 = acidos_grasos.c16_0;
  this.c18_0 = acidos_grasos.c18_0;
  this.ac_g_monoinsaturado = acidos_grasos.ac_g_monoinsaturado;
  this.c16_1 = acidos_grasos.c16_1;
  this.c18_1 = acidos_grasos.c18_1;
  this.ac_g_polinsaturado = acidos_grasos.ac_g_polinsaturado;
  this.c18_2 = acidos_grasos.c18_2;
  this.c18_3 = acidos_grasos.c18_3;
  this.colesterol = acidos_grasos.colesterol;
  this.etanol = acidos_grasos.etanol;
};

Acidos_Grasos.findById = (id_ingrediente, result) => {
  conn.query(
    `SELECT * FROM acidos_grasos WHERE id_ingrediente = ?`,
    [id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Acido Graso encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // acidos_grasos no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Acidos_Grasos.getAll = (result) => {
  let query = "SELECT * FROM acidos_grasos";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Acidos Grasos: ", res);
    result(null, res);
  });
};

module.exports = Acidos_Grasos;
