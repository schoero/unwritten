import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderVoidType } from "./void.js";

import type { VoidType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Void, () => {

  {

    // #region Type

    const type: Testable<VoidType> = {
      kind: TypeKind.Void,
      name: "void"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderVoidType(ctx, type as VoidType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("void");
    });

  }

});
