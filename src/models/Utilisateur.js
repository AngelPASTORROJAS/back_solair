import { UtilisateurRole } from "./UtilisateurRole.js";
import { UtilisateurDestination } from "./UtilisateurDestination.js";

/**
 * Utilisateur représente le modèle objet utilisateur.
 * @class
 */
class Utilisateur {
  /**
   * L'identifiant Utilisateur.
   * @type {Number | undefined}
   */
  id;

  /**
   * Le login Utilisateur.
   * @type {String | undefined}
   */
  login;

  /**
   * Le mot de passe Utilisateur.
   * @type {String | undefined}
   */
  mot_de_passe;

  /**
   * L'adresse mail Utilisateur.
   * @type {String | undefined}
   */
  mail;

  /**
   * utilisateur_role Utilisateur.
   * @type {UtilisateurRole | undefined}
   */
  utilisateur_role;

  /**
   * utilisateur_destination Utilisateur.
   * @type {UtilisateurDestination | undefined}
   */
  utilisateur_destination;

  /**
   * @constructor
   * Initialise un nouvel utilisateur avec les options spécifiées.
   * @param {Object} [options={}] - Les options pour initialiser l'utilisateur.
   * @param {number} [options.id] - L'identifiant unique Utilisateur.
   * @param {string} [options.login] - Le nom d'utilisateur Utilisateur.
   * @param {string} [options.mot_de_passe] - Le mot de passe Utilisateur.
   * @param {string} [options.mail] - L'adresse e-mail Utilisateur.
   * @param {UtilisateurRole} [options.utilisateur_role] - UtilisateurRole Utilisateur.
   * @param {UtilisateurDestination} [options.utilisateur_destination] - UtilisateurDestination Utilisateur.
   */
  constructor({ id, login, mot_de_passe, mail, utilisateur_role, utilisateur_destination } = {}) {
    const max_length_login = 50;
    const max_length_mot_de_passe = 60;
    const max_lenght_mail = 256;
    const mailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; //https://regexr.com/3e48o

    if (id !== undefined) {
      if (typeof id !== "number") {
        throw new TypeError("id must be a number");
      }
      if (id < 1) {
        throw new Error("id must be a positif number");
      }
      this.id = id;
    }

    if (login !== undefined) {
      if (typeof login !== "string") {
        throw new TypeError("login must be a string");
      }
      if (max_length_login < login.length) {
        throw Error(
          `login must not exceed a maximum length ${max_length_login}`
        );
      }
      this.login = login;
    }

    if (mot_de_passe !== undefined) {
      if (typeof mot_de_passe !== "string") {
        throw new TypeError("mot_de_passe must be a string");
      }
      if (max_length_mot_de_passe < mot_de_passe.length) {
        throw Error(
          `mot_de_passe must not exceed a maximum length ${max_length_mot_de_passe}`
        );
      }
      this.mot_de_passe = mot_de_passe;
    }

    if (mail !== undefined) {
      if (typeof mail !== "string" && typeof mail !== "undefined") {
        throw new TypeError("mail must be a string");
      }
      if (max_lenght_mail < mail.length) {
        throw Error(
          `mail must not exceed a maximum length ${max_lenght_mail}`
        );
      }
      if (!mailRegex.test(mail)) {
        throw new Error("mail must be valid");
      }
      this.mail = mail;
    }

    if (utilisateur_role !== undefined) {
      if (typeof utilisateur_role !== typeof new UtilisateurRole()) {
        throw new TypeError("utilisateur_role must be a UtilisateurRole");
      }
      this.utilisateur_role = utilisateur_role;
    }

    if (utilisateur_destination !== undefined) {
      if (typeof utilisateur_destination !== typeof new UtilisateurDestination()) {
        throw new TypeError("utilisateur_destination must be a UtilisateurDestination");
      }
      this.utilisateur_destination = utilisateur_destination;
    }
  }
}

export { Utilisateur };
