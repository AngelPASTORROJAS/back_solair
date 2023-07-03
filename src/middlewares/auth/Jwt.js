import jwt from "jsonwebtoken";
import { HttpStatus } from "../../http/httpStatus.js";
import { SECRET_KEY, JWT_EXPIRATION } from "../../config/config.js";
// eslint-disable-next-line no-unused-vars
import { Role } from "../../models/Role.js";


const getToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {expiresIn:JWT_EXPIRATION});
};

const checkJwt = (req, res, next) => {
  // Vérifier si req.headers.authorization est existe
  if (!req.headers.authorization) {
    return res
      .status(HttpStatus.UNAUTHORIZED.code)
      .json({ message: HttpStatus.UNAUTHORIZED.message });
  }
  // Récupérer le token JWT dans l'en-tête Authorization de la requête
  const token = req.headers.authorization.split(" ")[1];

  // Vérifie si le jeton d'authentification est manquant.
  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED.code)
      .json({ message: HttpStatus.UNAUTHORIZED.message });
  }

  let jwtPayload;
  try {
    // Décoder le token JWT sans vérifier son authenticité 
    jwtPayload = jwt.decode(token, { complete: true });
    // Stocker l'en-tête et le payload décodés dans l'objet req.decoded
    req.decoded = jwtPayload;
  } catch (error) {
    // Le jeton d'authentification est invalide ou expiré
    return res
      .status(HttpStatus.UNAUTHORIZED.code)
      .json({ message: HttpStatus.UNAUTHORIZED.message });
  }
  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    // Vérifier si req.decoded est défini
    if (typeof req.decoded === "undefined") {
      return res
        .status(HttpStatus.FORBIDDEN.code)
        .json({ message: HttpStatus.FORBIDDEN.message});
    }

    // Vérifier si req.decoded.roles est défini
    if (typeof req.decoded.roles === "undefined") {
      return res
        .status(HttpStatus.FORBIDDEN.code)
        .json({ message: HttpStatus.FORBIDDEN.message });
    }

    /**@type {Role[]} */
    const roles =  req.decoded.roles;

    // Vérifier si l'utilisateur a le rôle requis
    const hasRole = roles.some((r) => r.nom === role);

    if (hasRole) {
      // continuer l'exécution de la requête
      next();
    } else {
      return res
        .status(HttpStatus.FORBIDDEN.code)
        .json({ message: HttpStatus.FORBIDDEN.message });
    }
  };
};

export { checkJwt, requireRole, getToken };
