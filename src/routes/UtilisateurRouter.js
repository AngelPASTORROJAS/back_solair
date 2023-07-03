import { Router } from "express";
import { utilisateurController } from "../controllers/UserController.js";
import { ValidateUserInput, ValidateAuthInput } from "../middlewares/UserMiddleware.js";
import apicache from "apicache";
import { checkJwt } from "../middlewares/auth/Jwt.js";

const UtilisateurRouter = Router();

UtilisateurRouter
  .get("", checkJwt, apicache.middleware("5 minutes"), utilisateurController.getAllUsers)
  .get("/:id([0-9]+)", checkJwt,apicache.middleware("5 minutes"), utilisateurController.getUserById)
  .post("", ValidateUserInput, utilisateurController.createUser)
  .post("/authenticate", ValidateAuthInput, utilisateurController.authenticateUser)
  //.patch("/:id([0-9]+)", checkJwt, utilisateurController.patchUserById)
;

export { UtilisateurRouter };
