import { executeQuery } from "../utils/db.js";
import { DATABASE } from "../config/config.js";
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";

class UserService {
  static async getAllUsers() {
    const query = `SELECT id, pseudo, mail FROM ${DATABASE.user}`;
    return await executeQuery(query);
  }

  static async getUserById(id) {
    const query = `SELECT id, pseudo, mail FROM ${DATABASE.user} WHERE id = ?`;
    return await executeQuery(query, [id]);
  }

  static async createUser(pseudo, mail, motdepasse) {
    const query = `INSERT INTO ${DATABASE.user} (pseudo, mail, motdepasse) VALUES (?, ?, ?)`;
    const result = await executeQuery(query, [
      pseudo,
      mail,
      await encryptPassword(motdepasse),
    ]);
    return result.affectedRows > 0;
  }

  static async authenticateUser(mail, motdepasse) {
    const query = `SELECT motdepasse FROM ${DATABASE.user} WHERE mail = ? LIMIT 1`;
    const rows = await executeQuery(query, [mail]);
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
    const query = `UPDATE ${DATABASE.user} SET ${setClause} WHERE id = ?`;
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  }
}

export { UserService };
