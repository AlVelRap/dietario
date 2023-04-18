const conn = require("./db.js");

// constructor
const Vitaminas = function (vitaminas) {
  this.id_ingrediente = vitaminas.id_ingrediente;
  this.vit_a = vitaminas.vit_a;
  this.vit_d = vitaminas.vit_d;
  this.vit_e = vitaminas.vit_e;
  this.vit_c = vitaminas.vit_c;
  this.vit_b1 = vitaminas.vit_b1;
  this.vit_b2 = vitaminas.vit_b2;
  this.naicina = vitaminas.naicina;
  this.vit_b6 = vitaminas.vit_b6;
  this.vit_b12 = vitaminas.vit_b12;
  this.ac_folico = vitaminas.ac_folico;
};

Vitaminas.findById = (id_ingrediente, result) => {
  conn.query(
    `SELECT * FROM vitaminas WHERE id_ingrediente = ?`,
    [id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("vitaminas encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // vitaminas no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Vitaminas.getAll = (result) => {
  let query = "SELECT * FROM vitaminas";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vitaminas: ", res);
    result(null, res);
  });
};

module.exports = Vitaminas;
