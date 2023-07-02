import pkg from "mysql2/promise";
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
} from "./config.js";

/** The `Database` class creates a connection pool to a MySQL database
 * and provides a method to execute SQL queries. */
class Database {
  /** The constructor function creates a connection pool
   * using the provided configuration options. */
  constructor() {
    /** The `const config` object is used to store the configuration options
     * for creating a connection pool to a MySQL database.
     * @type {pkg.PoolOptions} */
    const config = {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    /** Create a connection pool using the `createPool`.
     * @type {pkg.Pool} */
    this.pool = pkg.createPool(config);
  }

  /** The `query` method is an asynchronous function that executes a SQL query using the connection pool.
   * @param {String} sql une requête sql
   * @param {any} params une liste de variables pour éxecuter la requête imbriqué "sql"
   * @returns {pkg.RowDataPacket[] | pkg.RowDataPacket[][] | pkg.OkPacket | pkg.OkPacket[] | pkg.ResultSetHeader} */
  query = async (sql, values) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };
}

/** The class DatabaseError
 * extends the built-in Error class
 * and adds a custom name property. */
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

/** Creates a new instance of the `Database` class
 * and assigns it to the constant variable `db`.
 * The `Object.freeze()` method is used
 * to prevent any modifications to the `db` object, making it read-only. */
const db = Object.freeze(new Database());
export { db };
