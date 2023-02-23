import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertNumberLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NumberLiteralType } from "unwritten:compiler:type-definitions/types.js";
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

    const convertedType = convertNumberLiteralType(ctx, type as NumberLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("7");
    });

  }

});
