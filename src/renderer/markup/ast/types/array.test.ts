import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderArrayType } from "./array.js";

import type { ArrayType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Array, () => {

  {

    // #region simple array

    const type: Testable<ArrayType> = {
      kind: TypeKind.Array,
      type: {
        kind: TypeKind.String,
        name: "string"
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderArrayType(ctx, type as ArrayType);

    it("should be able to render arrays", () => {
      expect(renderedType).to.equal("string[]");
    });

  }

  {

    // #region union array

    const type: Testable<ArrayType> = {
      kind: TypeKind.Array,
      type: {
        kind: TypeKind.Union,
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
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderArrayType(ctx, type as ArrayType);

    it("should add parentheses around union types", () => {
      expect(renderedType).to.equal("(string | number)[]");
    });

  }

});
