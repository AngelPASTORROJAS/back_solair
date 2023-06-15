import db from '../config/db.js'
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";

class UserService {
  static async getAllUsers() {
    const query = `SELECT id, pseudo, mail FROM ${db.utilisateur}`;
    return db.query(query);
  }

  static async getUserById(id) {
    const query = `SELECT id, pseudo, mail FROM ${db.utilisateur} WHERE id = ?`;
    return db.query(query, [id]);
  }

  static async createUser(pseudo, mail, motdepasse) {
    const query = `INSERT INTO ${db.utilisateur} (pseudo, mail, motdepasse) VALUES (?, ?, ?)`;
    const result = db.query(query, [
      pseudo,
      mail,
      await encryptPassword(motdepasse),
    ]);
    return result.affectedRows > 0;
  }

  static async authenticateUser(mail, motdepasse) {
    const query = `SELECT motdepasse FROM ${db.utilisateur} WHERE mail = ? LIMIT 1`;
    const rows = db.query(query, [mail]);
    return (
      rows.length > 0 &&
      (await checkPasswordMatch(motdepasse, rows[0].motdepasse))
    );
  }

  static async patchUserById(id, pseudo, mail, motdepasse) {
    const params = [];
    const clause = [];

    if (pseudo !== undefined) {
      clause.push("pseudo = ?");
      params.push(pseudo);
    }

    if (mail !== undefined) {
      clause.push("mail = ?");
      params.push(mail);
    }

    if (motdepasse !== undefined) {
      clause.push("motdepasse = ?");
      params.push(await encryptPassword(motdepasse));
    }
    if (params.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }
    const setClause = clause.join(", ");
    params.push(id);
    const query = `UPDATE ${db.utilisateur} SET ${setClause} WHERE id = ?`;
    const result = db.query(query, params);
    return result.affectedRows > 0;
  }
}

export { UserService };
