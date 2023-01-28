import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderNumberType } from "./number.js";

import type { NumberType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Number, () => {

  {

    // #region Type

    const type: Testable<NumberType> = {
      kind: TypeKind.Number,
      name: "number"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderNumberType(ctx, type as NumberType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("number");
    });

  }

});
