import { HttpStatus } from "../http/httpStatus.js";

const ValidateUserInput = (req, res, next) => {
  const { pseudo, mail, motdepasse } = req.body;

  if (!pseudo || !mail || !motdepasse) {
    const errorMessage = "Le nom d'utilisateur, l'e-mail et le mot de passe sont requis.";
    return res.status(HttpStatus.BAD_REQUEST.code).json({ message: errorMessage });
  }
  next();
};

const ValidateAuthInput = (req, res, next) => {
  const { mail, motdepasse } = req.body;

  if ( !mail || !motdepasse) {
    const errorMessage = "Le e-mail et le mot de passe sont requis.";
    return res.status(HttpStatus.BAD_REQUEST.code).json({ message: errorMessage });
  }
  next();
};

export { ValidateUserInput, ValidateAuthInput };