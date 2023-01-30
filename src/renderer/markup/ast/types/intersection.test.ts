import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderIntersectionType } from "./intersection.js";

import type { IntersectionType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Any, () => {

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

    const renderedType = renderIntersectionType(ctx, type as IntersectionType);

    it("should render join multiple types with a `&`", () => {
      expect(renderedType).to.equal("string & number");
    });

  }

});
