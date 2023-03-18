import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { convertBigIntLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { BigIntLiteralType } from "unwritten:interpreter/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.BigIntLiteral, () => {

  {

    // #region Positive BigIntLiteralType

    const type: Testable<BigIntLiteralType> = {
      kind: TypeKind.BigIntLiteral,
      name: "bigint",
      value: 7n
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertBigIntLiteralType(ctx, type as BigIntLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("7");
    });

  }

  {

    // #region Negative BigIntLiteralType

    const type: Testable<BigIntLiteralType> = {
      kind: TypeKind.BigIntLiteral,
      name: "bigint",
      value: -7n
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertBigIntLiteralType(ctx, type as BigIntLiteralType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("-7");
    });

  }

});
