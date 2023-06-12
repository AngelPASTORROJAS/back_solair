import { pool } from "../db.js";

const executeQuery = async (query, params) => {
  const connection = await pool.getConnection();
  try {
    return await connection.query(query, params);
  } catch (error) {
    throw new DatabaseError("Erreur lors de l'exécution de la requête");
  } finally {
    connection.release();
  }
};

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}
export { executeQuery };
