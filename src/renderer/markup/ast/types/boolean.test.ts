import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderBooleanType } from "./boolean.js";

import type { BooleanType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Boolean, () => {

  {

    // #region Type

    const type: Testable<BooleanType> = {
      kind: TypeKind.Boolean,
      name: "boolean"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderBooleanType(ctx, type as BooleanType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("boolean");
    });

  }

});
