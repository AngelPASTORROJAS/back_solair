import { createPool } from "mysql2/promise";
import { DB_URL } from "./config.js";

const pool = createPool(DB_URL);

export { pool };