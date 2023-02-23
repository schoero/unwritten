import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNumberType } from "unwritten:renderer:ts/ast/types/number.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NumberType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Number, () => {

  {

    // #region Type

    const type: Testable<NumberType> = {
      kind: TypeKind.Number,
      name: "number"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderNumberType(ctx, type as NumberType);

    it("should be able to render number types", () => {
      expect(renderedType).to.equal("number");
    });

  }

});
