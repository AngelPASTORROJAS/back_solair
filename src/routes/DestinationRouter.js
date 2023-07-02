import { Router } from "express";
import { destinationController } from "../controllers/DestinationController.js";
import apicache from "apicache";

const DestinationRouter = Router();

DestinationRouter
  .get("", apicache.middleware("5 minutes"), destinationController.getAllDestination)
  .get("/random", destinationController.getRandomDestination)
  .get("/:id([0-9]+)", apicache.middleware("5 minutes"), destinationController.getDestinationById)
  .post("", destinationController.createDestination)
  .patch("/:id([0-9]+)", destinationController.patchDestinationById);

export { DestinationRouter };
