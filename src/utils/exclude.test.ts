/* eslint-disable eslint-plugin-perfectionist/sort-objects */
/* eslint-disable eslint-plugin-typescript/naming-convention */
import { describe, expect, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope";

import { isExcluded } from "./exclude";


scope("Interpreter", "Utils", () => {

  describe("isPathExcluded", () => {

    const path = "node_modules/typescript/lib/lib.esnext.d.ts";

    it("should exclude matching glob star directory excludes", () => {
      expect(isExcluded(path, undefined, ["node_modules/**/*"])).toBe(true);
      expect(isExcluded(path, undefined, ["node_modules/**"])).toBe(true);
      expect(isExcluded(path, undefined, ["node_modules/**/*.d.ts"])).toBe(true);
      expect(isExcluded(path, undefined, ["node_modules/**/*.test.ts"])).toBe(false);
    });

    it("should exclude exactly matching paths", () => {
      expect(isExcluded(path, undefined, [path])).toBe(true);
      expect(isExcluded("node_modules/typescript/lib/lib.es2015.d.ts", undefined, [path])).toBe(false);
    });

    it("should exclude wildcard matching paths", () => {
      expect(isExcluded(path, undefined, ["node_modules/*"])).toBe(false);
      expect(isExcluded(path, undefined, ["node_modules/typescript/lib/*"])).toBe(true);
      expect(isExcluded(path, undefined, ["node_modules/typescript/lib/*.d.ts"])).toBe(true);
      expect(isExcluded(path, undefined, ["node_modules/typescript/lib/*.test.d.ts"])).toBe(false);
    });

    it("should not exclude inverted excludes", () => {
      expect(isExcluded(path, undefined, ["node_modules/**/*", "!node_modules/typescript/lib/lib.esnext.d.ts"])).toBe(false);
      expect(isExcluded(path, undefined, ["node_modules/**/*", "!node_modules/typescript/lib/lib.es2016.d.ts"])).toBe(true);
    });

    it("should override previous entries", () => {
      expect(isExcluded(path, undefined, ["node_modules/**/*", "!node_modules/**/*"])).toBe(false);
    });

    it("should exclude a name if not specified otherwise", () => {
      expect(isExcluded(path, "Omit", ["node_modules/**/*"])).toBe(true);
      expect(isExcluded(path, "Omit", ["!node_modules/**/*"])).toBe(false);
    });

    it("should be possible to exclude certain names only", () => {
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "Omit"
        ]
      })).toBe(true);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "Partial"
        ]
      })).toBe(false);
    });

    it("should be possible to override previous excludes", () => {
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "*"
        ]
      })).toBe(true);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "*",
          "!Omit"
        ]
      })).toBe(false);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "Omit",
          "!Omit"
        ]
      })).toBe(false);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": "*",
        "!node_modules/typescript/lib/**/*": [
          "Omit"
        ]
      })).toBe(false);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": "*",
        "!node_modules/typescript/lib/**/*": [
          "Partial"
        ]
      })).toBe(true);
    });

    it("should invert the name based result if the file based result is inverted", () => {
      expect(isExcluded(path, "Omit", {
        "!node_modules/**/*": [
          "*"
        ]
      })).toBe(false);
      expect(isExcluded(path, "Omit", {
        "!node_modules/**/*": [
          "!Omit"
        ]
      })).toBe(true);
      expect(isExcluded(path, "Omit", {
        "!node_modules/**/*": [
          "*",
          "!Omit"
        ]
      })).toBe(true);
    });

  });
});
