import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderNullType } from "./null.js";

import type { NullType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Null, () => {

  {

    // #region Type

    const type: Testable<NullType> = {
      kind: TypeKind.Null,
      name: "null"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderNullType(ctx, type as NullType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("null");
    });

  }

});
