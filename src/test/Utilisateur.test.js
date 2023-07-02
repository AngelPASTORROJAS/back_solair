import { describe, it, expect } from "vitest";
import { Utilisateur } from "../models/Utilisateur.js";
import { UtilisateurRole } from "../models/UtilisateurRole.js";
import { UtilisateurDestination } from "../models/UtilisateurDestination.js";

describe("Utilisateur", () => {
  describe("constructor", () => {
    it("should create an instance of Utilisateur with default values", () => {
      const utilisateur = new Utilisateur();
      expect(utilisateur.id).toBeUndefined();
      expect(utilisateur.login).toBeUndefined();
      expect(utilisateur.mot_de_passe).toBeUndefined();
      expect(utilisateur.email).toBeUndefined();
      expect(utilisateur.utilisateur_role).toBeUndefined();
      expect(utilisateur.utilisateur_destination).toBeUndefined();
    });

    it("should create an instance of Utilisateur with provided values", () => {
      const utilisateurRole = new UtilisateurRole();
      const utilisateurDestination = new UtilisateurDestination();
      const utilisateur = new Utilisateur({
        id: 1,
        login: "test",
        mot_de_passe: "test123",
        email: "test@example.com",
        utilisateur_role: utilisateurRole,
        utilisateur_destination: utilisateurDestination,
      });

      expect(utilisateur.id).toBe(1);
      expect(utilisateur.login).toBe("test");
      expect(utilisateur.mot_de_passe).toBe("test123");
      expect(utilisateur.email).toBe("test@example.com");
      expect(utilisateur.utilisateur_role).toBe(utilisateurRole);
      expect(utilisateur.utilisateur_destination).toBe(utilisateurDestination);
    });

    it("should throw an error if id is not a number", () => {
      expect(() => new Utilisateur({ id: "not a number" })).toThrowError(
        "id must be a number"
      );
    });

    it("should throw an error if id is less than 1", () => {
      expect(() => new Utilisateur({ id: 0 })).toThrowError(
        "id must be a positif number"
      );
    });

    it("should throw an error if login exceeds maximum length", () => {
      const login = "a".repeat(51);
      expect(() => new Utilisateur({ login })).toThrowError(
        "login must not exceed a maximum length 50"
      );
    });

    it("should throw a type error with a non-string login", () => {
      expect(() => new Utilisateur({ login: 123 })).toThrow(TypeError);
    });

    it("should throw an error if mot_de_passe exceeds maximum length", () => {
      const mot_de_passe = "a".repeat(61);
      expect(() => new Utilisateur({ mot_de_passe })).toThrowError(
        "mot_de_passe must not exceed a maximum length 60"
      );
    });

    it("should throw a type error with a non-string mot_de_passe", () => {
      expect(() => new Utilisateur({ mot_de_passe: 123 })).toThrow(TypeError);
    });

    it("should throw an error if email exceeds maximum length", () => {
      const email = "a".repeat(257);
      expect(() => new Utilisateur({ email })).toThrowError(
        "email must not exceed a maximum length 256"
      );
    });

    it("should throw an error if email is not valid", () => {
      const email = "invalid-email";
      expect(() => new Utilisateur({ email })).toThrowError(
        "email must be valid"
      );
    });

    it("should throw a type error with a non-string email", () => {
      expect(() => new Utilisateur({ email: 123 })).toThrow(TypeError);
    });

    it("should throw an error if utilisateur_role is not a UtilisateurRole", () => {
      expect(() => new Utilisateur({ utilisateur_role: "Other than Object" })).toThrowError(
        "utilisateur_role must be a UtilisateurRole"
      );
    });

    it("should throw an error if utilisateur_destination is not a UtilisateurDestination", () => {
      expect(
        () => new Utilisateur({ utilisateur_destination: "Other than Object" })
      ).toThrowError(
        "utilisateur_destination must be a UtilisateurDestination"
      );
    });
  });
});
