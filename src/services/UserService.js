import { db } from "../config/db.js";
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";
import { entitySchema } from "../models/EntitySchema.js";

class UserService {
  #db;
  #utilisateurSchema;
  constructor() {
    this.#db = db;
    this.#utilisateurSchema = entitySchema.utilisateur;
  }
  getAllUsers = async () => {
    const sql = `SELECT 
        ${this.#utilisateurSchema.columns.id}, 
        ${this.#utilisateurSchema.columns.pseudo},
        ${this.#utilisateurSchema.columns.mail} 
      FROM ${this.#utilisateurSchema.tableName}`;
    return this.#db.query(sql);
  };

  getUserById = async (id) => {
    const sql = `SELECT 
        ${this.#utilisateurSchema.columns.id}, 
        ${this.#utilisateurSchema.columns.pseudo}, 
        ${this.#utilisateurSchema.columns.mail} 
      FROM ${this.#utilisateurSchema.tableName} 
      WHERE ${this.#utilisateurSchema.columns.id} = ?`;
    return this.#db.query(sql, [id]);
  };

  createUser = async (pseudo, mail, motdepasse) => {
    const sql = `INSERT INTO ${this.#utilisateurSchema.tableName} 
      (${this.#utilisateurSchema.columns.pseudo}, ${this.#utilisateurSchema.columns.mail}, ${this.#utilisateurSchema.columns.mail}) 
    VALUES 
      (?, ?, ?)`;
    const values = [pseudo, mail, await encryptPassword(motdepasse)];
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };

  authenticateUser = async (mail, motdepasse) => {
    const sql = `SELECT ${this.#utilisateurSchema.columns.password} 
      FROM ${this.#utilisateurSchema.tableName}
      WHERE ${this.#utilisateurSchema.columns.mail} = ? LIMIT 1`;
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
      clause.push(`${this.#utilisateurSchema.columns.pseudo} = ?`);
      values.push(pseudo);
    }

    if (mail !== undefined) {
      clause.push(`${this.#utilisateurSchema.columns.mail} = ?`);
      values.push(mail);
    }

    if (motdepasse !== undefined) {
      clause.push(`${this.#utilisateurSchema.columns.password} = ?`);
      values.push(await encryptPassword(motdepasse));
    }
    if (values.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }
    const setClause = clause.join(", ");
    values.push(id);
    const sql = `UPDATE ${this.#utilisateurSchema.tableName} 
      SET ${setClause}
      WHERE ${this.#utilisateurSchema.columns.id} = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };
}

const utilisateurService = Object.freeze(new UserService());
export { utilisateurService };
