import { describe, expect, it } from "vitest";

import { scope } from "../../tests/utils/scope.js";
import { isPathExcluded } from "./general.js";


scope("Compiler", "Utils", () => {

  describe("isPathExcluded", () => {

    const path = "node_modules/typescript/lib/lib.esnext.d.ts";

    it("should exclude matching glob star directory excludes", () => {
      expect(isPathExcluded(path, ["node_modules/**/*"])).to.equal(true);
      expect(isPathExcluded(path, ["node_modules/**"])).to.equal(true);
      expect(isPathExcluded(path, ["node_modules/**/*.d.ts"])).to.equal(true);
      expect(isPathExcluded(path, ["node_modules/**/*.test.ts"])).to.equal(false);
    });

    it("should exclude exactly matching paths", () => {
      expect(isPathExcluded(path, [path])).to.equal(true);
      expect(isPathExcluded("node_modules/typescript/lib/lib.es2015.d.ts", [path])).to.equal(false);
    });

    it("should exclude wildcard matching paths", () => {
      expect(isPathExcluded(path, ["node_modules/*"])).to.equal(false);
      expect(isPathExcluded(path, ["node_modules/typescript/lib/*"])).to.equal(true);
      expect(isPathExcluded(path, ["node_modules/typescript/lib/*.d.ts"])).to.equal(true);
      expect(isPathExcluded(path, ["node_modules/typescript/lib/*.test.d.ts"])).to.equal(false);
    });

    it("should not exclude inverted excludes", () => {
      expect(isPathExcluded(path, ["node_modules/**/*", "!node_modules/typescript/lib/lib.esnext.d.ts"])).to.equal(false);
      expect(isPathExcluded(path, ["node_modules/**/*", "!node_modules/typescript/lib/lib.es2016.d.ts"])).to.equal(true);
    });

  });
});
