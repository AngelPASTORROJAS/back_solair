import { Destination } from "./Destination.js";
import { Critere } from "./Critere.js";

/**
 * DestinationCritere représente le modèle objet utilisateur_destination.
 * @class
 */
class DestinationCritere {
  /**
   * L'identifiant du DestinationCritere.
   * @type {Number | undefined}
   */
  id;

  /**
   * Le critere_id du DestinationCritere.
   * @type {String | undefined}
   */
  critere_id;

  /**
   * La destination_id du DestinationCritere.
   * @type {String | undefined}
   */
  destination_id;

  /**
   * Critere du DestinationCritere.
   * @type {Critere | undefined}
   */
  critere;

  /**
   * Destination du DestinationCritere.
   * @type {Destination | undefined}
   */
  destination;

  /**
   * @constructor
   * Initialise un nouvel DestinationCritere avec les options spécifiées.
   * @param {Object} [options={}] - Les options pour initialiser le DestinationCritere.
   * @param {number} [options.id] - L'identifiant unique du DestinationCritere.
   * @param {string} [options.critere_id] - critere_id du DestinationCritere.
   * @param {string} [options.destination_id] - destination_id du DestinationCritere.
   * @param {Object} [options.critere] - Critere du DestinationCritere.
   * @param {Object} [options.destination] - Destination du DestinationCritere.
   */
  constructor({ id, critere_id, destination_id, critere, destination } = {}) {
    if (id !== undefined) {
      if (typeof id !== "number") {
        throw new TypeError("id must be a number");
      }
      if (id < 1) {
        throw new Error("id must be a positif number");
      }
      this.id = id;
    }

    if (critere_id !== undefined) {
      if (typeof critere_id !== "number") {
        throw new TypeError("critere_id must be a number");
      }
      if (critere_id < 1) {
        throw new Error("critere_id must be a positif number");
      }
      this.critere_id = critere_id;
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

    if (critere !== undefined) {
      if (typeof critere !== typeof new Critere()) {
        throw new TypeError("critere must be a Critere");
      }
      this.critere = critere;
    }
  
    if (destination !== undefined) {
      if (typeof destination !== typeof new Destination()) {
        throw new TypeError("destination must be a Destination");
      }
      this.destination = destination;
    }
  }
}
export { DestinationCritere };
