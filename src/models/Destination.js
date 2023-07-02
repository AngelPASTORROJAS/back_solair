import { UtilisateurDestination } from "./UtilisateurDestination.js";

/**
 * Destination représente le modèle objet destination.
 * @class
 */
class Destination {
  /**
   * L'identifiant Destination
   * @type {Number | undefined}
   */
  id;

  /**
   * Le nom Destination
   * @type {String | undefined}
   */
  nom;

  /**
   * L'url de l'image Destination
   * @type {String | undefined}
   */
  url_image;

  /**
   * La description Destination
   * @type {String | undefined}
   */
  description;

  /**
   * Le titre Destination
   * @type {String | undefined}
   */
  titre;

  /**
   * L'article Destination
   * @type {String | undefined}
   */
  article;

  /**
   * utilisateur_desination Destination
   * @type {UtilisateurDestination | undefined}
   */
  utilisateur_destination;

  /**
   * @constructor
   * Initialise une nouvelle destination avec les options spécifiées.
   * @param {Object} [options={}] - Les options pour initialiser Destination.
   * @param {number} [options.id] - L'identifiant unique Destination
   * @param {string} [options.nom] - Le nom d'utilisateur Destination
   * @param {string} [options.url_image] - L'url de l'image Destination
   * @param {string} [options.description] - La description Destination
   * @param {string} [options.titre] - Le titre Destination
   * @param {string} [options.article] - L'article Destination
   * @param {UtilisateurDestination} [options.utilisateur_destination] - UtilisateurDestination Destination
   */
  constructor({ id, nom, url_image, description, titre, article, utilisateur_destination } = {}) {
    const max_length_nom = 70;
    const max_length_url_image = 2048;
    const max_length_description = 125;
    const max_length_titre = 100;
    const max_length_article = 1000;

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

    if (url_image !== undefined) {
      if (typeof url_image !== "string") {
        throw new TypeError("url_image must be a string");
      }
      if (max_length_url_image < url_image.length) {
        throw Error(
          `url_image must not exceed a maximum length ${max_length_url_image}`
        );
      }
      this.url_image = url_image;
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        throw new TypeError("description must be a string");
      }
      if (max_length_description < description.length) {
        throw Error(
          `description must must not exceed a maximum length ${max_length_description}`
        );
      }
      this.description = description;
    }
  
    if (titre !== undefined) {
      if (typeof titre !== "string") {
        throw new TypeError("titre must be a string");
      }
      if (max_length_titre < titre.length) {
        throw Error(
          `titre must not exceed a maximum length ${max_length_titre}`
        );
      }
      this.titre = titre;
    }

    if (article !== undefined) {
      if (typeof article !== "string") {
        throw new TypeError("article must be a string");
      }
      if (max_length_article < article.length) {
        throw Error(
          `article must not exceed a maximum length ${max_length_article}`
        );
      }
      this.article = article;
    }

    if (utilisateur_destination !== undefined) {
      if (typeof utilisateur_destination !== typeof new UtilisateurDestination()) {
        throw new TypeError("utilisateur_destination must be a UtilisateurDestination");
      }
      this.utilisateur_destination = utilisateur_destination;
    }
  }
}

export { Destination };
