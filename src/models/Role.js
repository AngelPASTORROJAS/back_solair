import { UtilisateurRole } from "./UtilisateurRole.js";

/**
 * Role représente le modèle objet role.
 * @class
 */
class Role {
  /**
   * L'identifiant du Role.
   * @type {Number | undefined}
   */
  id;

  /**
   * Le nom du Role.
   * @type {String | undefined}
   */
  nom;

  /**
   * La description du Role.
   * @type {String | undefined}
   */
  description;

  /**
   * UtilisateurRole du Role.
   * @type {UtilisateurRole | undefined}
   */
  utilisateur_role;

  /**
   * @constructor
   * Initialise un nouvel rôle avec les options spécifiées.
   * @param {Object} [options={}] - Les options pour initialiser Role.
   * @param {number} [options.id] - L'identifiant unique du Role.
   * @param {string} [options.nom] - Le nom du Role.
   * @param {string} [options.description] - La description du Role.
   * @param {UtilisateurRole} [options.utilisateur_role] - UtilisateurRole du Role.
   */
  constructor({ id, nom, description, utilisateur_role } = {}) {
    const max_length_nom = 50;
    const max_length_description = 125;

    if (id !== undefined) {
      if (typeof id !== "number") {
        throw new TypeError("id must be a number");
      }
      if (id < 1) {
        throw new Error("id must be a positif number");
      }
      this.id = id;
    }

    if (nom !== undefined) {
      if (typeof nom !== "string") {
        throw new TypeError("nom must be a string");
      }
      if (max_length_nom < nom.length) {
        throw Error(
          `nom must must not exceed a maximum length ${max_length_nom}`
        );
      }
      this.nom = nom;
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        throw new TypeError("description must be a string");
      }
      if (max_length_description < description.length) {
        throw Error(
          `description must not exceed a maximum length ${max_length_description}`
        );
      }
      this.description = description;
    }

    if (utilisateur_role !== undefined) {
      if (typeof utilisateur_role !== typeof new UtilisateurRole()) {
        throw new TypeError("utilisateur_role must be a UtilisateurRole");
      }
      this.utilisateur_role = utilisateur_role;
    }
  }
}
export { Role };
