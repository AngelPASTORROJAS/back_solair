import jwt from "jsonwebtoken";
import { HttpStatus } from "../../http/httpStatus.js";
import { SECRET_KEY, JWT_EXPIRATION } from "../../config/config.js";

const getToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {expiresIn:JWT_EXPIRATION});
};

const checkJwt = (req, res, next) => {
  // Récupérer le token JWT dans l'en-tête Authorization de la requête
  let token = req.headers["authorization"];

  // Vérifier si le token est présent dans l'en-tête
  if (!token) {
    req.decoded = null;
    // Renvoyer une réponse d'erreur d'authentification si le token est manquant
    return res
      .status(HttpStatus.UNAUTHORIZED.code)
      .json({ message: HttpStatus.UNAUTHORIZED.message });
  }

  // Supprimer le préfixe "Bearer " du token JWT
  token = token.replace("Bearer ", "");

  let jwtPayload;
  try {
    // Décoder le token JWT sans vérifier son authenticité
    jwtPayload = jwt.decode(token, { complete: true });
    // Stocker l'en-tête et le payload décodés dans l'objet req.decoded
    req.decoded = jwtPayload;
  } catch (error) {
    // Renvoyer une réponse d'erreur d'authentification si le token est invalide ou expiré
    return res
      .status(HttpStatus.UNAUTHORIZED.code)
      .json({ message: HttpStatus.UNAUTHORIZED.message });
  }
  // Passer au middleware suivant si le token est valide
  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.decoded && req.decoded.roles.includes(role)) {
      next();
    } else {
      res
        .status(HttpStatus.FORBIDDEN.code)
        .json({ message: HttpStatus.FORBIDDEN.message });
    }
  };
};

export { checkJwt, requireRole, getToken };
