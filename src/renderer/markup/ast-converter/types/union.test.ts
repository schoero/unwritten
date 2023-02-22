import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertUnionType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { UnionType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Union, () => {

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

    const renderedType = convertUnionType(ctx, type as UnionType);

    it("should render join multiple types with a `|`", () => {
      expect(renderedType[0]).to.equal("string");
      expect(renderedType[1]).to.equal(" | ");
      expect(renderedType[2]).to.equal("number");
    });

  }

});
