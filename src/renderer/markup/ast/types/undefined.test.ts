import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderUndefinedType } from "./undefined.js";

import type { UndefinedType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Undefined, () => {

  {

    // #region Type

    const type: Testable<UndefinedType> = {
      kind: TypeKind.Undefined,
      name: "undefined"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderUndefinedType(ctx, type as UndefinedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("undefined");
    });

  }

});
