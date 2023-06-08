import { executeQuery } from "../utils/database.js";
import { DESTINATION_TABLE } from "../config.js";

class DestinationService {
  static async getAllDestination() {
    const query = `SELECT id, nom, urlimage, description FROM ${DESTINATION_TABLE}`;
    const [rows] = await executeQuery(query);
    return rows;
  }

  static async getDestinationById(id) {
    const query = `SELECT id, nom, urlimage, description FROM ${DESTINATION_TABLE} WHERE id = ? LIMIT 1`;
    const [row] = await executeQuery(query, [id]);
    return row;
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
      columns.push({ name: "nom", value: nom });
      params.push(nom);
    }
  
    if (urlimage !== undefined) {
      columns.push({ name: "urlimage", value: urlimage });
      params.push(urlimage);
    }
  
    if (description !== undefined) {
      columns.push({ name: "description", value: description });
      params.push(hashedPassword);
    }
    
    if (columns.length == 0) {
      return true; // Aucune colonne à mettre à jour
    }
    
    const setClause = columns.map(column => `${column.name} = ?`).join(", ");
  
  
    params.push(id);
    const query = `UPDATE ${DESTINATION_TABLE} SET ${setClause} WHERE id = ?`;
    const result = await executeQuery(query, params);
    return result.affectedRows > 0;  }
}

export { DestinationService };
