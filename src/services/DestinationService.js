import { db } from "../config/db.js";
import { entitySchema } from "../models/EntitySchema.js";

class DestinationService {
  #db;
  #table;
  #columns;
  constructor() {
    this.#db = db;
    this.#columns = entitySchema.destination.columns;
    this.#table = entitySchema.destination.tableName; 
  }

  getAllDestination = async ( ) => {
    const sql = `SELECT ${this.#columns.id}, 
        ${this.#columns.nom}, 
        ${this.#columns.image_url}, 
        ${this.#columns.description} 
      FROM ${this.#table}`;
    return this.#db.query(sql);
  }

  getDestinationById = async ( id) => {
    const sql = `SELECT ${this.#columns.id}, 
        ${this.#columns.nom}, 
        ${this.#columns.image_url}, 
        ${this.#columns.description} 
      FROM ${this.#table} 
      WHERE ${this.#columns.id} = ? LIMIT 1`;
    return this.#db.query(sql, [id]);
  }

  createDestination = async ( nom, urlimage, description) => {
    const sql = `INSERT INTO ${this.#table} 
        (${this.#columns.nom}, ${this.#columns.image_url}, ${this.#columns.description}) 
      VALUES (?, ?, ?)`;
    const values = [nom, urlimage, description];
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  }

  patchDestinationById = async ( id, nom, urlimage, description) => {
    const values = [];
    const columns = [];

    if (nom !== undefined) {
      columns.push(`${this.#columns.nom} = ?`);
      values.push(nom);
    }

    if (urlimage !== undefined) {
      columns.push(`${this.#columns.image_url} = ?`);
      values.push(urlimage);
    }

    if (description !== undefined) {
      columns.push(`${this.#columns.description} = ?`);
      values.push(description);
    }

    if (columns.length === 0) {
      return true; // Aucune colonne à mettre à jour
    }

    const setClause = columns.join(", ");

    values.push(id);
    const sql = `UPDATE ${this.#table} SET ${setClause} WHERE ${this.#columns.id} = ?`;
    const result = this.#db.query(sql, values);
    return result.affectedRows > 0;
  }

  getRandomDestination = async ( ) => {
    const sql = `SELECT ${this.#columns.id}, 
        ${this.#columns.nom}, 
        ${this.#columns.image_url}, 
        ${this.#columns.description}, 
        ${this.#columns.description} 
      FROM ${this.#table} order by RAND() LIMIT 1`;
    return this.#db.query(sql);
  }
}

const destinationService = Object.freeze(new DestinationService());

export { destinationService };
