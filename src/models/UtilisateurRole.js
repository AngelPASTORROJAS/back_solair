import { Role } from "./Role.js";
import { Utilisateur } from "./Utilisateur.js";

/**
 * UtilisateurRole représente le modèle objet utilisateur_role.
 * @class
 */
class UtilisateurRole {
  /**
   * L'identifiant du UtilisateurRole.
   * @type {Number | undefined}
   */
  id;

  /**
   * Le utilisateur_id du UtilisateurRole.
   * @type {String | undefined}
   */
  utilisateur_id;

  /**
   * La role_id du UtilisateurRole.
   * @type {String | undefined}
   */
  role_id;

  /**
   * Utilisateur du UtilisateurRole.
   * @type {Utilisateur | undefined}
   */
  utilisateur;

  /**
   * Role du UtilisateurRole.
   * @type {Role | undefined}
   */
  role;

  /**
   * @constructor
   * Initialise un nouvel UtilisateurRole avec les options spécifiées.
   * @param {Object} [options={}] - Les options pour initialiser le UtilisateurRole.
   * @param {number} [options.id] - L'identifiant unique du UtilisateurRole.
   * @param {string} [options.utilisateur_id] - Le utilisateur_id du UtilisateurRole.
   * @param {string} [options.role_id] - La role_id du UtilisateurRole.
   * @param {Utilisateur} [options.utilisateur] - Utilisateur du UtilisateurRole.
   * @param {Role} [options.role] - Role du UtilisateurRole.
   */
  constructor({ id, utilisateur_id, role_id, utilisateur, role } = {}) {
    if (id !== undefined) {
      if (typeof id !== "number") {
        throw new TypeError("id must be a number");
      }
      if (id < 1) {
        throw new Error("id must be a positif number");
      }
      this.id = id;
    }

    if (utilisateur_id !== undefined) {
      if (typeof utilisateur_id !== "number") {
        throw new TypeError("utilisateur_id must be a number");
      }
      if (utilisateur_id < 1) {
        throw new Error("utilisateur_id must be a positif number");
      }
      this.utilisateur_id = utilisateur_id;
    }

    if(role_id !== undefined){
      if (typeof role_id !== "number") {
        throw new TypeError("role_id must be a number");
      }
      if (role_id < 1) {
        throw new Error("role_id must be a positif number");
      }
      this.role_id = role_id;
    }

    if (utilisateur !== undefined) {
      if (typeof utilisateur !== typeof new Utilisateur()) {
        throw new TypeError("utilisateur must be a Utilisateur");
      }
      this.utilisateur = utilisateur;
    }
  
    if (role !== undefined) {
      if (typeof role !== typeof new Role()) {
        throw new TypeError("role must be a Role");
      }
      this.role = role;
    }
  }
}
export { UtilisateurRole };
