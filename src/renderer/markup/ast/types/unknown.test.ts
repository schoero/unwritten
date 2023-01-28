import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderUnknownType } from "./unknown.js";

import type { UnknownType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Unknown, () => {

  {

    // #region Type

    const type: Testable<UnknownType> = {
      kind: TypeKind.Unknown,
      name: "unknown"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderUnknownType(ctx, type as UnknownType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("unknown");
    });

  }

});
