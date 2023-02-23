import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNeverType } from "unwritten:renderer:ts/ast/types/never.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NeverType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Never, () => {

  {

    // #region Type

    const type: Testable<NeverType> = {
      kind: TypeKind.Never,
      name: "never"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderNeverType(ctx, type as NeverType);

    it("should be able to render never types", () => {
      expect(renderedType).to.equal("never");
    });

  }

});
