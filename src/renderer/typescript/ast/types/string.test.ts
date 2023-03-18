import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderStringType } from "unwritten:renderer:ts/ast/types/string.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { StringType } from "unwritten:interpreter/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.String, () => {

  {

    // #region Type

    const type: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderStringType(ctx, type as StringType);

    it("should be able to render string types", () => {
      expect(renderedType).to.equal("string");
    });

  }

});
