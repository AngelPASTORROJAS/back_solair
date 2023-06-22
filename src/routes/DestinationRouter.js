import { Router } from "express";
import { destinationController } from "../controllers/DestinationController.js";
import apicache from "apicache";

const DestinationRouter = Router();

DestinationRouter.get("/destinations", apicache.middleware("5 minutes"), destinationController.getAllDestination);
DestinationRouter.get("/destinations/random", destinationController.getRandomDestination);
DestinationRouter.get("/destinations/:id([0-9]+)", apicache.middleware("5 minutes"), destinationController.getDestinationById);
DestinationRouter.post("/destinations", destinationController.createDestination);
DestinationRouter.patch("/destinations/:id([0-9]+)", destinationController.patchDestinationById);

export { DestinationRouter };
