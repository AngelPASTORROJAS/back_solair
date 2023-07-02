import { describe, it, expect } from "vitest";
import { UtilisateurRole } from "../../models/UtilisateurRole.js";
import { Role } from "../../models/Role.js";

describe("Role", () => {
  describe("constructor", () => {
    it("should create an instance of Role with no parameters", () => {
      const role = new Role();
      expect(role.id).toBeUndefined();
      expect(role.nom).toBeUndefined();
      expect(role.description).toBeUndefined();
      expect(role.utilisateur_role).toBeUndefined();
    });

    it("should create an instance of Role with valid id", () => {
      const role = new Role({ id: 1 });
      expect(role.id).toBe(1);
    });

    it("should throw an error with a negative id", () => {
      expect(() => new Role({ id: -1 })).toThrow(Error);
    });

    it("should throw a type error with a non-numeric id", () => {
      expect(() => new Role({ id: "invalid" })).toThrow(TypeError);
    });

    it("should create an instance of Role with valid nom", () => {
      const role = new Role({ nom: "admin" });
      expect(role.nom).toBe("admin");
    });

    it("should throw an error with a long nom", () => {
      const long_nom = "a".repeat(51);
      expect(() => new Role({ nom: long_nom })).toThrow(Error);
    });

    it("should throw a type error with a non-string nom", () => {
      expect(() => new Role({ nom: 123 })).toThrow(TypeError);
    });

    it("should create an instance of Role with valid description", () => {
      const role = new Role({ description: "This is a it role" });
      expect(role.description).toBe("This is a it role");
    });

    it("should throw an error with a long description", () => {
      const long_description = "a".repeat(126);
      expect(() => new Role({ description: long_description })).toThrow(Error);
    });

    it("should throw a type error with a non-string description", () => {
      expect(() => new Role({ description: 123 })).toThrow(TypeError);
    });

    it("should create an instance of Role with valid utilisateur_role", () => {
      const utilisateur_role = new UtilisateurRole();
      const role = new Role({ utilisateur_role });
      expect(role.utilisateur_role).toEqual(utilisateur_role);
    });

    it("should throw a type error with an invalid utilisateur_role", () => {
      expect(() => new Role({ utilisateur_role: "invalid" })).toThrow(
        TypeError
      );
    });
  });
});
