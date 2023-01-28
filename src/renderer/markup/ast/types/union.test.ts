import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderUnionType } from "./union.js";

import type { UnionType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Any, () => {

  {

    // #region Type

    const type: Testable<UnionType> = {
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
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderUnionType(ctx, type as UnionType);

    it("should render join multiple types with a `|`", () => {
      expect(renderedType).to.equal("string | number");
    });

  }

});
