const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

// Función de verificación de ID
const isAuthenticated = (req, res, next) => {
  // Obtenemos el token
  const token = req.headers.authorization;
  // Si no hay token devolvemos error 403 (Forbidden)
  if (!token) {
    return res.sendStatus(403);
  }

  // Verificamos el token, necesitamos el secreto con
  // el que lo codificamos
  jwt.verify(token, process.env.JWT_SECRET || "mi-secreto", (err, decoded) => {
    // Buscamos en Usuario el ID decodificado
    Usuario.findById(decoded._id, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (data) {
        // guardamos el ID del usuario en la request
        req.user = data;
        next();
      }
    });
  });
};

module.exports = {
  isAuthenticated,
};
