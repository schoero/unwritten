import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderAnyType } from "unwritten:renderer:ts/ast/types/any.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { AnyType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Any, () => {

  {

    // #region Type

    const type: Testable<AnyType> = {
      kind: TypeKind.Any,
      name: "any"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderAnyType(ctx, type as AnyType);

    it("should be able to render any types", () => {
      expect(renderedType).to.equal("any");
    });

  }

});
