import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNullType } from "unwritten:renderer:ts/ast/types/null.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NullType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Null, () => {

  {

    // #region Type

    const type: Testable<NullType> = {
      kind: TypeKind.Null,
      name: "null"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderNullType(ctx, type as NullType);

    it("should be able to render null types", () => {
      expect(renderedType).to.equal("null");
    });

  }

});
