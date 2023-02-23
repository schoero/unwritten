import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertStringLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { StringLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


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

    const convertedType = convertStringLiteralType(ctx, type as StringLiteralType);

    it("should render the literal value", () => {
      const renderedType = renderNode(ctx, convertedType);
      expect(renderedType).to.equal("\"test\"");
    });

  }

});
