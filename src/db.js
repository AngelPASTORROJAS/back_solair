import { createConnection } from "mysql2/promise";
import { DB_URL } from "./config.js";

const connection = await createConnection(DB_URL);

try {
  await connection.connect();
  console.log("Connecté à la base de données MySQL");
} catch (error) {
  console.error("Erreur de connexion :", error);
}

export { connection };