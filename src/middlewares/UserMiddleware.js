import { HttpStatus } from "../http/httpStatus.js";

const ValidateUserInput = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const errorMessage = "Le nom d'utilisateur, l'e-mail et le mot de passe sont requis.";
    return res.status(HttpStatus.BAD_REQUEST.code).json({ message: errorMessage });
  }
  next();
};

const ValidateAuthInput = (req, res, next) => {
  const { email, password } = req.body;

  if ( !email || !password) {
    const errorMessage = "Le e-mail et le mot de passe sont requis.";
    return res.status(HttpStatus.BAD_REQUEST.code).json({ message: errorMessage });
  }
  next();
};

export { ValidateUserInput, ValidateAuthInput };