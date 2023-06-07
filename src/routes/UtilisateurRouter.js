import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { ValidateUserInput, ValidateAuthInput } from "../middlewares/UserMiddleware.js";

const UtilisateurRouter = Router();

UtilisateurRouter.get("/users", UserController.getAllUsers);
UtilisateurRouter.get("/users/:id", UserController.getUserById);
UtilisateurRouter.post("/users", ValidateUserInput, UserController.createUser);
UtilisateurRouter.post("/users/authenticate", ValidateAuthInput, UserController.authenticateUser);
UtilisateurRouter.patch("/users/:id", UserController.patchUserById);

export { UtilisateurRouter };
