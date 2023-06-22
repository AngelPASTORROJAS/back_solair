import { db } from "../config/db.js";
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";
import { entitySchema } from "../models/EntitySchema.js";

class UserService {
  #db;
  #userTable;
  #userColumns;
  constructor() {
    this.#db = db;
    this.#userColumns = entitySchema.utilisateur.columns;
    this.#userTable = entitySchema.utilisateur.tableName; 
  }

  getAllUsers = async () => {
    const sql = `SELECT 
        ${this.#userColumns.id}, 
        ${this.#userColumns.pseudo},
        ${this.#userColumns.mail} 
      FROM ${this.#userTable}`;
    return this.#db.query(sql);
  };

  getUserById = async (id) => {
    const sql = `SELECT 
        ${this.#userColumns.id}, 
        ${this.#userColumns.pseudo}, 
        ${this.#userColumns.mail} 
      FROM ${this.#userTable} 
      WHERE ${this.#userColumns.id} = ?`;
    return this.#db.query(sql, [id]);
  };

  createUser = async (pseudo, mail, motdepasse) => {
    const sql = `INSERT INTO ${this.#userTable} 
      (${this.#userColumns.pseudo}, ${this.#userColumns.mail}, ${this.#userColumns.mail}) 
    VALUES 
      (?, ?, ?)`;
    const values = [pseudo, mail, await encryptPassword(motdepasse)];
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };

  authenticateUser = async (mail, motdepasse) => {
    const sql = `SELECT ${this.#userColumns.password} 
      FROM ${this.#userTable}
      WHERE ${this.#userColumns.mail} = ? LIMIT 1`;
    const rows = this.#db.query(sql, [mail]);
    return (
      rows.length > 0 &&
      (await checkPasswordMatch(motdepasse, rows[0].motdepasse))
    );
  };

  patchUserById = async (id, pseudo, mail, motdepasse) => {
    const values = [];
    const clause = [];

    if (pseudo !== undefined) {
      clause.push(`${this.#userColumns.pseudo} = ?`);
      values.push(pseudo);
    }

    if (mail !== undefined) {
      clause.push(`${this.#userColumns.mail} = ?`);
      values.push(mail);
    }

    if (motdepasse !== undefined) {
      clause.push(`${this.#userColumns.password} = ?`);
      values.push(await encryptPassword(motdepasse));
    }
    if (values.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }
    const setClause = clause.join(", ");
    values.push(id);
    const sql = `UPDATE ${this.#userTable} 
      SET ${setClause}
      WHERE ${this.#userColumns.id} = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };
}

const utilisateurService = Object.freeze(new UserService());
export { utilisateurService };
