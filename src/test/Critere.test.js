import { describe, it, expect } from "vitest";
import { DestinationCritere } from "../models/DestinationCritere.js";
import { Critere } from "../models/Critere.js";
    
describe("Critere", () => {
  describe("constructor", () => {
    it("should create an instance of Critere with no parameters", () => {
      const critere = new Critere();
      expect(critere.id).toBeUndefined();
      expect(critere.nom).toBeUndefined();
      expect(critere.description).toBeUndefined();
      expect(critere.destination_critere).toBeUndefined();
    });
    
    it("should create an instance of Critere with valid id", () => {
      const critere = new Critere({ id: 1 });
      expect(critere.id).toBe(1);
    });
    
    it("should throw an error with a negative id", () => {
      expect(() => new Critere({ id: -1 })).toThrow(Error);
    });
    
    it("should throw a type error with a non-numeric id", () => {
      expect(() => new Critere({ id: "invalid" })).toThrow(TypeError);
    });
    
    it("should create an instance of Critere with valid nom", () => {
      const critere = new Critere({ nom: "Test" });
      expect(critere.nom).toBe("Test");
    });
    
    it("should throw an error with a too long nom", () => {
      const longNom = "a".repeat(51);
      expect(() => new Critere({ nom: longNom })).toThrow(Error);
    });
    
    it("should throw a type error with a non-string nom", () => {
      expect(() => new Critere({ nom: 123 })).toThrow(TypeError);
    });
    
    it("should create an instance of Critere with valid description", () => {
      const critere = new Critere({ description: "Test description" });
      expect(critere.description).toBe("Test description");
    });
    
    it("should throw an error with a too long description", () => {
      const longDescription = "a".repeat(126);
      expect(() => new Critere({ description: longDescription })).toThrow(Error);
    });
    
    it("should throw a type error with a non-string description", () => {
      expect(() => new Critere({ description: 123 })).toThrow(TypeError);
    });
    
    it("should create an instance of Critere with valid destination_critere", () => {
      const destination_critere = new DestinationCritere();
      const critere = new Critere({ destination_critere });
      expect(critere.destination_critere).toEqual(destination_critere);
    });
    
    it("should throw a type error with an invalid destination_critere", () => {
      expect(() => new Critere({ destination_critere: "invalid" })).toThrow(TypeError);
    });
  });});