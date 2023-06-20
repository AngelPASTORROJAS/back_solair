import { db } from "../config/db.js";

class DestinationService {
  static async getAllDestination() {
    const sql = `SELECT id, nom, urlimage, description FROM ${db.destination}`;
    return db.query(sql);
  }

  static async getDestinationById(id) {
    const sql = `SELECT id, nom, urlimage, description FROM ${db.destination} WHERE id = ? LIMIT 1`;
    return db.query(sql, [id]);
  }

  static async createDestination(nom, urlimage, description) {
    const sql = `INSERT INTO ${db.destination} (nom, urlimage, description) VALUES (?, ?, ?)`;
    const values = [nom, urlimage, description];
    const result = db.query(sql, values);
    return result.affectedRows > 0;
  }

  static async patchDestinationById(id, nom, urlimage, description) {
    const values = [];
    const columns = [];

    if (nom !== undefined) {
      columns.push("nom = ?");
      values.push(nom);
    }

    if (urlimage !== undefined) {
      columns.push("urlimage = ?");
      values.push(urlimage);
    }

    if (description !== undefined) {
      columns.push("description = ?");
      values.push(description);
    }

    if (columns.length === 0) {
      return true; // Aucune colonne à mettre à jour
    }

    const setClause = columns.join(", ");

    values.push(id);
    const sql = `UPDATE ${db.destination} SET ${setClause} WHERE id = ?`;
    const result = db.query(sql, values);
    return result.affectedRows > 0;
  }

  static async getRandomDestination() {
    const sql = `SELECT id, nom, urlimage, description, ville FROM ${db.destination} order by RAND() LIMIT 1`;
    return db.query(sql);
  }
}

export { DestinationService };
