import { hash, compare } from "bcrypt";

/**
 * The function `hashData` asynchronously hashes the given data using a salt or number of rounds.
 * @author Angel Daniel PASTOR ROJAS
 * @date 2023-07-01
 * @param {string | Buffer} data - The `data` parameter is the input data that you want to hash. It can be any type of
 * data, such as a string, number, object, or array. The `hashData` function takes this data as input
 * and returns a hashed version of it.
 * @returns {Promise<string>} the hashed version of the input data.
 */
const hashData = async (data) => {
  const saltOrRounds = 10;
  return await hash(data, saltOrRounds);
};

/**
 * The function `checkDataMatch` compares two values, `data` and `encrypted`, and returns a promise
 * that resolves to the result of the comparison.
 * @author Angel Daniel PASTOR ROJAS
 * @date 2023-07-01
 * @param {String | Buffer} data - The `data` parameter is the plain text data that you want to compare with the
 * encrypted data.
 * @param {String} encrypted - The "encrypted" parameter is the encrypted version of the data that needs to be
 * checked for a match.
 * @returns {Promise<Boolean>} the result of the `compare` function, which is awaited.
 */
const checkDataMatch = async (data, encrypted) => {
  return await compare(data, encrypted);
};

export { hashData as encryptPassword, checkDataMatch as checkPasswordMatch };
