const conn = require("./db.js");

// constructor
const Macronutrientes = function (macronutrientes) {
  this.id_ingrediente = macronutrientes.id_ingrediente;
  this.porcion_comestible = macronutrientes.porcion_comestible;
  this.energia = macronutrientes.energia;
  this.proteinas = macronutrientes.proteinas;
  this.hdc = macronutrientes.hdc;
  this.fibra = macronutrientes.fibra;
  this.lipidos = macronutrientes.lipidos;
};

Macronutrientes.findById = (id_ingrediente, result) => {
  conn.query(
    `SELECT * FROM macronutrientes WHERE id_ingrediente = ?`,
    [id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("macronutrientes encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // macronutrientes no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Macronutrientes.getAll = (result) => {
  let query = "SELECT * FROM macronutrientes";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("macronutrientess: ", res);
    result(null, res);
  });
};

module.exports = Macronutrientes;
