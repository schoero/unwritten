import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertNeverType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NeverType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Never, () => {

  {

    // #region Type

    const type: Testable<NeverType> = {
      kind: TypeKind.Never,
      name: "never"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertNeverType(ctx, type as NeverType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("never");
    });

  }

});
