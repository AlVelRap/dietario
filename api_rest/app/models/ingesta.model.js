const conn = require("./db.js");

// constructor
const Ingesta = function (ingesta) {
  this.id_ingesta = ingesta.id_ingesta;
  this.id_dieta = ingesta.id_dieta;
  this.nombre = ingesta.nombre;
};

Ingesta.create = (nuevoIngesta, result) => {
  conn.query("INSERT INTO ingesta SET ?", nuevoIngesta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("ingesta creado: ", { id: res.insertId, ...nuevoIngesta });
    result(null, { id: res.insertId, ...nuevoIngesta });
  });
};

Ingesta.findById = (id_dieta, id_ingesta, result) => {
  conn.query(
    // `SELECT * FROM ingesta WHERE id_dieta = ? and id_ingesta = ?`,
    "SELECT i.id_ingesta, i.id_dieta, i.nombre, " +
      "COALESCE(sum(m.energia*ii.cantidad/100),0) as energiaTotal, " +
      "COALESCE(sum(m.proteinas*ii.cantidad/100),0) as proteinasTotal, " +
      "COALESCE(sum(m.hdc*ii.cantidad/100),0) as hdcTotal, " +
      "COALESCE(sum(m.fibra*ii.cantidad/100),0) as fibraTotal, " +
      "COALESCE(sum(m.lipidos*ii.cantidad/100),0) as lipidosTotal " +
      "FROM ingesta i  " +
      "left join ingesta_ingrediente ii on i.id_ingesta=ii.id_ingesta " +
      "left join macronutrientes m on ii.id_ingrediente = m.id_ingrediente " +
      "where i.id_ingesta = ? and i.id_dieta = ? " +
      "group by i.id_ingesta;",
    [id_dieta, id_ingesta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("ingesta encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // ingesta no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Ingesta.getAll = (id_dieta, result) => {
  // let query = "SELECT * FROM ingesta WHERE id_dieta = ?";
  let query ="SELECT i.id_ingesta, i.id_dieta, i.nombre, " +
      "COALESCE(sum(m.energia*ii.cantidad/100),0) as energiaTotal, " +
      "COALESCE(sum(m.proteinas*ii.cantidad/100),0) as proteinasTotal, " +
      "COALESCE(sum(m.hdc*ii.cantidad/100),0) as hdcTotal, " +
      "COALESCE(sum(m.fibra*ii.cantidad/100),0) as fibraTotal, " +
      "COALESCE(sum(m.lipidos*ii.cantidad/100),0) as lipidosTotal " +
      "FROM ingesta i  " +
      "left join ingesta_ingrediente ii on i.id_ingesta=ii.id_ingesta " +
      "left join macronutrientes m on ii.id_ingrediente = m.id_ingrediente " +
      "where i.id_dieta = ? " +
      "group by i.id_ingesta;"

  conn.query(query, [id_dieta], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ingestas: ", res);
    result(null, res);
  });
};

Ingesta.updateById = (id_ingesta, ingesta, result) => {
  conn.query(
    "UPDATE ingesta SET id_dieta = ?, nombre = ? WHERE id_ingesta = ?;",
    [ingesta.id_dieta, ingesta.nombre, id_ingesta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado ingesta con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("ingesta actualizado: ", {
        id_ingesta: id_ingesta,
        ...ingesta,
      });
      result(null, { id_ingesta: id_ingesta, ...ingesta });
    }
  );
};

Ingesta.remove = (id_dieta, id_ingesta, result) => {
  conn.query(
    "DELETE FROM ingesta WHERE id_dieta = ? AND id_ingesta = ?",
    [id_dieta, id_ingesta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado ingesta con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Borrado el ingesta con el id: ", id_ingesta);
      result(null, res);
    }
  );
};

Ingesta.removeAll = (id_dieta, result) => {
  conn.query(
    "DELETE FROM ingesta WHERE id_dieta = ?",
    [id_dieta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`Se han borrado ${res.affectedRows} ingestas`);
      result(null, res);
    }
  );
};

module.exports = Ingesta;
