import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || '';
const USER_TABLE = process.env.USER_TABLE || "Utilisateur";
const HASH_ROUNDS = process.env.HASH_ROUNDS || 10;

export { PORT, DB_URL, USER_TABLE, HASH_ROUNDS }