import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderNeverType } from "./never.js";

import type { NeverType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Never, () => {

  {

    // #region Type

    const type: Testable<NeverType> = {
      kind: TypeKind.Never,
      name: "never"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderNeverType(ctx, type as NeverType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("never");
    });

  }

});
