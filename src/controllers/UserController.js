import { HttpError, HttpStatus } from "../http/httpStatus.js";
import { utilisateurService } from "../services/UserService.js";

class UserController {
  #userService;
  constructor() {
    this.#userService = utilisateurService;
  }
  
  getAllUsers = async (_req, res) => { //! besoin de fonction fléché pour avoir le this de la classe
    try {
      const users = await this.#userService.getAllUsers();
      if (!users) { throw new HttpError(HttpStatus.NOT_FOUND); }
      res.status(HttpStatus.OK.code).json(users);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await this.#userService.getUserById(userId);
      if (user?.length == 0) { throw new HttpError(HttpStatus.NOT_FOUND); }
      res.status(HttpStatus.OK.code).json(user);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  createUser = async (req, res) => {
    const { psuedo, mail, motdepasse } = req.body;
    try {
      const created = await this.#userService.createUser(psuedo, mail, motdepasse);
      if(!created){ throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR); }
      res.status(HttpStatus.CREATED.code).json({ message: HttpStatus.CREATED.message });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  authenticateUser = async (req, res) => {
    const { mail, motdepasse } = req.body;
    try {
      const authenticated = await this.#userService.authenticateUser(mail, motdepasse);
      if (!authenticated) { throw new HttpError(HttpStatus.UNAUTHORIZED); }
      res.status(HttpStatus.NO_CONTENT.code).json({ message: "L'utilisateur est authentifié." });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  patchUserById = async (req, res) => {
    const userId = req.params.id;
    const { pseudo, mail, motdepasse } = req.body;

    try {
      const updated = await this.#userService.patchUserById(userId,pseudo,mail,motdepasse);
      if (!updated) { throw new HttpError(HttpStatus.NOT_FOUND); }
      res.status(HttpStatus.OK.code).json({ message: "L'utilisateur a été mis à jour avec succès." });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  /**@private */
  handleError = (err, res) => {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code;
    res.status(statusCode).json({ message: err.message || HttpStatus.INTERNAL_SERVER_ERROR });
  };
}

const utilisateurController = Object.freeze(new UserController());
export { utilisateurController };