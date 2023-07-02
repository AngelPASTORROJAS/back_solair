import { HttpError, HttpStatus } from "../http/httpStatus.js";
import { destinationService } from "../services/DestinationService.js";

class DestinationController {
  /**@private */
  #destinationService;
  constructor() {
    this.#destinationService = destinationService;
  }
  getAllDestination = async (_req, res) => {
    try {
      const users = await this.#destinationService.getAllDestination();
      if(!users){ throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR); }
      res.status(HttpStatus.OK.code).json(users);
    } catch (err) {
      this.handleError(err,res);
    }
  };

  getDestinationById = async (req, res) => {
    const id = req.params.id;

    try {
      const user = await this.#destinationService.getDestinationById(id);
      if(!user){ throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR); }
      res.status(HttpStatus.OK.code).json(user);
    } catch (err) {
      this.handleError(err,res);
    }
  };

  createDestination = async (req, res) => {
    const { nom, urlimage, description } = req.body;

    try {
      const created = await this.#destinationService.createDestination(nom, urlimage, description);
      if(!created){ throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR); }
      res.status(HttpStatus.CREATED.code).json({ message: HttpStatus.CREATED.message });
    } catch (err) {
      this.handleError(err,res);
    }
  };

  patchDestinationById = async (req, res) => {
    const id = req.params.id;
    const { nom, urlimage, description } = req.body;
    try {
      const updated = await this.#destinationService.patchDestinationById(id, nom, urlimage, description);
      if(!updated){ throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR); }
      res.status(HttpStatus.OK.code).json({ message: HttpStatus.OK.message });
    } catch (err) {
      this.handleError(err,res);
    }
  };

  getRandomDestination = async (_req, res) => {
    try {
      const destination = await this.#destinationService.getRandomDestination();
      if(!destination){ throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR); }
      res.status(HttpStatus.OK.code).json(destination);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  /**@private */
  handleError(err, res) {
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code;
    res.status(statusCode).json({ message: err.message || HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

const destinationController = Object.freeze(new DestinationController());
export { destinationController };