import jwt from "jsonwebtoken";
import { HttpStatus } from "../../http/httpStatus.js";
import { SECRET_KEY, JWT_EXPIRATION } from "../../config/config.js";

const getToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {expiresIn:JWT_EXPIRATION});
};

const checkJwt = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    req.decoded = null;
    return res
      .status(HttpStatus.UNAUTHORIZED.code)
      .json({ message: HttpStatus.UNAUTHORIZED.message });
  }
  //token = token.replace("Bearer ", "");

  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, SECRET_KEY);
    res.locals.jwtPayload = jwtPayload;
    req.decoded = jwtPayload;
  } catch (error) {
    return res
      .status(HttpStatus.NOT_FOUND.code)
      .json({ message: HttpStatus.NOT_FOUND.message });
  }
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
