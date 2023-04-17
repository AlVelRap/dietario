const conn = require("./db.js");

// constructor
const Peso = function (peso) {
  this.id_peso = peso.id_peso;
  this.id_cliente = peso.id_cliente;
  this.fecha = peso.fecha;
  this.peso = peso.peso;
};

Peso.create = (nuevoPeso, result) => {
  conn.query("INSERT INTO peso SET ?", nuevoPeso, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("peso creado: ", { id: res.insertId, ...nuevoPeso });
    result(null, { id: res.insertId, ...nuevoPeso });
  });
};

Peso.findById = (id_cliente, id_peso, result) => {
  conn.query(
    `SELECT * FROM peso WHERE id_cliente = ? and id_peso = ?`,
    [id_cliente, id_peso],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("peso encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // peso no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Peso.getAll = (id_cliente, result) => {
  let query = "SELECT * FROM peso WHERE id_cliente = ?";

  conn.query(query, [id_cliente], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pesos: ", res);
    result(null, res);
  });
};

Peso.updateById = (id_peso, peso, result) => {
  conn.query(
    "UPDATE peso SET id_cliente = ?, fecha = ?, peso = ? WHERE id_peso = ?;",
    [peso.id_cliente, peso.fecha, peso.peso, id_peso],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado peso con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("peso actualizado: ", {
        id_peso: id_peso,
        ...peso,
      });
      result(null, { id_peso: id_peso, ...peso });
    }
  );
};

Peso.remove = (id_cliente, id_peso, result) => {
  conn.query(
    "DELETE FROM peso WHERE id_cliente = ? AND id_peso = ?",
    [id_cliente, id_peso],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado peso con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Borrado el peso con el id: ", id_peso);
      result(null, res);
    }
  );
};

Peso.removeAll = (id_cliente, result) => {
  conn.query(
    "DELETE FROM peso WHERE id_cliente = ?",
    [id_cliente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`Se han borrado ${res.affectedRows} pesos`);
      result(null, res);
    }
  );
};

module.exports = Peso;
