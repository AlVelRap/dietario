const conn = require("./db.js");

// constructor
const Minerales = function (minerales) {
  this.id_ingrediente = minerales.id_ingrediente;
  this.sodio = minerales.sodio;
  this.potasio = minerales.potasio;
  this.calcio = minerales.calcio;
  this.magnesio = minerales.magnesio;
  this.hierro = minerales.hierro;
  this.zinc = minerales.zinc;
  this.fosforo = minerales.fosforo;
  this.iodo = minerales.iodo;
  this.fluor = minerales.fluor;
  this.cobre = minerales.cobre;
  this.selenio = minerales.selenio;
};

Minerales.findById = (id_ingrediente, result) => {
  conn.query(
    `SELECT * FROM minerales WHERE id_ingrediente = ?`,
    [id_ingrediente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("minerales encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // minerales no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Minerales.getAll = (result) => {
  let query = "SELECT * FROM minerales";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("mineraless: ", res);
    result(null, res);
  });
};

module.exports = Minerales;
