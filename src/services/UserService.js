import { db } from "../config/db.js";
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";
import { entitySchema } from "../models/EntitySchema.js";

class UserService {
  #db;
  #table;
  #columns;
  constructor() {
    this.#db = db;
    this.#columns = entitySchema.utilisateur.columns;
    this.#table = entitySchema.utilisateur.tableName; 
  }

  getAllUsers = async () => {
    const sql = `SELECT ${this.#columns.id}, 
        ${this.#columns.pseudo},
        ${this.#columns.mail} 
      FROM ${this.#table}`;
    return this.#db.query(sql);
  };

  getUserById = async (id) => {
    const sql = `SELECT ${this.#columns.id}, 
        ${this.#columns.pseudo}, 
        ${this.#columns.mail} 
      FROM ${this.#table} 
      WHERE ${this.#columns.id} = ?`;
    return this.#db.query(sql, [id]);
  };

  createUser = async (pseudo, mail, motdepasse) => {
    const sql = `INSERT INTO ${this.#table} 
      (${this.#columns.pseudo}, ${this.#columns.mail}, ${this.#columns.mail}) 
    VALUES 
      (?, ?, ?)`;
    const values = [pseudo, mail, await encryptPassword(motdepasse)];
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };

  authenticateUser = async (mail, motdepasse) => {
    const sql = `SELECT ${this.#columns.password} 
      FROM ${this.#table}
      WHERE ${this.#columns.mail} = ? LIMIT 1`;
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
      clause.push(`${this.#columns.pseudo} = ?`);
      values.push(pseudo);
    }

    if (mail !== undefined) {
      clause.push(`${this.#columns.mail} = ?`);
      values.push(mail);
    }

    if (motdepasse !== undefined) {
      clause.push(`${this.#columns.password} = ?`);
      values.push(await encryptPassword(motdepasse));
    }
    if (values.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }
    const setClause = clause.join(", ");
    values.push(id);
    const sql = `UPDATE ${this.#table} 
      SET ${setClause}
      WHERE ${this.#columns.id} = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };
}

const utilisateurService = Object.freeze(new UserService());
export { utilisateurService };
