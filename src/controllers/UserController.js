import { HttpError, HttpStatus } from "../http/httpStatus.js";
import { utilisateurService } from "../services/UserService.js";

const MESSAGE_USER_NOT_FOUND = (id) =>
  `L'utilisateur avec l'ID ${id} n'a pas été trouvé.`;

const MESSAGE_AUTHENTICATION_ERROR =
  "L'adresse e-mail ou le mot de passe est incorrect.";

class UserController {
  constructor() {
    this.userService = utilisateurService;
  }
  
  getAllUsers = async (_req, res) => { //! besoin de fonction fléché pour avoir le this de la classe
    try {
      const users = await this.userService.getAllUsers();
      res.status(HttpStatus.OK.code).json(users);
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await this.userService.getUserById(userId);
      if (!user || user.length == 0) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          MESSAGE_USER_NOT_FOUND(userId)
        );
      }
      res.status(HttpStatus.OK.code).json(user);
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || "L'utilisateur n'a pas été trouvé.",
      });
    }
  }

  createUser = async (req, res) => {
    const { psuedo, mail, motdepasse } = req.body;

    try {
      const created = await this.userService.createUser(psuedo, mail, motdepasse);
      res
        .status(HttpStatus.CREATED.code)
        .json({ message: "L'utilisateur a été créé avec succès." });
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  authenticateUser = async (req, res) => {
    const { mail, motdepasse } = req.body;

    try {
      const authenticated = await this.userService.authenticateUser(mail, motdepasse);
      if (!authenticated) {
        throw new HttpError(
          HttpStatus.UNAUTHORIZED,
          MESSAGE_AUTHENTICATION_ERROR
        );
      }
      res
        .status(HttpStatus.OK.code)
        .json({ message: "L'utilisateur est authentifié." });
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  patchUserById = async (req, res) => {
    const userId = req.params.id;
    const { psuedo, mail, motdepasse } = req.body;

    try {
      const updated = await this.userService.patchUserById(
        userId,
        psuedo,
        mail,
        motdepasse
      );
      if (!updated) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          MESSAGE_USER_NOT_FOUND(userId)
        );
      }
      res
        .status(HttpStatus.OK.code)
        .json({ message: "L'utilisateur a été mis à jour avec succès." });
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  handleError = (err, _req, res, _next) => {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code;
    res.status(statusCode).json({ message: err.message || HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

const utilisateurController = Object.freeze(new UserController())
export { utilisateurController }