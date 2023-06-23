import { db } from "../config/db.js";
import { checkPasswordMatch, encryptPassword } from "../utils/password.js";
import { entitySchema } from "../models/EntitySchema.js";

class UserService {
  #db;
  #table;
  #columns;
  #sql;
  constructor() {
    this.#db = db;
    this.#columns = entitySchema.utilisateur.columns;
    this.#table = entitySchema.utilisateur.tableName; 
    this.#sql = {
      SELECT_UTILISATEURS : `SELECT ${this.#columns.id}, ${this.#columns.pseudo} FROM ${this.#table}`,
      SELECT_UTILISATEUR : `SELECT ${this.#columns.id}, ${this.#columns.pseudo}, ${this.#columns.mail} FROM ${this.#table} WHERE ${this.#columns.id} = ?`,
      CREATE_UTILISATEUR: `INSERT INTO ${this.#table} (${this.#columns.pseudo}, ${this.#columns.mail}, ${this.#columns.password}) VALUES (?, ?, ?)`,
      SELECT_UTILISATEUR_PASSWORD: `SELECT ${this.#columns.password} FROM ${this.#table} WHERE ${this.#columns.mail} = ? LIMIT 1`
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
      clause.push(`${this.#columns.pseudo}`);
      values.push(pseudo);
    }
    if (mail) {
      clause.push(`${this.#columns.mail}`);
      values.push(mail);
    }
    if (motdepasse) {
      clause.push(`${this.#columns.password}`);
      values.push(await encryptPassword(motdepasse));
    }
    const setClause = clause.join(" = ?, ");
    values.push(id);
    const sql = `UPDATE ${this.#table} SET ${setClause}  WHERE ${this.#columns.id} = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };
}

const utilisateurService = Object.freeze(new UserService());
export { utilisateurService };
