import { Destination } from "./Destination.js";
import { Utilisateur } from "./Utilisateur.js";

/**
 * UtilisateurDestination représente le modèle objet utilisateur_destination.
 * @class
 */
class UtilisateurDestination {
  /**
   * L'identifiant du UtilisateurDestination.
   * @type {Number | undefined}
   */
  id;

  /**
   * Le utilisateur_id du UtilisateurDestination.
   * @type {String | undefined}
   */
  utilisateur_id;

  /**
   * La destination_id du UtilisateurDestination.
   * @type {String | undefined}
   */
  destination_id;

  /**
   * Utilisateur du UtilisateurDestination.
   * @type {Utilisateur | undefined}
   */
  utilisateur;

  /**
   * Destination du UtilisateurDestination.
   * @type {Destination | undefined}
   */
  destination;

  /**
   * @constructor
   * Initialise un nouvel UtilisateurDestination avec les options spécifiées.
   * @param {Object} [options={}] - Les options pour initialiser le UtilisateurDestination.
   * @param {number} [options.id] - L'identifiant unique du UtilisateurDestination.
   * @param {string} [options.utilisateur_id] - utilisateur_id du UtilisateurDestination.
   * @param {string} [options.destination_id] - destination_id du UtilisateurDestination.
   * @param {Object} [options.utilisateur] - Utilisateur du UtilisateurDestination.
   * @param {Object} [options.destination] - Destination du UtilisateurDestination.
   */
  constructor({ id, utilisateur_id, destination_id, utilisateur, destination } = {}) {
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

    if(destination_id !== undefined){
      if (typeof destination_id !== "number") {
        throw new TypeError("destination_id must be a number");
      }
      if (destination_id < 1) {
        throw new Error("destination_id must be a positif number");
      }
      this.destination_id = destination_id;
    }

    if (utilisateur !== undefined) {
      if (typeof utilisateur !== typeof new Utilisateur()) {
        throw new TypeError("utilisateur must be a Utilisateur");
      }
      this.utilisateur = utilisateur;
    }
  
    if (destination !== undefined) {
      if (typeof destination !== typeof new Destination()) {
        throw new TypeError("destination must be a Destination");
      }
      this.destination = destination;
    }
  }
}
export { UtilisateurDestination };
