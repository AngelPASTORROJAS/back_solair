import { hash, compare } from "bcrypt";
import { HASH_ROUNDS } from "../config/config.js";

const encryptPassword = async (password) => {
  return await hash(password, Number(HASH_ROUNDS));
};

const checkPasswordMatch = async (password, hash) => {
  return await compare(password, hash);
};

export { encryptPassword, checkPasswordMatch };
