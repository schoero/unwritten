import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNumberLiteralType } from "unwritten:renderer/typescript/ast/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NumberLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Number, () => {

  {

    // #region Type

    const type: Testable<NumberLiteralType> = {
      kind: TypeKind.NumberLiteral,
      name: "number",
      value: 7
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderNumberLiteralType(ctx, type as NumberLiteralType);

    it("should be able to render number literal types", () => {
      expect(renderedType).to.equal("7");
    });

  }

});
