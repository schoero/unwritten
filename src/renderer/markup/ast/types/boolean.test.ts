import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderBooleanType } from "./boolean.js";

import type { BooleanType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


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
