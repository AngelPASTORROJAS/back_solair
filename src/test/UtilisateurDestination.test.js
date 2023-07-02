import { describe, it, expect } from "vitest";
import { Utilisateur } from "../models/Utilisateur.js";
import { UtilisateurDestination } from "../models/UtilisateurDestination.js";
import { Destination } from "../models/Destination.js";

describe("UtilisateurDestination", () => {
  describe("constructor", () => {
    it("should create an instance of UtilisateurDestination with no parameters", () => {
      const utilisateurDestination = new UtilisateurDestination();
      expect(utilisateurDestination.id).toBeUndefined();
      expect(utilisateurDestination.utilisateur_id).toBeUndefined();
      expect(utilisateurDestination.destination_id).toBeUndefined();
      expect(utilisateurDestination.utilisateur).toBeUndefined();
      expect(utilisateurDestination.destination).toBeUndefined();
    });

    it("should create an instance of UtilisateurDestination with a valid ID", () => {
      const utilisateurDestination = new UtilisateurDestination({ id: 1 });
      expect(utilisateurDestination.id).toBe(1);
    });

    it("should throw an error with a negative ID", () => {
      expect(() => new UtilisateurDestination({ id: -1 })).toThrowError(
        "id must be a positif number"
      );
    });

    it("should throw a type error with a non-numeric ID", () => {
      expect(() => new UtilisateurDestination({ id: "invalid" })).toThrowError(
        "id must be a number"
      );
    });

    it("should create an instance of UtilisateurDestination with a valid utilisateur_id", () => {
      const utilisateurDestination = new UtilisateurDestination({
        utilisateur_id: 1,
      });
      expect(utilisateurDestination.utilisateur_id).toBe(1);
    });

    it("should throw an error with a negative utilisateur_id", () => {
      expect(() => new UtilisateurDestination({ utilisateur_id: -1 })).toThrow(
        Error
      );
    });

    it("should throw a type error with a non-numeric utilisateur_id", () => {
      expect(
        () => new UtilisateurDestination({ utilisateur_id: "invalid" })
      ).toThrow(TypeError);
    });

    it("should create an instance of UtilisateurDestination with a valid destination_id", () => {
      const utilisateurDestination = new UtilisateurDestination({
        destination_id: 1,
      });
      expect(utilisateurDestination.destination_id).toBe(1);
    });

    it("should throw an error with a negative destination_id", () => {
      expect(() => new UtilisateurDestination({ destination_id: -1 })).toThrow(
        Error
      );
    });

    it("should throw a type error with a non-numeric destination_id", () => {
      expect(
        () => new UtilisateurDestination({ destination_id: "invalid" })
      ).toThrow(TypeError);
    });

    it("should create an instance of UtilisateurDestination with a valid utilisateur", () => {
      const utilisateur = new Utilisateur();
      const utilisateurDestination = new UtilisateurDestination({
        utilisateur,
      });
      expect(utilisateurDestination.utilisateur).toEqual(utilisateur);
    });

    it("should throw a type error with an invalid utilisateur", () => {
      expect(
        () => new UtilisateurDestination({ utilisateur: "invalid" })
      ).toThrow(TypeError);
    });

    it("should create an instance of UtilisateurDestination with a valid destination", () => {
      const destination = new Destination();
      const utilisateurDestination = new UtilisateurDestination({
        destination,
      });
      expect(utilisateurDestination.destination).toEqual(destination);
    });

    it("should throw a type error with an invalid destination", () => {
      expect(
        () => new UtilisateurDestination({ destination: "invalid" })
      ).toThrow(TypeError);
    });
  });
});
