import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3000;
const DB_CONFIG = Object.freeze({
    host: process.env.DB_HOST || "exempleHost",
    user: process.env.DB_USER || "exempleUser",
    password: process.env.DB_PASSWORD || "exemplePassword",
    database: process.env.DB_DATABASE || "exempleDatabase",
    port: process.env.DB_PORT || 3454,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const USER_TABLE = process.env.USER_TABLE || "Utilisateur";
const DESTINATION_TABLE = process.env.DESTINATION_TABLE || "Destination";
const HASH_ROUNDS = process.env.HASH_ROUNDS || 10;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";


export { PORT, DB_CONFIG, USER_TABLE, HASH_ROUNDS, DESTINATION_TABLE, JWT_EXPIRATION }