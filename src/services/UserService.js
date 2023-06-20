import { db } from '../config/db.js'
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";

class UserService {
  #db;
  constructor() {
    this.#db = db;
  }
  getAllUsers = async () => {
    const sql = `SELECT id, pseudo, mail FROM ${this.#db.utilisateur}`;
    return this.#db.query(sql);
  }

  getUserById = async (id) => {
    const sql = `SELECT id, pseudo, mail FROM ${this.#db.utilisateur} WHERE id = ?`;
    return this.#db.query(sql, [id]);
  }

  createUser = async (pseudo, mail, motdepasse) => {
    const sql = `INSERT INTO ${this.#db.utilisateur} (pseudo, mail, motdepasse) VALUES (?, ?, ?)`;
    const values = [ pseudo,mail, await encryptPassword(motdepasse) ];
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  }

  authenticateUser = async (mail, motdepasse) => {
    const sql = `SELECT motdepasse FROM ${this.#db.utilisateur} WHERE mail = ? LIMIT 1`;
    const rows = this.#db.query(sql, [mail]);
    return (
      rows.length > 0 &&
      (await checkPasswordMatch(motdepasse, rows[0].motdepasse))
    );
  }

  patchUserById = async (id, pseudo, mail, motdepasse) => {
    const values = [];
    const clause = [];

    if (pseudo !== undefined) {
      clause.push("pseudo = ?");
      values.push(pseudo);
    }

    if (mail !== undefined) {
      clause.push("mail = ?");
      values.push(mail);
    }

    if (motdepasse !== undefined) {
      clause.push("motdepasse = ?");
      values.push(await encryptPassword(motdepasse));
    }
    if (values.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }
    const setClause = clause.join(", ");
    values.push(id);
    const sql = `UPDATE ${this.#db.utilisateur} SET ${setClause} WHERE id = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  }
}

const utilisateurService = Object.freeze(new UserService());
export { utilisateurService }