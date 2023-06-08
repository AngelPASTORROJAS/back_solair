import { HttpError, HttpStatus } from "../http/httpStatus.js";
import { DestinationService } from "../services/DestinationService.js";

const MESSAGE_DESTINATION_NOT_FOUND = (id) =>
  `La destination avec l'ID ${id} n'a pas été trouvé.`;

class DestinationController {
  static async getAllDestination(_req, res) {
    try {
      const users = await DestinationService.getAllDestination();
      res.status(HttpStatus.OK.code).json(users);
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async getDestinationById(req, res) {
    const id = req.params.id;

    try {
      const user = await DestinationService.getDestinationById(id);
      if (!user || user.length == 0) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          MESSAGE_DESTINATION_NOT_FOUND(id)
        );
      }
      res.status(HttpStatus.OK.code).json(user);
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || "La destination n'a pas été trouvé.",
      });
    }
  }

  static async createDestination(req, res) {
    const { nom, image, description } = req.body;

    try {
      const created = await DestinationService.createDestination(nom, image, description);
      res
        .status(HttpStatus.CREATED.code)
        .json({ message: "La destination a été créé avec succès." });
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async patchDestinationById(req, res) {
    const id = req.params.id;
    const { nom, image, description } = req.body;

    try {
      const updated = await DestinationService.patchDestinationById(
        id,
        nom,
        image,
        description
      );
      if (!updated) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          MESSAGE_DESTINATION_NOT_FOUND(id)
        );
      }
      res
        .status(HttpStatus.OK.code)
        .json({ message: "La destination a été mis à jour avec succès." });
    } catch (err) {
      res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async getRandomDestination(_req, res) {
    try {
      const users = await DestinationService.getRandomDestination();
      res.status(HttpStatus.OK.code).json(users);
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

export { DestinationController };