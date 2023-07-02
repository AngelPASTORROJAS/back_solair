import express from "express";
import cors from "cors";
import helmet from "helmet";
import { UtilisateurRouter } from "./routes/UtilisateurRouter.js";
import { HttpStatus } from "./http/httpStatus.js";
import { DestinationRouter } from "./routes/DestinationRouter.js";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// Route de base
app.get("/", (_req, res) => {
  res.status(HttpStatus.OK.code).json({ message: HttpStatus.OK.message });
});

// Routes pour la gestion des controllers
app.use("/api/users", UtilisateurRouter);
app.use("/api/destinations",DestinationRouter);

// Gestion des erreurs
app.use((res, _req, next, err) => {
  console.error(err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({ message: HttpStatus.INTERNAL_SERVER_ERROR.message });
});

app.use((_req, res) => {
  res.status(HttpStatus.NOT_FOUND.code).json({ message: HttpStatus.NOT_FOUND.message });
});

export default app;