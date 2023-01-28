import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderUndefinedType } from "./undefined.js";

import type { UndefinedType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


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
