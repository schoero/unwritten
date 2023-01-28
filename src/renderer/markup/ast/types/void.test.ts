import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderVoidType } from "./void.js";

import type { VoidType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


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
