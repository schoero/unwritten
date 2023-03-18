import { describe, expect, it } from "vitest";

import { nodeFilter } from "unwritten:renderer:markup/utils/renderer.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";


scope("Renderer", "Render abstraction", () => {

  describe("nodeFilter", () => {

    it("should filter empty strings from ASTNodes[]", () => {
      const testNodes: ASTNodes[] = [
        "",
        "element",
        ""
      ];
      const filteredNodes = testNodes.filter(nodeFilter);
      expect(filteredNodes).to.have.lengthOf(1);
      expect(filteredNodes[0]).to.equal("element");
    });

  });

});
