import { describe, expect, it } from "vitest";

import { isPathExcluded } from "../src/utils/general.js";

describe("Utils: ", () => {

  describe("isPathExcluded", () => {

    const path = "node_modules/typescript/lib/lib.esnext.d.ts";

    it("should exclude matching glob star directory excludes", () => {
      expect(isPathExcluded(path, ["node_modules/**/*"])).to.be.true;
      expect(isPathExcluded(path, ["node_modules/**"])).to.be.true;
      expect(isPathExcluded(path, ["node_modules/**/*.d.ts"])).to.be.true;
      expect(isPathExcluded(path, ["node_modules/**/*.test.ts"])).to.be.false;
    });

    it("should exclude exactly matching paths", () => {
      expect(isPathExcluded(path, [path])).to.be.true;
      expect(isPathExcluded("node_modules/typescript/lib/lib.es2015.d.ts", [path])).to.be.false;
    });

    it("should exclude wildcard matching paths", () => {
      expect(isPathExcluded(path, ["node_modules/*"])).to.be.false;
      expect(isPathExcluded(path, ["node_modules/typescript/lib/*"])).to.be.true;
      expect(isPathExcluded(path, ["node_modules/typescript/lib/*.d.ts"])).to.be.true;
      expect(isPathExcluded(path, ["node_modules/typescript/lib/*.test.d.ts"])).to.be.false;
    });

  });
});