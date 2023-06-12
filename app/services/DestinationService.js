import { executeQuery } from "../utils/database.js";
import { DESTINATION_TABLE } from "../config.js";

class DestinationService {
  static async getAllDestination() {
    const query = `SELECT id, nom, urlimage, description FROM ${DESTINATION_TABLE}`;
    return await executeQuery(query);
  }

  static async getDestinationById(id) {
    const query = `SELECT id, nom, urlimage, description FROM ${DESTINATION_TABLE} WHERE id = ? LIMIT 1`;
    return await executeQuery(query, [id]);
  }

  static async createDestination(nom, urlimage, description) {
    const query = `INSERT INTO ${DESTINATION_TABLE} (nom, urlimage, description) VALUES (?, ?, ?)`;
    const result = await executeQuery(query, [nom, urlimage, description]);
    return result.affectedRows > 0;
  }

  static async patchDestinationById(id, nom, urlimage, description) {
    const params = [];
    const columns = [];

    if (nom !== undefined) {
      columns.push({ name: "nom" });
      params.push(nom);
    }

    if (urlimage !== undefined) {
      columns.push({ name: "urlimage" });
      params.push(urlimage);
    }

    if (description !== undefined) {
      columns.push({ name: "description" });
      params.push(description);
    }

    if (columns.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }

    const setClause = columns.map((column) => `${column.name} = ?`).join(", ");

    params.push(id);
    const query = `UPDATE ${DESTINATION_TABLE} SET ${setClause} WHERE id = ?`;
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;
  }

  static async getRandomDestination() {
    const query = `SELECT id, nom, urlimage, description, ville FROM ${DESTINATION_TABLE} order by RAND() LIMIT 1`;
    return await executeQuery(query);
  }
}

export { DestinationService };
