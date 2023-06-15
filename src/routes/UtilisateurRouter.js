import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { ValidateUserInput, ValidateAuthInput } from "../middlewares/UserMiddleware.js";
import apicache from "apicache";

class UtilisateurRouter extends Router {
  constructor() {
    super();

    this
        .get("/users", apicache.middleware("5 minutes"), UserController.getAllUsers)
        .get("/users/:id([0-9]+)", apicache.middleware("5 minutes"), UserController.getUserById)
        .post("/users", ValidateUserInput, UserController.createUser)
        .post("/users/authenticate", ValidateAuthInput, UserController.authenticateUser)
        .patch("/users/:id([0-9]+)", UserController.patchUserById);
  }
}


export { UtilisateurRouter };
