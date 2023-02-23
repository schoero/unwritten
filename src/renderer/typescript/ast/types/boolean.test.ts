import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderBooleanType } from "unwritten:renderer:ts/ast/types/boolean.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { BooleanType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Boolean, () => {

  {

    // #region Type

    const type: Testable<BooleanType> = {
      kind: TypeKind.Boolean,
      name: "boolean"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderBooleanType(ctx, type as BooleanType);

    it("should be able to render boolean types", () => {
      expect(renderedType).to.equal("boolean");
    });

  }

});
