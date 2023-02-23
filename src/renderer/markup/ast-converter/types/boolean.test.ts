import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertBooleanType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { BooleanType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Boolean, () => {

  {

    // #region Type

    const type: Testable<BooleanType> = {
      kind: TypeKind.Boolean,
      name: "boolean"
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertBooleanType(ctx, type as BooleanType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("boolean");
    });

  }

});
