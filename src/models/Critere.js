import { DestinationCritere } from "./DestinationCritere.js";

/**
 * Critere représente le modèle objet role.
 * @class
 */
class Critere {
  /**
   * L'identifiant du Critere.
   * @type {Number | undefined}
   */
  id;

  /**
   * Le nom du Critere.
   * @type {String | undefined}
   */
  nom;

  /**
   * La description du Critere.
   * @type {String | undefined}
   */
  description;

  /**
   * DestinationCritere du Critere.
   * @type {DestinationCritere | undefined}
   */
  destination_critere;

  /**
   * @constructor
   * Initialise un nouvel rôle avec les options spécifiées.
   * @param {Object} [options={}] - Les options pour initialiser Critere.
   * @param {number} [options.id] - L'identifiant unique du Critere.
   * @param {string} [options.nom] - Le nom du Critere.
   * @param {string} [options.description] - La description du Critere.
   * @param {DestinationCritere} [options.destination_critere] - DestinationCritere du Critere.
   */
  constructor({ id, nom, description, destination_critere } = {}) {
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

    if (destination_critere !== undefined) {
      if (typeof destination_critere !== typeof new DestinationCritere()) {
        throw new TypeError("destination_critere must be a DestinationCritere");
      }
      this.destination_critere = destination_critere;
    }
  }
}
export { Critere };
