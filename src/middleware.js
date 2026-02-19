const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header não fornecido"
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({
      error: "Token mal formatado"
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      error: "Formato do token inválido"
    });
  }

  if (!token) {
    return res.status(401).json({
      error: "Token não fornecido"
    });
  }

  if (!process.env.SECRET) {
    console.error("SECRET não definido no .env");
    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    return next();
  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expirado"
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Token inválido"
      });
    }

    return res.status(401).json({
      error: "Não autorizado"
    });
  }
}

module.exports = authMiddleware;
