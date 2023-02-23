import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderUndefinedType } from "unwritten:renderer:ts/ast/types/undefined.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { UndefinedType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Undefined, () => {

  {

    // #region Type

    const type: Testable<UndefinedType> = {
      kind: TypeKind.Undefined,
      name: "undefined"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderUndefinedType(ctx, type as UndefinedType);

    it("should be able to render undefined types", () => {
      expect(renderedType).to.equal("undefined");
    });

  }

});
