import { db } from "../config/db.js";

class DestinationService {
  #db;
  #sql;
  constructor() {
    this.#db = db;
    this.#sql = {
      SELECT_DESTINATIONS : "SELECT id, titre, url_image, article FROM destination",
      SELECT_DESTINATION : "SELECT id, titre, url_image, article FROM destination WHERE id = ?",
      SELECT_DESTINATION_RANDOM: "SELECT id, titre, url_image, article, article FROM destination order by RAND() LIMIT 1",
      CREATE_DESTINATION: "INSERT INTO destination (titre, url_image, article) VALUES (?, ?, ?)"
    };
  }

  getAllDestination = async ( ) => {
    return this.#db.query(this.#sql.SELECT_DESTINATIONS);
  };

  getDestinationById = async ( id) => {
    return this.#db.query(this.#sql.SELECT_DESTINATION, [id]);
  };

  createDestination = async ( titre, url_image, article) => {
    const values = [titre, url_image, article];
    const result = this.#db.query(this.#sql.CREATE_DESTINATION, values);
    return result.affectedRows > 0;
  };

  patchDestinationById = async ( id, titre, url_image, article) => {
    const values = [];
    const columns = [];

    if (titre !== undefined) {
      columns.push("titre = ?");
      values.push(titre);
    }

    if (url_image !== undefined) {
      columns.push("url_image = ?");
      values.push(url_image);
    }

    if (article !== undefined) {
      columns.push("article = ?");
      values.push(article);
    }

    if (columns.length === 0) {
      return true; // Aucune colonne à mettre à jour
    }

    const setClause = columns.join(", ");

    values.push(id);
    const sql = `UPDATE destination SET ${setClause} WHERE id = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  };

  getRandomDestination = async ( ) => {
    return this.#db.query(this.#sql.SELECT_DESTINATION_RANDOM);
  };
}

const destinationService = Object.freeze(new DestinationService());

export { destinationService };
