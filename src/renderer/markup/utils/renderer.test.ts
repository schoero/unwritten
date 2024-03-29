import { describe, expect, it } from "vitest";

import { minMax } from "unwritten:renderer:markup/utils/renderer";
import { scope } from "unwritten:tests:utils/scope";

import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";


scope("Renderer", "utils", () => {

  describe("nodeFilter", () => {

    it("should filter empty strings from ASTNodes[]", () => {
      const testNodes: ASTNode[] = [
        "",
        "element",
        ""
      ];
      const filteredNodes = testNodes.filter(node => !!node);
      expect(filteredNodes).toHaveLength(1);
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
