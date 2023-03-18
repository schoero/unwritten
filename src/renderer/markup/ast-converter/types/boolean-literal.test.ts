import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertBooleanLiteralType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { BooleanLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.BooleanLiteral, () => {

  {

    // #region True boolean literal

    const type: Testable<BooleanLiteralType> = {
      kind: TypeKind.BooleanLiteral,
      name: "boolean",
      value: true
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertBooleanLiteralType(ctx, type as BooleanLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("true");
    });

  }

  {

    // #region False boolean literal

    const type: Testable<BooleanLiteralType> = {
      kind: TypeKind.BooleanLiteral,
      name: "boolean",
      value: false
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertBooleanLiteralType(ctx, type as BooleanLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("false");
    });

  }

});
