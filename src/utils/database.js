import { connection } from "../db.js";

const executeQuery = async (query, params) => {
  try {
    return await connection.query(query, params);
  } catch (error) {
    throw new DatabaseError("Erreur lors de l'exécution de la requête");
  }
};

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}
export { executeQuery };
