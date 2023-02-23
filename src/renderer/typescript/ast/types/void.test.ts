import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderVoidType } from "unwritten:renderer:ts/ast/types/void.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { VoidType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Void, () => {

  {

    // #region Type

    const type: Testable<VoidType> = {
      kind: TypeKind.Void,
      name: "void"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderVoidType(ctx, type as VoidType);

    it("should be able to render void types", () => {
      expect(renderedType).to.equal("void");
    });

  }

});
