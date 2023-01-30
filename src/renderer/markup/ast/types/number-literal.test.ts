import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderNumberLiteralType } from "./number-literal.js";

import type { NumberLiteralType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.NumberLiteral, () => {

  {

    // #region Type

    const type: Testable<NumberLiteralType> = {
      kind: TypeKind.NumberLiteral,
      name: "number",
      value: 7
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderNumberLiteralType(ctx, type as NumberLiteralType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("7");
    });

  }

});
