import db from "../config/db.js";

class DestinationService {
  static async getAllDestination() {
    const query = `SELECT id, nom, urlimage, description FROM ${db.destination}`;
    return db.query(query);
  }

  static async getDestinationById(id) {
    const query = `SELECT id, nom, urlimage, description FROM ${db.destination} WHERE id = ? LIMIT 1`;
    return db.query(query, [id]);
  }

  static async createDestination(nom, urlimage, description) {
    const query = `INSERT INTO ${db.destination} (nom, urlimage, description) VALUES (?, ?, ?)`;
    const result = db.query(query, [nom, urlimage, description]);
    return result.affectedRows > 0;
  }

  static async patchDestinationById(id, nom, urlimage, description) {
    const params = [];
    const columns = [];

    if (nom !== undefined) {
      columns.push("nom = ?");
      params.push(nom);
    }

    if (urlimage !== undefined) {
      columns.push("urlimage = ?");
      params.push(urlimage);
    }

    if (description !== undefined) {
      columns.push("description = ?");
      params.push(description);
    }

    if (columns.length === 0) {
      return true; // Aucune colonne à mettre à jour
    }

    const setClause = columns.join(", ");

    params.push(id);
    const query = `UPDATE ${db.destination} SET ${setClause} WHERE id = ?`;
    const result = db.query(query, params);
    return result.affectedRows > 0;
  }

  static async getRandomDestination() {
    const query = `SELECT id, nom, urlimage, description, ville FROM ${db.destination} order by RAND() LIMIT 1`;
    return db.query(query);
  }
}

export { DestinationService };
