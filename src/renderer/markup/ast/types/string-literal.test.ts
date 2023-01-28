import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderStringLiteralType } from "./string-literal.js";

import type { StringLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.StringLiteral, () => {

  {

    // #region Type

    const type: Testable<StringLiteralType> = {
      kind: TypeKind.StringLiteral,
      name: "string",
      value: "test"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderStringLiteralType(ctx, type as StringLiteralType);

    it("should render the literal value", () => {
      expect(renderedType).to.equal("test");
    });

  }

});
