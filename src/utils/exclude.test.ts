/* eslint-disable sort-keys/sort-keys-fix */
/* eslint-disable @typescript-eslint/naming-convention */
import { describe, expect, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";

import { isExcluded } from "./exclude.js";


scope("Interpreter", "Utils", () => {

  describe("isPathExcluded", () => {

    const path = "node_modules/typescript/lib/lib.esnext.d.ts";

    it("should exclude matching glob star directory excludes", () => {
      expect(isExcluded(path, undefined, ["node_modules/**/*"])).to.equal(true);
      expect(isExcluded(path, undefined, ["node_modules/**"])).to.equal(true);
      expect(isExcluded(path, undefined, ["node_modules/**/*.d.ts"])).to.equal(true);
      expect(isExcluded(path, undefined, ["node_modules/**/*.test.ts"])).to.equal(false);
    });

    it("should exclude exactly matching paths", () => {
      expect(isExcluded(path, undefined, [path])).to.equal(true);
      expect(isExcluded("node_modules/typescript/lib/lib.es2015.d.ts", undefined, [path])).to.equal(false);
    });

    it("should exclude wildcard matching paths", () => {
      expect(isExcluded(path, undefined, ["node_modules/*"])).to.equal(false);
      expect(isExcluded(path, undefined, ["node_modules/typescript/lib/*"])).to.equal(true);
      expect(isExcluded(path, undefined, ["node_modules/typescript/lib/*.d.ts"])).to.equal(true);
      expect(isExcluded(path, undefined, ["node_modules/typescript/lib/*.test.d.ts"])).to.equal(false);
    });

    it("should not exclude inverted excludes", () => {
      expect(isExcluded(path, undefined, ["node_modules/**/*", "!node_modules/typescript/lib/lib.esnext.d.ts"])).to.equal(false);
      expect(isExcluded(path, undefined, ["node_modules/**/*", "!node_modules/typescript/lib/lib.es2016.d.ts"])).to.equal(true);
    });

    it("should override previous entries", () => {
      expect(isExcluded(path, undefined, ["node_modules/**/*", "!node_modules/**/*"])).to.equal(false);
    });

    it("should exclude a name if not specified otherwise", () => {
      expect(isExcluded(path, "Omit", ["node_modules/**/*"])).to.equal(true);
      expect(isExcluded(path, "Omit", ["!node_modules/**/*"])).to.equal(false);
    });

    it("should be possible to exclude certain names only", () => {
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "Omit"
        ]
      })).to.equal(true);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "Partial"
        ]
      })).to.equal(false);
    });

    it("should be possible to override previous excludes", () => {
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "*"
        ]
      })).to.equal(true);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "*",
          "!Omit"
        ]
      })).to.equal(false);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": [
          "Omit",
          "!Omit"
        ]
      })).to.equal(false);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": "*",
        "!node_modules/typescript/lib/**/*": [
          "Omit"
        ]
      })).to.equal(false);
      expect(isExcluded(path, "Omit", {
        "node_modules/**/*": "*",
        "!node_modules/typescript/lib/**/*": [
          "Partial"
        ]
      })).to.equal(true);
    });

    it("should invert the name based result if the file based result is inverted", () => {
      expect(isExcluded(path, "Omit", {
        "!node_modules/**/*": [
          "*"
        ]
      })).to.equal(false);
      expect(isExcluded(path, "Omit", {
        "!node_modules/**/*": [
          "!Omit"
        ]
      })).to.equal(true);
      expect(isExcluded(path, "Omit", {
        "!node_modules/**/*": [
          "*",
          "!Omit"
        ]
      })).to.equal(true);
    });

  });
});
