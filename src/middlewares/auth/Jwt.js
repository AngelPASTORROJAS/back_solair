import jwt from "jsonwebtoken";
import { HttpStatus } from "../../http/httpStatus";
import { SECRET_KEY } from "../../config/config";

const checkJwt = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    req.decoded = null;
    return res.status(HttpStatus.UNAUTHORIZED.code).json({message: HttpStatus.UNAUTHORIZED.message});
  }
  //token = token.replace("Bearer ", "");

  let jwtPayload;
  try {
    jwtPayload = jwt.verify(token, SECRET_KEY);
    res.locals.jwtPayload = jwtPayload;
    req.decoded = jwtPayload;
  } catch (error) {
    return res.status(HttpStatus.NOT_FOUND.code).json({message:HttpStatus.NOT_FOUND.message});
  }
  next();
};

const requireRole=(role)=> {
  return (req, res, next) => {
    if (req.decoded && req.decoded.roles.includes(role)) {
      next();
    } else {
      res.status(HttpStatus.FORBIDDEN.code).json({ message:HttpStatus.FORBIDDEN.message});
    }
  };
};

export {checkJwt, requireRole};
