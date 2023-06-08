import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || 'mysql://root:1QUzcmqbVUzyyrImekDb@containers-us-west-191.railway.app:7435/railway';
const USER_TABLE = process.env.USER_TABLE || "Utilisateur";
const DESTINATION_TABLE = process.env.DESTINATION_TABLE || "Destination";
const HASH_ROUNDS = process.env.HASH_ROUNDS || 10;

export { PORT, DB_URL, USER_TABLE, HASH_ROUNDS, DESTINATION_TABLE }