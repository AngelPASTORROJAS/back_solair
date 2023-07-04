import { Router } from "express";
import { destinationController } from "../controllers/DestinationController.js";
import apicache from "apicache";
import { checkJwt } from "../middlewares/auth/Jwt.js";

const DestinationRouter = Router();

DestinationRouter
  .get("", checkJwt, apicache.middleware("5 minutes"), destinationController.getAllDestination)
  .get("/random", checkJwt, destinationController.getRandomDestination)
  .get("/:id([0-9]+)", checkJwt, apicache.middleware("5 minutes"), destinationController.getDestinationById)
  .post("",  checkJwt, destinationController.createDestination)
  .patch("/:id([0-9]+)",  checkJwt, destinationController.patchDestinationById);

export { DestinationRouter };
