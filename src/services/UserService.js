import { db } from "../config/db.js";
import { encryptPassword,checkPasswordMatch } from "../utils/password.js";
import {Utilisateur} from "../models/Utilisateur.js";

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
      SELECT_UTILISATEUR_PASSWORD: "SELECT mot_de_passe FROM utilisateur WHERE login = ?"
    };
  }

  /**
   * The `getAllUsers` function is an asynchronous arrow function that is a method of the `UserService` class. 
   * It is used to retrieve all users from the database.
   * @author Angel Daniel PASTOR ROJAS
   * @date 2023-07-03
   * @returns {Utilisateur[]}
   */
  getAllUsers = async () => {
    return await this.#db.query(this.#sql.SELECT_UTILISATEURS);
  };

  /**
   * The `getUserById` function is an asynchronous arrow function that is a method of the `UserService` class. 
   * It is used to retrieve a user from the database based on their `id`. 
   * @author Angel Daniel PASTOR ROJAS
   * @date 2023-07-03
   * @param {number} id
   * @returns {Utilisateur}
   */
  getUserById = async (id) => {
    return await this.#db.query(this.#sql.SELECT_UTILISATEUR, [id]);
  };

  
  /**
   * The `createUser` function is a method of the `UserService` class.
   * It is used to create a new user in the database.
   * @author Angel Daniel PASTOR ROJAS
   * @date 2023-07-03
   * @param {Utilisateur} utilisateur
   * @returns {boolean} Return true if utilisateur are created otherwise false
   */
  createUser = async (utilisateur) => {
    if(typeof utilisateur !== typeof new Utilisateur()){
      throw new TypeError("Invalid type to createUser");
    }
    if(!utilisateur.email || !utilisateur.login || !utilisateur.mot_de_passe){
      throw new Error("Invalid proprieties to createUser");
    }
    const values = [utilisateur.login, utilisateur.email, await encryptPassword(utilisateur.mot_de_passe)];
    const result = await this.#db.query(this.#sql.CREATE_UTILISATEUR, values);
    return result !== undefined;
  };

  /**
   * Description
   * @author Angel Daniel PASTOR ROJAS
   * @date 2023-07-03
   * @param {Utilisateur} utilisateur
   * @returns {Promise<boolean>}
   */
  authenticateUser = async (utilisateur) => {
    if(typeof utilisateur !== typeof new Utilisateur()){
      throw new TypeError("Invalid type to authenticateUser");
    }
    if(!utilisateur.login || !utilisateur.mot_de_passe){
      throw new Error("Invalid proprieties to authenticateUser");
    }
    const rows = await this.#db.query(this.#sql.SELECT_UTILISATEUR_PASSWORD, [utilisateur.login]);
    if(rows !== undefined){
      return await checkPasswordMatch(utilisateur.mot_de_passe, rows[0].mot_de_passe);
    } else{
      return false;
    }
  };

  /*
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
  };*/
}

const utilisateurService = Object.freeze(new UserService());
export { utilisateurService };
