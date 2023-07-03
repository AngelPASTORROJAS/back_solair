import { HttpError, HttpStatus } from "../http/httpStatus.js";
import { getToken } from "../middlewares/auth/Jwt.js";
import { Utilisateur } from "../models/Utilisateur.js";
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
      res.status(HttpStatus.OK.code).json(user[0]);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  createUser = async (req, res) => {
    const { login, email, mot_de_passe } = req.body;
    try {
      const utilisateur = new Utilisateur({
        login: login,
        email: email,
        mot_de_passe: mot_de_passe,
      });
      const created = await this.#userService.createUser(utilisateur);
      if (!created) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({ message: "l'utilisateur n'as pas pu être créer" });
      }else{
        res.status(HttpStatus.CREATED.code).json({ message: HttpStatus.CREATED.message });
      }
    } catch (err) {
      this.handleError(err, res);
    }
  };

  authenticateUser = async (req, res) => {
    const { login, mot_de_passe } = req.body;
    try {
      const utilisateur = new Utilisateur({login:login, mot_de_passe:mot_de_passe});
      const payload = await this.#userService.getUserData(utilisateur);
      if (!payload) { 
        res.status(HttpStatus.UNAUTHORIZED.code).json({message: HttpStatus.UNAUTHORIZED.message}); 
      } else {
        res.status(HttpStatus.OK.code).json({ token: getToken(payload) });
      }
    } catch (err) {
      this.handleError(err, res);
    }
  };

  /*
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
  };*/

  /**@private */
  handleError = (err, res) => {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code;
    res.status(statusCode).json({ message: err.message || HttpStatus.INTERNAL_SERVER_ERROR });
  };
}

const utilisateurController = Object.freeze(new UserController());
export { utilisateurController };