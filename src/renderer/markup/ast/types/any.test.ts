import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderAnyType } from "./any.js";

import type { AnyType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Any, () => {

  {

    // #region Type

    const type: Testable<AnyType> = {
      kind: TypeKind.Any,
      name: "any"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderAnyType(ctx, type as AnyType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("any");
    });

  }

});
