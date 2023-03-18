import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderUnknownType } from "unwritten:renderer:ts/ast/types/unknown.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { UnknownType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Unknown, () => {

  {

    // #region Type

    const type: Testable<UnknownType> = {
      kind: TypeKind.Unknown,
      name: "unknown"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderUnknownType(ctx, type as UnknownType);

    it("should be able to render unknown types", () => {
      expect(renderedType).to.equal("unknown");
    });

  }

});
