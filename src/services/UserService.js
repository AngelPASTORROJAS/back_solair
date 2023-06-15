import DataBase from '../config/db.js'
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";

class UserService {
  constructor() {
    this._db = new DataBase();
  }
  getAllUsers = async () => {
    const sql = `SELECT id, pseudo, mail FROM ${this._db.utilisateur}`;
    return this._db.query(sql);
  }

  getUserById = async (id) => {
    const sql = `SELECT id, pseudo, mail FROM ${this._db.utilisateur} WHERE id = ?`;
    return this._db.query(sql, [id]);
  }

  createUser = async (pseudo, mail, motdepasse) => {
    const sql = `INSERT INTO ${this._db.utilisateur} (pseudo, mail, motdepasse) VALUES (?, ?, ?)`;
    const values = [ pseudo,mail, await encryptPassword(motdepasse) ];
    const result = this._db.query(sql, values);
    return result.affectedRows > 0;
  }

  authenticateUser = async (mail, motdepasse) => {
    const sql = `SELECT motdepasse FROM ${this._db.utilisateur} WHERE mail = ? LIMIT 1`;
    const rows = this._db.query(sql, [mail]);
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
    const sql = `UPDATE ${this._db.utilisateur} SET ${setClause} WHERE id = ?`;
    const result = this._db.query(sql, values);
    return result.affectedRows > 0;
  }
}

export default UserService
