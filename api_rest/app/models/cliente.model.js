const conn = require("./db.js");

// constructor
const Cliente = function (cliente) {
  this.id_cliente = cliente.id_cliente;
  this.id_user = cliente.id_user;
  this.nombre = cliente.nombre;
  this.apellidos = cliente.apellidos;
  this.imagen = cliente.imagen;
};

Cliente.create = (nuevoCliente, result) => {
  conn.query("INSERT INTO cliente SET ?", nuevoCliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("cliente creado: ", { id: res.insertId, ...nuevoCliente });
    result(null, { id: res.insertId, ...nuevoCliente });
  });
};

Cliente.findById = (id_user, id_cliente, result) => {
  conn.query(
    `SELECT * FROM cliente WHERE id_user = ? and id_cliente = ?`,
    [id_user, id_cliente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("cliente encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // cliente no encontrado por ID
      result({ kind: "not_found" }, null);
    }
  );
};

Cliente.getAll = (id_user, result) => {
  let query = "SELECT * FROM cliente WHERE id_user = ?";

  conn.query(query, [id_user], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clientes: ", res);
    result(null, res);
  });
};

Cliente.updateById = (id_cliente, cliente, result) => {
  conn.query(
    "UPDATE cliente SET id_user = ?, nombre = ?, apellidos = ?, imagen = ? WHERE id_cliente = ?;",
    [
      cliente.id_user,
      cliente.nombre,
      cliente.apellidos,
      cliente.imagen,
      id_cliente,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado cliente con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("cliente actualizado: ", {
        id_cliente: id_cliente,
        ...cliente,
      });
      result(null, { id_cliente: id_cliente, ...cliente });
    }
  );
};

Cliente.remove = (id_user,id_cliente, result) => {
  conn.query(
    "DELETE FROM cliente WHERE id_user = ? AND id_cliente = ?",
    [id_user,id_cliente],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no se ha encontrado cliente con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Borrado el cliente con el id: ", id_cliente);
      result(null, res);
    }
  );
};

Cliente.removeAll = (id_user, result) => {
  conn.query("DELETE FROM cliente WHERE id_user = ?", [id_user], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Se han borrado ${res.affectedRows} clientes`);
    result(null, res);
  });
};

module.exports = Cliente;
