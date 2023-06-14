import { config } from "dotenv";
config();

const NODE_ENV = process.env.NODE_ENV;

const environnement={
    developpement:'dev',
    local:'local',
    preproduction:'pre',
    production:'prod',
    test:'test'
}

if(NODE_ENV){
    config({path:`env/${environnement[NODE_ENV]}.env`, encoding: 'latin1', override: true})
}

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
const DATABASE=Object.freeze({
    user: process.env.TABLE_USER || "Utilisateur",
    destination: process.env.TABLE_DESTINATION || "Destination",
});
const HASH_ROUNDS = process.env.HASH_ROUNDS || 10;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";


export { NODE_ENV, PORT, DB_CONFIG, DATABASE, HASH_ROUNDS, JWT_EXPIRATION }
