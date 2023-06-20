import { Router } from "express";
import { utilisateurController } from "../controllers/UserController.js";
import { ValidateUserInput, ValidateAuthInput } from "../middlewares/UserMiddleware.js";
import apicache from "apicache";

const UtilisateurRouter = Router();

UtilisateurRouter
        .get("/users", utilisateurController.getAllUsers)
        .get("/users/:id([0-9]+)", apicache.middleware("5 minutes"), utilisateurController.getUserById)
        .post("/users", ValidateUserInput, utilisateurController.createUser)
        .post("/users/authenticate", ValidateAuthInput, utilisateurController.authenticateUser)
        .patch("/users/:id([0-9]+)", utilisateurController.patchUserById);

export { UtilisateurRouter };
