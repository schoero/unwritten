import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderBigIntLiteralType } from "./bigint-literal.js";

import type { BigIntLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.BigIntLiteral, () => {

  {

    // #region Positive BigIntLiteralType

    const type: Testable<BigIntLiteralType> = {
      kind: TypeKind.BigIntLiteral,
      name: "bigint",
      value: 7n
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderBigIntLiteralType(ctx, type as BigIntLiteralType);

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

    const renderedType = renderBigIntLiteralType(ctx, type as BigIntLiteralType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("-7");
    });

  }

});
