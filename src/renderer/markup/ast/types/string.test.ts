import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderStringType } from "./string.js";

import type { StringType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.String, () => {

  {

    // #region Type

    const type: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderStringType(ctx, type as StringType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("string");
    });

  }

});
