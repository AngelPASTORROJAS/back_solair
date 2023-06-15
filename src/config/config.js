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

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const HASH_ROUNDS = process.env.HASH_ROUNDS || 10;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";


export { NODE_ENV, PORT, HASH_ROUNDS, JWT_EXPIRATION, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT }
