import { HttpError, HttpStatus } from "../http/httpStatus.js";
import { UserService } from "../services/UserService.js";

const MESSAGE_USER_NOT_FOUND = (id) =>
  `L'utilisateur avec l'ID ${id} n'a pas été trouvé.`;

const MESSAGE_AUTHENTICATION_ERROR =
  "L'adresse e-mail ou le mot de passe est incorrect.";

class UserController {
  static async getAllUsers(_req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(HttpStatus.OK.code).json(users);
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async getUserById(req, res) {
    const userId = req.params.id;

    try {
      const user = await UserService.getUserById(userId);
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

  static async createUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const created = await UserService.createUser(username, email, password);
      res
        .status(HttpStatus.CREATED.code)
        .json({ message: "L'utilisateur a été créé avec succès." });
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async authenticateUser(req, res) {
    const { email, password } = req.body;

    try {
      const authenticated = await UserService.authenticateUser(email, password);
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

  static async patchUserById(req, res) {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    try {
      const updated = await UserService.patchUserById(
        userId,
        username,
        email,
        password
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

  static handleError(err, _req, res, _next) {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code;
    res.status(statusCode).json({ message: err.message || HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export { UserController };