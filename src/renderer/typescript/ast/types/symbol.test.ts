import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderSymbolType } from "unwritten:renderer:ts/ast/types/symbol.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { SymbolType } from "unwritten:interpreter/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Symbol, () => {

  {

    // #region Type

    const type: Testable<SymbolType> = {
      kind: TypeKind.Symbol,
      name: "symbol"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderSymbolType(ctx, type as SymbolType);

    it("should be able to render symbol types", () => {
      expect(renderedType).to.equal("symbol");
    });

  }

});
