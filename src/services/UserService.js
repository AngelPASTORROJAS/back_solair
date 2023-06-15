import db from '../config/db.js'
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";

class UserService {
  static async getAllUsers() {
    const sql = `SELECT id, pseudo, mail FROM ${db.utilisateur}`;
    return db.query(sql);
  }

  static async getUserById(id) {
    const sql = `SELECT id, pseudo, mail FROM ${db.utilisateur} WHERE id = ?`;
    return db.query(sql, [id]);
  }

  static async createUser(pseudo, mail, motdepasse) {
    const sql = `INSERT INTO ${db.utilisateur} (pseudo, mail, motdepasse) VALUES (?, ?, ?)`;
    const values = [ pseudo,mail, await encryptPassword(motdepasse) ];
    const result = db.query(sql, values);
    return result.affectedRows > 0;
  }

  static async authenticateUser(mail, motdepasse) {
    const sql = `SELECT motdepasse FROM ${db.utilisateur} WHERE mail = ? LIMIT 1`;
    const rows = db.query(sql, [mail]);
    return (
      rows.length > 0 &&
      (await checkPasswordMatch(motdepasse, rows[0].motdepasse))
    );
  }

  static async patchUserById(id, pseudo, mail, motdepasse) {
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
    const sql = `UPDATE ${db.utilisateur} SET ${setClause} WHERE id = ?`;
    const result = db.query(sql, values);
    return result.affectedRows > 0;
  }
}

export { UserService };
