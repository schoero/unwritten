import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertIntersectionType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { isWrapperNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { IntersectionType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Intersection, () => {

  {

    // #region Type

    const type: Testable<IntersectionType> = {
      kind: TypeKind.Intersection,
      types: [
        {
          kind: TypeKind.String,
          name: "string"
        },
        {
          kind: TypeKind.Number,
          name: "number"
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertIntersectionType(ctx, type as IntersectionType);

    it("should render join multiple types with a `&`", () => {
      expect(isWrapperNode(renderedType)).to.equal(true);
      expect(renderedType.children[0]).to.equal("string");
      expect(renderedType.children[1]).to.equal(" & ");
      expect(renderedType.children[2]).to.equal("number");
    });

  }

});
