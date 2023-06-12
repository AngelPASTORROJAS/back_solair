import { executeQuery } from "../utils/database.js";
import { USER_TABLE } from "../config.js";
import { checkPasswordMatch, encryptPassword } from "../utils/PasswordUtils.js";

class UserService {
  static async getAllUsers() {
    const query = `SELECT id, pseudo, mail FROM ${USER_TABLE}`;
    const [rows] = await executeQuery(query);
    return rows;
  }

  static async getUserById(id) {
    const query = `SELECT id, pseudo, mail FROM ${USER_TABLE} WHERE id = ? LIMIT 1`;
    const [row] = await executeQuery(query, [id]);
    return row;
  }

  static async createUser(pseudo, mail, motdepasse) {
    const hashedPassword = await encryptPassword(motdepasse);
    const query = `INSERT INTO ${USER_TABLE} (pseudo, mail, motdepasse) VALUES (?, ?, ?)`;
    const result = await executeQuery(query, [pseudo, mail, hashedPassword]);
    return result.affectedRows > 0;
  }

  static async authenticateUser(mail, motdepasse) {
    const query = `SELECT motdepasse FROM ${USER_TABLE} WHERE mail = ? LIMIT 1`;
    const [rows] = await executeQuery(query, [mail]);
    return rows.length != 0 && (await checkPasswordMatch(motdepasse, rows[0].motdepasse));
  }

  static async patchUserById(id, pseudo, mail, motdepasse) {
    const hashedPassword = motdepasse ? await encryptPassword(motdepasse) : null;
    const params = [];
    const columns = [];
  
    if (pseudo !== undefined) {
      columns.push({ name: "pseudo", value: pseudo });
      params.push(pseudo);
    }
  
    if (mail !== undefined) {
      columns.push({ name: "mail", value: mail });
      params.push(mail);
    }
  
    if (hashedPassword !== null) {
      columns.push({ name: "motdepasse", value: hashedPassword });
      params.push(hashedPassword);
    }
    
    if (columns.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }
    
    const setClause = columns.map(column => `${column.name} = ?`).join(", ");
  
  
    params.push(id);
    const query = `UPDATE ${USER_TABLE} SET ${setClause} WHERE id = ?`;
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;  }
}

export { UserService };
