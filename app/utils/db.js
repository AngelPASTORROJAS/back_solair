import { pool } from "../config/db.js";

const executeQuery = async (query, params) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(query, params);
    return rows;
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
