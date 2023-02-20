import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertNumberType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NumberType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Number, () => {

  {

    // #region Type

    const type: Testable<NumberType> = {
      kind: TypeKind.Number,
      name: "number"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertNumberType(ctx, type as NumberType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("number");
    });

  }

});
