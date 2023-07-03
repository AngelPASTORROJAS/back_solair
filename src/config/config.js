import { config } from "dotenv";
config();

const NODE_ENV = process.env.NODE_ENV || "";

const environnement = {
  developpement: "dev",
  local: "local",
  preproduction: "pre",
  production: "prod",
  test: "test",
};

if (NODE_ENV) {
  config({ 
    path: `env/${environnement[NODE_ENV]}.env`,
    encoding: "latin1",
    override: true,
  });
}
const DB_HOST = process.env.DB_HOST || "exempleHost";
const DB_USER = process.env.DB_USER || "exempleUser";
const DB_PASSWORD = process.env.DB_PASSWORD || "exemplePassword";
const DB_DATABASE = process.env.DB_DATABASE || "exempleDatabase";
const DB_PORT = Number(process.env.DB_PORT) || 3454;

const SECRET_KEY = process.env.SECRET_KEY || "exemple-key" ;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";
const PORT = Number(process.env.PORT) || 3000;

export {
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  SECRET_KEY,
  JWT_EXPIRATION,
  PORT
};
