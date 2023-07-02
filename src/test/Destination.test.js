import { describe, it, expect } from "vitest";
import { Destination } from "../models/Destination.js";
import { UtilisateurDestination } from "../models/UtilisateurDestination.js";
import { DestinationCritere } from "../models/DestinationCritere.js";

describe("Destination", () => {
  describe("constructor", () => {
    it("should create an instance of Destination with no parameters", () => {
      const destination = new Destination();
      expect(destination.id).toBeUndefined();
      expect(destination.nom).toBeUndefined();
      expect(destination.url_image).toBeUndefined();
      expect(destination.description).toBeUndefined();
      expect(destination.titre).toBeUndefined();
      expect(destination.article).toBeUndefined();
      expect(destination.utilisateur_destination).toBeUndefined();
      expect(destination.destination_critere).toBeUndefined();
    });

    it("should create an instance of Destination with a valid ID", () => {
      const destination = new Destination({ id: 1 });
      expect(destination.id).toBe(1);
    });

    it("should throw an error with a negative ID", () => {
      expect(() => new Destination({ id: -1 })).toThrow(Error);
    });

    it("should throw a type error with a non-numeric ID", () => {
      expect(() => new Destination({ id: "invalid" })).toThrow(TypeError);
    });

    it("should create an instance of Destination with a valid nom", () => {
      const destination = new Destination({ nom: "it" });
      expect(destination.nom).toBe("it");
    });

    it("should throw an error with a nom exceeding maximum length", () => {
      const long_nom = "a".repeat(71);
      expect(() => new Destination({ nom: long_nom })).toThrow(Error);
    });

    it("should throw a type error with a non-string nom", () => {
      expect(() => new Destination({ nom: 123 })).toThrow(TypeError);
    });

    it("should create an instance of Destination with a valid url_image", () => {
      const destination = new Destination({
        url_image: "http://example.com/image.png",
      });
      expect(destination.url_image).toBe("http://example.com/image.png");
    });

    it("should throw an error with a url_image exceeding maximum length", () => {
      const long_url_image = "a".repeat(2049);
      expect(() => new Destination({ url_image: long_url_image })).toThrow(
        Error
      );
    });

    it("should throw a type error with a non-string url_image", () => {
      expect(() => new Destination({ url_image: 123 })).toThrow(TypeError);
    });

    it("should create an instance of Destination with a valid description", () => {
      const destination = new Destination({ description: "it" });
      expect(destination.description).toBe("it");
    });

    it("should throw an error with a description exceeding maximum length", () => {
      const long_description = "a".repeat(126);
      expect(() => new Destination({ description: long_description })).toThrow(
        Error
      );
    });

    it("should throw a type error with a non-string description", () => {
      expect(() => new Destination({ description: 123 })).toThrow(TypeError);
    });

    it("should create an instance of Destination with a valid titre", () => {
      const destination = new Destination({ titre: "it" });
      expect(destination.titre).toBe("it");
    });

    it("should throw an error with a titre exceeding maximum length", () => {
      const long_titre = "a".repeat(101);
      expect(() => new Destination({ titre: long_titre })).toThrow(Error);
    });

    it("should throw a type error with a non-string titre", () => {
      expect(() => new Destination({ titre: 123 })).toThrow(TypeError);
    });

    it("should create an instance of Destination with a valid article", () => {
      const destination = new Destination({ article: "it" });
      expect(destination.article).toBe("it");
    });

    it("should throw an error with an article exceeding maximum length", () => {
      const long_article = "a".repeat(1001);
      expect(() => new Destination({ article: long_article })).toThrow(Error);
    });

    it("should throw a type error with a non-string article", () => {
      expect(() => new Destination({ article: 123 })).toThrow(TypeError);
    });

    it("should create an instance of Destination with a valid utilisateur_destination", () => {
      const utilisateur_destination = new UtilisateurDestination();
      const destination = new Destination({ utilisateur_destination });
      expect(destination.utilisateur_destination).toEqual(
        utilisateur_destination
      );
    });

    it("should throw a type error with an invalid utilisateur_destination", () => {
      expect(
        () => new Destination({ utilisateur_destination: "invalid" })
      ).toThrow(TypeError);
    });

    it("should create an instance of Destination with a valid destination_critere", () => {
      const destination_critere = new DestinationCritere();
      const destination = new Destination({ destination_critere });
      expect(destination.destination_critere).toEqual(destination_critere);
    });

    it("should throw a type error with an invalid destination_critere", () => {
      expect(() => new Destination({ destination_critere: "invalid" })).toThrow(
        TypeError
      );
    });
  });
});
