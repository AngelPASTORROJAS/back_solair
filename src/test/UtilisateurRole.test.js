import { describe, it, expect } from "vitest";
import { Role } from "../models/Role.js";
import { Utilisateur } from "../models/Utilisateur.js";
import { UtilisateurRole } from "../models/UtilisateurRole.js";

describe("UtilisateurRole", () => {
  describe("constructor", () => {
    it("should create an instance of UtilisateurRole with no parameters", () => {
      const utilisateurRole = new UtilisateurRole();
      expect(utilisateurRole.id).toBeUndefined();
      expect(utilisateurRole.utilisateur_id).toBeUndefined();
      expect(utilisateurRole.role_id).toBeUndefined();
      expect(utilisateurRole.utilisateur).toBeUndefined();
      expect(utilisateurRole.role).toBeUndefined();
    });

    it("should create an instance of UtilisateurRole with valid id", () => {
      const utilisateurRole = new UtilisateurRole({ id: 1 });
      expect(utilisateurRole.id).toBe(1);
    });

    it("should throw an error with a negative id", () => {
      expect(() => new UtilisateurRole({ id: -1 })).toThrow(Error);
    });

    it("should throw a type error with a non-numeric id", () => {
      expect(() => new UtilisateurRole({ id: "invalid" })).toThrow(TypeError);
    });

    it("should create an instance of UtilisateurRole with valid utilisateur_id", () => {
      const utilisateurRole = new UtilisateurRole({ utilisateur_id: 1 });
      expect(utilisateurRole.utilisateur_id).toBe(1);
    });

    it("should throw an error with a negative utilisateur_id", () => {
      expect(() => new UtilisateurRole({ utilisateur_id: -1 })).toThrow(Error);
    });

    it("should throw a type error with a non-numeric utilisateur_id", () => {
      expect(() => new UtilisateurRole({ utilisateur_id: "invalid" })).toThrow(
        TypeError
      );
    });

    it("should create an instance of UtilisateurRole with valid role_id", () => {
      const utilisateurRole = new UtilisateurRole({ role_id: 1 });
      expect(utilisateurRole.role_id).toBe(1);
    });

    it("should throw an error with a negative role_id", () => {
      expect(() => new UtilisateurRole({ role_id: -1 })).toThrow(Error);
    });

    it("should throw a type error with a non-numeric role_id", () => {
      expect(() => new UtilisateurRole({ role_id: "invalid" })).toThrow(
        TypeError
      );
    });

    it("should create an instance of UtilisateurRole with valid utilisateur", () => {
      const utilisateur = new Utilisateur();
      const utilisateurRole = new UtilisateurRole({ utilisateur });
      expect(utilisateurRole.utilisateur).toEqual(utilisateur);
    });

    it("should throw a type error with an invalid utilisateur", () => {
      expect(() => new UtilisateurRole({ utilisateur: "invalid" })).toThrow(
        TypeError
      );
    });

    it("should create an instance of UtilisateurRole with valid role", () => {
      const role = new Role();
      const utilisateurRole = new UtilisateurRole({ role });
      expect(utilisateurRole.role).toEqual(role);
    });

    it("should throw a type error with an invalid role", () => {
      expect(() => new UtilisateurRole({ role: "invalid" })).toThrow(TypeError);
    });
  });
});
