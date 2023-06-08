import { Router } from "express";
import { DestinationController } from "../controllers/DestinationController.js";

const DestinationRouter = Router();

DestinationRouter.get("/destinations", DestinationController.getAllDestination);
DestinationRouter.get("/destinations/random", DestinationController.getRandomDestination);
DestinationRouter.get("/destinations/:id", DestinationController.getDestinationById);
DestinationRouter.post("/destinations", DestinationController.createDestination);
DestinationRouter.patch("/destinations/:id", DestinationController.patchDestinationById);

export { DestinationRouter };
