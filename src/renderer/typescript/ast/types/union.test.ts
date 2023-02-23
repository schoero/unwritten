import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderUnionType } from "unwritten:renderer/typescript/ast/types/union.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { UnionType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Union, () => {

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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderUnionType(ctx, type as UnionType);

    it("should render join multiple types with a `|`", () => {
      expect(renderedType).to.equal("string | number");
    });

  }

});
