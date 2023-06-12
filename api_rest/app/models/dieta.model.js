const conn = require("./db.js");

// constructor
const Dieta = function (dieta) {
  this.id_dieta = dieta.id_dieta;
  this.id_cliente = dieta.id_cliente;
  this.fecha_dieta = dieta.fecha_dieta;
  this.objetivo = dieta.objetivo;
};

Dieta.create = (nuevaDieta, result) => {
  conn.query("INSERT INTO dieta SET ?", nuevaDieta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("dieta creado: ", { id: res.insertId, ...nuevaDieta });
    result(null, { id: res.insertId, ...nuevaDieta });
  });
};

Dieta.findById = (id_cliente, id_dieta, result) => {
  conn.query(
    // `SELECT * FROM dieta WHERE id_cliente = ? and id_dieta = ?`,
    "SELECT d.id_dieta, d.id_cliente, d.fecha_dieta, d.objetivo, " +
      "COALESCE(sum(m.energia*ii.cantidad/100),0) as energiaTotal, " +
      "COALESCE(sum(m.proteinas*ii.cantidad/100),0) as proteinasTotal, " +
      "COALESCE(sum(m.hdc*ii.cantidad/100),0) as hdcTotal, " +
      "COALESCE(sum(m.fibra*ii.cantidad/100),0) as fibraTotal, " +
      "COALESCE(sum(m.lipidos*ii.cantidad/100),0) as lipidosTotal " +
      "FROM dieta d " +
      "left join ingesta i on d.id_dieta=i.id_dieta " +
      "left join ingesta_ingrediente ii on i.id_ingesta=ii.id_ingesta " +
      "left join macronutrientes m on ii.id_ingrediente = m.id_ingrediente " +
      "where d.id_cliente = ? and d.id_dieta = ? " +
      "group by d.id_dieta;",
    [id_cliente, id_dieta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("dieta encontrada: ", res[0]);
        result(null, res[0]);
        return;
      }

      // dieta no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Dieta.getAll = (id_cliente, result) => {
  //// REVISAR ESTO!!!! De momento solo devolvemos los totales en la individual, aqui no porque no
  // veo que haga falta
  let query =
    // "SELECT * FROM dieta WHERE id_cliente = ? ORDER BY fecha_dieta DESC";
    "SELECT d.id_dieta, d.id_cliente, d.fecha_dieta, d.objetivo, " +
    "COALESCE(sum(m.energia*ii.cantidad/100),0) as energiaTotal, " +
    "COALESCE(sum(m.proteinas*ii.cantidad/100),0) as proteinasTotal, " +
    "COALESCE(sum(m.hdc*ii.cantidad/100),0) as hdcTotal, " +
    "COALESCE(sum(m.fibra*ii.cantidad/100),0) as fibraTotal, " +
    "COALESCE(sum(m.lipidos*ii.cantidad/100),0) as lipidosTotal " +
    "FROM dieta d " +
    "left join ingesta i on d.id_dieta=i.id_dieta " +
    "left join ingesta_ingrediente ii on i.id_ingesta=ii.id_ingesta " +
    "left join macronutrientes m on ii.id_ingrediente = m.id_ingrediente " +
    "where d.id_cliente = ? " +
    "group by d.id_dieta " +
    "ORDER BY d.fecha_dieta DESC;";

  conn.query(query, [id_cliente], (err, res) => {
    console.log(query);
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dietas: ", res);
    result(null, res);
  });
};

Dieta.updateById = (id_dieta, dieta, result) => {
  conn.query(
    "UPDATE dieta SET id_cliente = ?, fecha_dieta = ?, objetivo = ? WHERE id_dieta = ?;",
    [dieta.id_cliente, dieta.fecha_dieta, dieta.objetivo, id_dieta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado dieta con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("dieta actualizada: ", {
        id_dieta: id_dieta,
        ...dieta,
      });
      result(null, { id_dieta: id_dieta, ...dieta });
    }
  );
};

Dieta.remove = (id_cliente, id_dieta, result) => {
  conn.query(
    "DELETE FROM dieta WHERE id_cliente = ? AND id_dieta = ?",
    [id_cliente, id_dieta],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado dieta con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Borrado la dieta con el id: ", id_dieta);
      result(null, res);
    }
  );
};

Dieta.removeAll = (id_cliente, result) => {
  conn.query(
    "DELETE FROM dieta WHERE id_cliente = ?",
    [id_cliente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`Se han borrado ${res.affectedRows} dietas`);
      result(null, res);
    }
  );
};

module.exports = Dieta;
