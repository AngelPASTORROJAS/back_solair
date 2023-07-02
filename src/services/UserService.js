import { db } from "../config/db.js";
import { encryptPassword,checkPasswordMatch } from "../utils/password.js";

class UserService {
  #db;
  #sql;
  constructor() {
    this.#db = db;
    this.#sql = {
      SELECT_UTILISATEURS : "SELECT id, login FROM utilisateur",
      SELECT_UTILISATEUR : "SELECT id, login, email FROM utilisateur WHERE id = ?",
      CREATE_UTILISATEUR: "INSERT INTO utilisateur (login, email, mot_de_passe) VALUES (?, ?, ?)",
      UPDATE_UTILISATEUR: "UPDATE utilisateur SET first_name = ?, last_name = ?, email = ?, address = ?, diagnos",
      SELECT_UTILISATEUR_PASSWORD: "SELECT mot_de_passe FROM utilisateur WHERE email = ? LIMIT 1"
    };
  }

  getAllUsers = async () => {
    return this.#db.query(this.#sql.SELECT_UTILISATEURS);
  };

  getUserById = async (id) => {
    return this.#db.query(this.#sql.SELECT_UTILISATEUR, [id]);
  };

  createUser = async (pseudo, mail, motdepasse) => {
    const values = [pseudo, mail, await encryptPassword(motdepasse)];
    const result = this.#db.query(this.#sql.CREATE_UTILISATEUR, values);
    return result.affectedRows > 0;
  };

  authenticateUser = async (mail, motdepasse) => {
    const rows = this.#db.query(this.#sql.SELECT_UTILISATEUR_PASSWORD, [mail]);
    return (
      rows.length > 0 &&
      (await checkPasswordMatch(motdepasse, rows[0].motdepasse))
    );
  };

  patchUserById = async (id, pseudo, mail, motdepasse) => {
    const values = [];
    const clause = [];
    if(!pseudo || !mail || !motdepasse ){
      return true;
    }
    if (pseudo) {
      clause.push("login");
      values.push(pseudo);
    }
    if (mail) {
      clause.push("email");
      values.push(mail);
    }
    if (motdepasse) {
      clause.push("mot_de_passe");
      values.push(await encryptPassword(motdepasse));
    }
    const setClause = clause.join(" = ?, ");
    values.push(id);
    const sql = `UPDATE utilisateur SET ${setClause}  WHERE id = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };
}

const utilisateurService = Object.freeze(new UserService());
export { utilisateurService };
