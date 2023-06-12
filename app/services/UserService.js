import { executeQuery } from "../utils/database.js";
import { USER_TABLE } from "../config.js";
import { checkPasswordMatch, encryptPassword } from "../utils/PasswordUtils.js";

class UserService {
  static async getAllUsers() {
    const query = `SELECT id, pseudo, mail FROM ${USER_TABLE}`;
    return await executeQuery(query);
  }

  static async getUserById(id) {
    const query = `SELECT id, pseudo, mail FROM ${USER_TABLE} WHERE id = ?`;
    return await executeQuery(query, [id]);
  }

  static async createUser(pseudo, mail, motdepasse) {
    const query = `INSERT INTO ${USER_TABLE} (pseudo, mail, motdepasse) VALUES (?, ?, ?)`;
    const result = await executeQuery(query, [
      pseudo,
      mail,
      await encryptPassword(motdepasse),
    ]);
    return result.affectedRows > 0;
  }

  static async authenticateUser(mail, motdepasse) {
    const query = `SELECT motdepasse FROM ${USER_TABLE} WHERE mail = ? LIMIT 1`;
    const rows = await executeQuery(query, [mail]);
    return (
      rows.length < 1 &&
      (await checkPasswordMatch(motdepasse, rows[0].motdepasse))
    );
  }

  static async patchUserById(id, pseudo, mail, motdepasse) {
    const params = [];
    const columns = [];

    if (pseudo !== undefined) {
      columns.push({ name: "pseudo" });
      params.push(pseudo);
    }

    if (mail !== undefined) {
      columns.push({ name: "mail" });
      params.push(mail);
    }

    if (motdepasse !== undefined) {
      columns.push({ name: "motdepasse" });
      params.push(await encryptPassword(motdepasse));
    }

    if (columns.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }

    const setClause = columns.map((column) => `${column.name} = ?`).join(", ");

    params.push(id);
    const query = `UPDATE ${USER_TABLE} SET ${setClause} WHERE id = ?`;
    const result = await executeQuery(query, params);
    return result.changedRows > 0;
  }
}

export { UserService };
