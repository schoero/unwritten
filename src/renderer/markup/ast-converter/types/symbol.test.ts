import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertSymbolType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { SymbolType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Symbol, () => {

  {

    // #region Type

    const type: Testable<SymbolType> = {
      kind: TypeKind.Symbol,
      name: "symbol"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertSymbolType(ctx, type as SymbolType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("symbol");
    });

  }

});
