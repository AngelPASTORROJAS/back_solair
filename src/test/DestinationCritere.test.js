import { describe, it, expect } from "vitest";
import { Destination } from "../models/Destination.js";
import { Critere } from "../models/Critere.js";
import { DestinationCritere } from "../models/DestinationCritere.js";

describe("DestinationCritere", () => {
  describe("constructor", () => {
    it("should create an instance of DestinationCritere with no parameters", () => {
      const destinationCritere = new DestinationCritere();
      expect(destinationCritere.id).toBeUndefined();
      expect(destinationCritere.critere_id).toBeUndefined();
      expect(destinationCritere.destination_id).toBeUndefined();
      expect(destinationCritere.critere).toBeUndefined();
      expect(destinationCritere.destination).toBeUndefined();
    });

    it("should create an instance of DestinationCritere with valid id", () => {
      const destinationCritere = new DestinationCritere({ id: 1 });
      expect(destinationCritere.id).toBe(1);
    });

    it("should throw an error with a negative id", () => {
      expect(() => new DestinationCritere({ id: -1 })).toThrow(Error);
    });

    it("should throw a type error with a non-numeric id", () => {
      expect(() => new DestinationCritere({ id: "invalid" })).toThrow(
        TypeError
      );
    });

    it("should create an instance of DestinationCritere with valid critere_id", () => {
      const destinationCritere = new DestinationCritere({ critere_id: 1 });
      expect(destinationCritere.critere_id).toBe(1);
    });

    it("should throw an error with a negative critere_id", () => {
      expect(() => new DestinationCritere({ critere_id: -1 })).toThrow(Error);
    });

    it("should throw a type error with a non-numeric critere_id", () => {
      expect(() => new DestinationCritere({ critere_id: "invalid" })).toThrow(
        TypeError
      );
    });

    it("should create an instance of DestinationCritere with valid destination_id", () => {
      const destinationCritere = new DestinationCritere({ destination_id: 1 });
      expect(destinationCritere.destination_id).toBe(1);
    });

    it("should throw an error with a negative destination_id", () => {
      expect(() => new DestinationCritere({ destination_id: -1 })).toThrow(
        Error
      );
    });

    it("should throw a type error with a non-numeric destination_id", () => {
      expect(
        () => new DestinationCritere({ destination_id: "invalid" })
      ).toThrow(TypeError);
    });

    it("should create an instance of DestinationCritere with valid critere", () => {
      const critere = new Critere();
      const destinationCritere = new DestinationCritere({ critere });
      expect(destinationCritere.critere).toEqual(critere);
    });

    it("should throw a type error with an invalid critere", () => {
      expect(() => new DestinationCritere({ critere: "invalid" })).toThrow(
        TypeError
      );
    });

    it("should create an instance of DestinationCritere with valid destination", () => {
      const destination = new Destination();
      const destinationCritere = new DestinationCritere({ destination });
      expect(destinationCritere.destination).toEqual(destination);
    });

    it("should throw a type error with an invalid destination", () => {
      expect(() => new DestinationCritere({ destination: "invalid" })).toThrow(
        TypeError
      );
    });
  });
});
