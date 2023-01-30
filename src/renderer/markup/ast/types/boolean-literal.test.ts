import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderBooleanLiteralType } from "./boolean-literal.js";

import type { BooleanLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.BooleanLiteral, () => {

  {

    // #region True boolean literal

    const type: Testable<BooleanLiteralType> = {
      kind: TypeKind.BooleanLiteral,
      name: "boolean",
      value: true
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderBooleanLiteralType(ctx, type as BooleanLiteralType);

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

    const renderedType = renderBooleanLiteralType(ctx, type as BooleanLiteralType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("false");
    });

  }

});
