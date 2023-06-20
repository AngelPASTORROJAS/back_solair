import pkg from "mysql2/promise";
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} from "./config.js";

class Database {
  constructor() {
    /** @type {pkg.PoolOptions} */
    const config = {
      host: DB_HOST || "exempleHost",
      user: DB_USER || "exempleUser",
      password: DB_PASSWORD || "exemplePassword",
      database: DB_DATABASE || "exempleDatabase",
      port: DB_PORT || 3454,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    this.pool = pkg.createPool(config);
    this.utilisateur = "Utilisateur";
    this.destination = "Destination";
  }

  /**
   * Description
   * @author Angel Daniel PASTOR ROJAS
   * @date 2023-06-15
   * @param {String} sql
   * @param {any} params
   * @returns {pkg.RowDataPacket[] | pkg.RowDataPacket[][] | pkg.OkPacket | pkg.OkPacket[] | pkg.ResultSetHeader}
   * @
   */
  query = async (sql, values) => {
    const poolConnection = await this.pool.getConnection();
    try {
      const [rows] = await poolConnection.query(sql, values);
      return rows;
    } catch (error) {
      console.error(error);
      throw new DatabaseError("Erreur lors de l'exécution de la requête");
    } finally {
        poolConnection.release();
    }
  };
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

const db = Object.freeze(new Database())
export { db };
