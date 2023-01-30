import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderAnyType } from "./any.js";

import type { AnyType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


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
