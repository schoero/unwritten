import { describe, expect, it } from "vitest";

import { minMax, nodeFilter } from "unwritten:renderer:markup/utils/renderer.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";


scope("Renderer", "utils", () => {

  describe("nodeFilter", () => {

    it("should filter empty strings from ASTNodes[]", () => {
      const testNodes: ASTNodes[] = [
        "",
        "element",
        ""
      ];
      const filteredNodes = testNodes.filter(nodeFilter);
      expect(filteredNodes).to.have.lengthOf(1);
      expect(filteredNodes[0]).toBe("element");
    });

  });

  describe("minMax", () => {

    it("should return the min value if the value is smaller than the min value", () => {
      expect(minMax(5, 7, 10)).toBe(7);
    });

    it("should return the max value if the value is bigger than the max value", () => {
      expect(minMax(11, 0, 10)).toBe(10);
    });

    it("should return the value if the value is between the min and max value", () => {
      expect(minMax(7, 0, 10)).toBe(7);
    });

  });

});
