import { HttpStatus } from "../http/httpStatus.js";

const ValidateUserInput = (req, res, next) => {
  const { login, email, mot_de_passe } = req.body;

  if (!login || !email || !mot_de_passe) {
    const errorMessage = "Le nom d'utilisateur, l'e-email et le mot de passe sont requis.";
    return res.status(HttpStatus.BAD_REQUEST.code).json({ message: errorMessage });
  }
  next();
};

const ValidateAuthInput = (req, res, next) => {
  const { login, mot_de_passe } = req.body;

  if ( !login || !mot_de_passe) {
    const errorMessage = "Le nom d'utilisateur et le mot de passe sont requis.";
    return res.status(HttpStatus.BAD_REQUEST.code).json({ message: errorMessage });
  }
  next();
};

export { ValidateUserInput, ValidateAuthInput };