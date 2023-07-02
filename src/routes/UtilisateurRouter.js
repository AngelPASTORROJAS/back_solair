import { Router } from "express";
import { utilisateurController } from "../controllers/UserController.js";
import { ValidateUserInput, ValidateAuthInput } from "../middlewares/UserMiddleware.js";
import apicache from "apicache";

const UtilisateurRouter = Router();

UtilisateurRouter
  .get("", utilisateurController.getAllUsers)
  .get("/:id([0-9]+)", apicache.middleware("5 minutes"), utilisateurController.getUserById)
  .post("", ValidateUserInput, utilisateurController.createUser)
  .post("/authenticate", ValidateAuthInput, utilisateurController.authenticateUser)
  .patch("/:id([0-9]+)", utilisateurController.patchUserById);

export { UtilisateurRouter };
