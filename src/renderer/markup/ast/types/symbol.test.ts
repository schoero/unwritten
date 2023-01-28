import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderSymbolType } from "./symbol.js";

import type { SymbolType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Symbol, () => {

  {

    // #region Type

    const type: Testable<SymbolType> = {
      kind: TypeKind.Symbol,
      name: "symbol"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderSymbolType(ctx, type as SymbolType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("symbol");
    });

  }

});
