import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { ValidateUserInput, ValidateAuthInput } from "../middlewares/UserMiddleware.js";
import apicache from "apicache";

class UtilisateurRouter extends Router {
  constructor() {
    const userController = new UserController();
    super();

    this
        .get("/users", userController.getAllUsers)
        .get("/users/:id([0-9]+)", apicache.middleware("5 minutes"), userController.getUserById)
        .post("/users", ValidateUserInput, userController.createUser)
        .post("/users/authenticate", ValidateAuthInput, userController.authenticateUser)
        .patch("/users/:id([0-9]+)", userController.patchUserById);
  }
}


export { UtilisateurRouter };
