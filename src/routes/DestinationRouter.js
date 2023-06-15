import { Router } from "express";
import { DestinationController } from "../controllers/DestinationController.js";
import apicache from "apicache";

const DestinationRouter = Router();

DestinationRouter.get("/destinations", apicache.middleware("5 minutes"), DestinationController.getAllDestination);
DestinationRouter.get("/destinations/random", DestinationController.getRandomDestination);
DestinationRouter.get("/destinations/:id([0-9]+)", apicache.middleware("5 minutes"), DestinationController.getDestinationById);
DestinationRouter.post("/destinations", DestinationController.createDestination);
DestinationRouter.patch("/destinations/:id([0-9]+)", DestinationController.patchDestinationById);

export { DestinationRouter };
